"use client";

import { useRef, useState, useMemo } from "react";
import { debounce } from "lodash";
import { CandidateVotes } from "@prisma/client";
import VoteButton from "@/components/button/vote.button";
import Container from "@/components/container";
import clsxm from "@/helpers/clsxm";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import cloudinary from "@/lib/cloudinary";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { TURNSTILE_KEY } from "@/config/env";
import { AnimatePresence } from "framer-motion";

export const DEFAULT_BLUR =
  "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
const MAX_ROW = 9;
const DEFAULT_PLACEHOLDER =
  "https://res.cloudinary.com/dyduzvx5b/image/upload/v1684995330/Portrait_Placeholder_ptfg7z.png";

export default function CandidateTable({
  candidates,
  isVotingDone = false,
  isVotingStart = false,
}: {
  candidates: CandidateVotes[];
  isVotingDone: boolean;
  isVotingStart: boolean;
}) {
  //turnstile
  const [token, setToken] = useState<string>();
  const ref = useRef<TurnstileInstance>(null);

  const searchRef = useRef<HTMLInputElement | null>(null);
  const [keyword, setKeyword] = useState<string | null>(null);
  const [itemOffset, setItemOffset] = useState<number>(0);

  const debounceSearch = debounce((name: string) => {
    setItemOffset(0);
    setKeyword(name);
  }, 300);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    debounceSearch(e.target.value);
  }

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate: CandidateVotes) => {
      if (keyword === null) return true;
      const lKeyword = keyword.toLowerCase();
      return (
        candidate.name.toLowerCase().includes(lKeyword) ||
        candidate.desa_kelurahan.toLowerCase().includes(lKeyword) ||
        candidate.kabupaten_kota.toLowerCase().includes(lKeyword) ||
        candidate.kecamatan.toLowerCase().includes(lKeyword) ||
        candidate.provinsi.toLowerCase().includes(lKeyword)
      );
    });
  }, [candidates, keyword]);

  if (candidates.length <= 0) {
    return <p className="text-2xl font-[500]">Tidak ada data</p>;
  }

  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredCandidates.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredCandidates.length / itemsPerPage);
  const pageChangeHandler = (selectedItem: { selected: number }) => {
    const newOffset: number =
      (selectedItem.selected * itemsPerPage) % candidates.length;
    setItemOffset(newOffset);
  };

  return (
    <Container className="mt-10">
      <Turnstile
        className="my-4"
        siteKey={`${TURNSTILE_KEY}`}
        ref={ref}
        onSuccess={setToken}
        onExpire={() => ref.current?.reset()}
      />
      {token && (
        <>
          {!isVotingDone && (
            <div className="sticky w-full p-5 bg-white border border-black shadow top-40">
              <input
                ref={searchRef}
                onChange={handleChange}
                type="text"
                name="filter-nama"
                className="block w-full px-3 py-2 border border-black placeholder:text-gray-500 placeholder:font-body placeholder:normal-case placeholder:font-[300]"
                placeholder="Cari Kades/Lurah Favoritmu. Ketikan nama kades/lurah, nama provinsi, atau nama desa"
              />
            </div>
          )}
          <table className="table w-full mt-5">
            <tbody>
              {currentItems.map((candidate: CandidateVotes, i: number) => {
                return (
                  <tr
                    key={candidate.code}
                    className={clsxm(
                      "border-y border-y-black hover:bg-amber-200 transition duration-150 ease-out",
                      {
                        "bg-[var(--secondary-color)]":
                          isVotingDone && i <= MAX_ROW,
                      }
                    )}
                  >
                    <td>
                      <span className="text-xl text-center lg:text-2xl font-heading pr-6 font-[800] text-slate-950 block w-full h-full items-center justify-center">
                        {i + 1}
                      </span>
                    </td>
                    <td className="hidden lg:table-cell">
                      <Image
                        loader={cloudinary}
                        key={`lg-${candidate.photo}`}
                        src={candidate.photo ?? DEFAULT_PLACEHOLDER}
                        width={100}
                        height={200}
                        blurDataURL={DEFAULT_BLUR}
                        alt={`photo ${candidate.name}`}
                      />
                    </td>
                    <td className="table-cell">
                      <div className="flex flex-col gap-1">
                        <Image
                          className="lg:hidden"
                          loader={cloudinary}
                          src={candidate.photo ?? DEFAULT_PLACEHOLDER}
                          width={100}
                          height={200}
                          blurDataURL={DEFAULT_BLUR}
                          key={candidate.photo}
                          alt={`photo ${candidate.name}`}
                        />
                        <p className="text-sm lg:text-2xl font-body pr-6 font-[700] text-slate-950">
                          {candidate.name}
                        </p>
                        <p className="flex flex-col text-xs text-gray-700">
                          <span className="text-[var(--primary-color)] font-body">
                            {" "}
                            {`${candidate.jabatan} ${candidate.desa_kelurahan}`}
                          </span>
                        </p>
                        <p className="flex flex-col gap-0 mt-1 text-sm">
                          <span>{candidate.kecamatan}</span>
                          <span>{`${candidate.kabupaten_kota} - ${candidate.provinsi}`}</span>
                        </p>
                      </div>
                    </td>
                    <td>
                      <VoteIcon
                        count={new Number(candidate.votes ?? 0).valueOf()}
                      />
                      <div className="flex items-center justify-center w-full mt-2 lg:hidden">
                        {!isVotingDone && isVotingStart && (
                          <VoteButton
                            key={`mob-${candidate.code}`}
                            candidateCode={candidate.code}
                            turnstile={ref.current}
                          />
                        )}
                      </div>
                    </td>
                    <td className="hidden lg:table-cell">
                      {!isVotingDone && isVotingStart && (
                        <VoteButton
                          key={`lg-${candidate.code}`}
                          candidateCode={candidate.code}
                          turnstile={ref.current}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <ReactPaginate
            className="inline-flex items-center justify-center w-full gap-2 my-5 overflow-x-auto"
            pageLinkClassName="block px-3 py-1 rounded-md bg-gray-100 text-black hover:bg-amber-500 text-black transition-color duration-100 ease-in-out"
            activeClassName={
              "border-2 border-[var(--primary-color)] rounded-lg"
            }
            onPageChange={pageChangeHandler}
            breakLabel="..."
            pageCount={pageCount}
          />
        </>
      )}
    </Container>
  );
}

function VoteIcon({ count }: { count: number }) {
  return (
    <div className="flex flex-row gap-2 items-center justify-center min-w-[100px] border py-5 rounded bg-gray-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
        />
      </svg>

      <span className="font-[500] text-xl font-heading">{count}</span>
    </div>
  );
}
