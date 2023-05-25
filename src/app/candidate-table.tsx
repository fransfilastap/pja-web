"use client";

import { useRef, useState, useMemo } from "react";
import { debounce } from "lodash";
import { Prisma, Jabatan } from "@prisma/client";
import VoteButton from "@/components/button/vote.button";
import Container from "@/components/container";
import clsxm from "@/helpers/clsxm";
import Image from "next/image";

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
  candidates: {
    _count: Prisma.CandidatesCountOutputType;
    id: bigint;
    name: string;
    jabatan: Jabatan;
    desa_kelurahan: string;
    kecamatan: string;
    kabupaten_kota: string;
    provinsi: string;
    photo: string | null;
    code: string;
  }[];
  isVotingDone: boolean;
  isVotingStart: boolean;
}) {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [keyword, setKeyword] = useState<string | null>(null);

  const debounceSearch = debounce((name: string) => {
    setKeyword(name);
  }, 300);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    debounceSearch(e.target.value);
  }

  const filteredCandidates = useMemo(() => {
    return candidates.filter(
      (candidate: {
        _count: Prisma.CandidatesCountOutputType;
        id: bigint;
        name: string;
        jabatan: Jabatan;
        desa_kelurahan: string;
        kecamatan: string;
        kabupaten_kota: string;
        provinsi: string;
        photo: string | null;
        code: string;
      }) => {
        if (keyword === null) return true;
        const lKeyword = keyword.toLowerCase();
        return (
          candidate.name.toLowerCase().includes(lKeyword) ||
          candidate.desa_kelurahan.toLowerCase().includes(lKeyword) ||
          candidate.provinsi.toLowerCase().includes(lKeyword)
        );
      }
    );
  }, [keyword]);

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
          className="block w-full px-3 py-2 border border-black placeholder:text-gray-500 placeholder:font-body placeholder:normal-case placeholder:font-[300]"
          placeholder="Cari Kades/Lurah Favoritmu. Ketikan nama kades/lurah, nama provinsi, atau nama desa"
        />
      )}
      <table className="table w-full mt-5">
        <tbody>
          {filteredCandidates.map(
            (
              candidate: {
                _count: Prisma.CandidatesCountOutputType;
                id: bigint;
                name: string;
                jabatan: Jabatan;
                desa_kelurahan: string;
                kecamatan: string;
                kabupaten_kota: string;
                provinsi: string;
                photo: string | null;
                code: string;
              },
              i: number
            ) => {
              return (
                <tr
                  key={candidate.code}
                  className={clsxm(
                    "border-y border-y-black hover:bg-amber-200",
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
                      key={`lg-${candidate.photo}`}
                      src={
                        candidate.photo !== null
                          ? candidate.photo
                          : DEFAULT_PLACEHOLDER
                      }
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
                        src={
                          candidate.photo !== null
                            ? candidate.photo
                            : DEFAULT_PLACEHOLDER
                        }
                        width={100}
                        height={200}
                        blurDataURL={DEFAULT_BLUR}
                        key={candidate.photo}
                        alt={`photo ${candidate.name}`}
                      />
                      <p className="text-sm lg:text-2xl font-heading pr-6 font-[800] text-slate-950">
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
                      <div className="lg:hidden">
                        {!isVotingDone && isVotingStart && (
                          <VoteButton
                            key={`mob-${candidate.code}`}
                            candidateCode={candidate.code}
                          />
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span>{candidate._count.Votes}</span>
                  </td>
                  <td className="hidden lg:table-cell">
                    {!isVotingDone && isVotingStart && (
                      <VoteButton
                        key={`lg-${candidate.code}`}
                        candidateCode={candidate.code}
                      />
                    )}
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </Container>
  );
}