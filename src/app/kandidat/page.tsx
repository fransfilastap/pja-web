import Container from "@/components/container";
import { Metadata } from "next";
import { Suspense } from "react";
import VoteButton from "@/components/button/vote.button";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Vote Kandidat - Paralegal Justice Awards",
  description: "Kandidat Non Litigation Peacemaker",
};

async function getCandidates() {
  return await prisma.candidates.findMany({
    orderBy: {
      Votes: {
        _count: "desc",
      },
    },
  });
}

export default async function Page() {
  const candidates = await getCandidates();
  return (
    <Container className="p-6 my-20">
      <div className="flex flex-col items-start justify-between mb-10">
        <h2 className="font-[600] py-5 text-4xl font-heading text-transparent bg-clip-text bg-gradient-to-br from-[#FCAA43] from-5% via-[#943C30] via-20% to-[#5941A9] to-75%">
          Nominee
        </h2>
      </div>
      <Suspense fallback={<Skeleton />}>
        <Container className="mt-10">
          <table className="table w-full">
            <tbody>
              {candidates.map((candidate, i) => {
                return (
                  <tr
                    key={candidate.code}
                    className="border-y border-y-black hover:bg-[var(--secondary-color)] cursor-pointer"
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
                        <VoteButton
                          key={`mob-${candidate.code}`}
                          candidateCode={candidate.code}
                        />
                      </div>
                    </td>
                    <td className="py-6"></td>
                    <td className="hidden lg:grid">
                      <VoteButton
                        key={`lg-${candidate.code}`}
                        candidateCode={candidate.code}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Container>
      </Suspense>
    </Container>
  );
}

function Skeleton() {
  return (
    <div
      className={
        "flex flex-col justify-center items-center w-full h-[100vh] border border-gray-50"
      }
    >
      <p className="font-[500]">Loading....</p>
    </div>
  );
}
