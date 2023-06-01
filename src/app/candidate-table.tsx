"use client";

import { useRef, useState, useMemo } from "react";
import { debounce, toNumber } from "lodash";
import { CandidateVotes } from "@prisma/client";
import VoteButton from "@/components/button/vote.button";
import Container from "@/components/container";
import clsxm from "@/helpers/clsxm";
import Image from "next/image";
import useSWR from "swr";
import ReactPaginate from "react-paginate";
import cloudinary from "@/lib/cloudinary";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { TURNSTILE_KEY } from "@/config/env";
import fetcher from "@/lib/fetcher";
import { load } from "@fingerprintjs/botd";
import Botd from "@/lib/botd/script";
import PJAConfetti from "@/components/confetti";

export const DEFAULT_BLUR =
  "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
const MAX_ROW = 10;
const DEFAULT_PLACEHOLDER =
  "https://res.cloudinary.com/dyduzvx5b/image/upload/v1684995330/Portrait_Placeholder_ptfg7z.png";

export default function CandidateTable({
  candidates,
  isVotingDone = false,
  isVotingStart = false,
  csrfToken,
}: {
  candidates: CandidateVotes[];
  isVotingDone: boolean;
  isVotingStart: boolean;
  csrfToken: string;
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
    <Botd>
      {isVotingDone && token && <PJAConfetti />}
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
                  placeholder="Cari Kades/Lurah Favoritmu. Ketikan nama kades/lurah,kecamatan, kabupaten/kota, nama provinsi, atau nama desa"
                />
              </div>
            )}
            <table className="table w-full mt-5">
              <tbody>
                {currentItems.map((candidate: CandidateVotes, i: number) => {
                  const rank = i + 1 + itemOffset;
                  const isWinner = rank <= MAX_ROW;
                  return (
                    <tr
                      key={candidate.code}
                      className={clsxm(
                        "border-y border-y-black hover:bg-amber-200 transition duration-150 ease-out",
                        {
                          "bg-amber-100": isVotingDone && rank <= MAX_ROW,
                        }
                      )}
                    >
                      <td>
                        <span className="text-xl text-center lg:text-2xl font-heading pr-6 font-[800] text-slate-950 block w-full h-full items-center justify-center">
                          {rank}
                        </span>
                      </td>
                      <td className="hidden lg:table-cell">
                        <Image
                          className="rounded-md"
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
                            className="rounded-md lg:hidden"
                            loader={cloudinary}
                            src={candidate.photo ?? DEFAULT_PLACEHOLDER}
                            width={100}
                            height={200}
                            blurDataURL={DEFAULT_BLUR}
                            key={candidate.photo}
                            alt={`photo ${candidate.name}`}
                          />
                          <p className="text-sm lg:text-2xl font-body pr-6 font-[700] text-slate-950">
                            {isVotingDone && isWinner && (
                              <span className="mx-2">🏆</span>
                            )}
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
                        <VoteIcon candidateId={Number(candidate.id)} />
                        <div className="flex items-center justify-center w-full mt-2 lg:hidden">
                          {!isVotingDone && isVotingStart && (
                            <VoteButton
                              key={`mob-${candidate.code}`}
                              candidateCode={candidate.code}
                              turnstile={ref.current}
                              csrfToken={csrfToken}
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
                            csrfToken={csrfToken}
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
    </Botd>
  );
}

function VoteIcon({ candidateId }: { candidateId: number }) {
  const { data, error, isLoading } = useSWR<{ votes: number }>(
    `/api/vote/count?c=${candidateId}`,
    fetcher
  );

  if (isLoading) {
    return (
      <div role="status" className="animate-pulse">
        <div className="min-w-[100px] border py-5 rounded bg-gray-100"></div>
      </div>
    );
  }

  if (error) {
    return <p>Opps. </p>;
  }

  return (
    <div className="flex flex-row gap-2 items-center justify-center min-w-[100px] border py-5 rounded bg-gray-100">
      <span>❤️</span>
      <span className="font-[500] text-xl font-heading">{data?.votes}</span>
    </div>
  );
}
