"use client";

import { useRef, useState, useMemo } from "react";
import { debounce } from "lodash";
import { Candidates } from "@prisma/client";
import VoteButton from "@/components/button/vote.button";
import Container from "@/components/container";
import clsxm from "@/helpers/clsxm";
import { isValid } from "date-fns";

const MAX_ROW = 9;

export default function CandidateTable({
  candidates,
  isVotingDone = false,
}: {
  candidates: Candidates[];
  isVotingDone: boolean;
}) {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [keyword, setKeyword] = useState<string>("");

  const debounceSearch = debounce(async (name: string) => {
    setKeyword(name);
  }, 300);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    debounceSearch(e.target.value);
  }

  const filteredCandidates = useMemo((): Candidates[] => {
    return candidates.filter((candidate: Candidates) =>
      candidate.name.toLowerCase().includes(keyword)
    );
  }, [candidates, keyword]);

  if (candidates.length <= 0) {
    return <p className="text-2xl font-[500]">Tidak ada data</p>;
  }

  return (
    <Container className="mt-10">
      {!isVotingDone && (
        <input
          ref={searchRef}
          onChange={handleChange}
          type="text"
          name="filter-nama"
          className="block w-full px-1 py-2 border border-black placeholder:text-gray-500 placeholder:font-body placeholder:uppercase placeholder:font-[300]"
          placeholder="Cari nominee"
        />
      )}
      <table className="table w-full mt-5">
        <tbody>
          {filteredCandidates.map((candidate, i) => {
            return (
              <tr
                key={candidate.code}
                className={clsxm(
                  "border-y border-y-black hover:bg-[var(--secondary-color)] cursor-pointer",
                  {
                    "bg-[var(--secondary-color)]": isVotingDone && i <= MAX_ROW,
                  }
                )}
              >
                <td className="place-content-center">
                  <span className="text-xl text-center lg:text-2xl font-heading pr-6 font-[800] text-slate-950 block w-full h-full items-center justify-center">
                    {i + 1}
                  </span>
                </td>
                <td className="border-black border-y">
                  <p className="text-xl lg:text-2xl font-heading pr-6 font-[800] text-slate-950">
                    {candidate.name}
                  </p>
                  <p className="flex flex-col text-sm text-gray-700">
                    <span className="text-[var(--primary-color)] font-body">
                      {" "}
                      {`${candidate.jabatan} ${candidate.desa_kelurahan}`}
                    </span>
                  </p>
                  <p className="flex flex-col gap-0 mt-1 text-sm">
                    <span>{candidate.kecamatan}</span>
                    <span>{`${candidate.kabupaten_kota} - ${candidate.provinsi}`}</span>
                  </p>
                  <div className="lg:hidden">
                    {!isVotingDone && (
                      <VoteButton
                        key={`mob-${candidate.code}`}
                        candidateCode={candidate.code}
                      />
                    )}
                  </div>
                </td>
                <td className="py-6"></td>
                <td className="hidden lg:grid">
                  {!isVotingDone && (
                    <VoteButton
                      key={`lg-${candidate.code}`}
                      candidateCode={candidate.code}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
}
