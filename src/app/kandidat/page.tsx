import Container from "@/components/container";
import { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";
import { CandidateVotes } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import CandidateTable from "../candidate-table";

export const metadata: Metadata = {
  title: "Vote Kandidat - Paralegal Justice Awards",
  description: "Kandidat Non Litigation Peacemaker",
};

export const dynamic = "force-dynamic";

async function getCandidates(): Promise<CandidateVotes[]> {
  const result = await prisma.candidateVotes.findMany();

  return result;
}

async function isVotingStart() {
  const res = await prisma.appConfig.findFirst({
    where: {
      key: "IS_VOTING_START",
    },
  });

  return res?.value;
}

async function isVotingDone() {
  const res = await prisma.appConfig.findFirst({
    where: {
      key: "IS_VOTING_DONE",
    },
  });

  return res?.value;
}

export default async function Page() {
  const csrfToken = headers().get("X-CSRF-Token") || "missing";
  const candidates = await getCandidates();
  const votingDone = await isVotingDone();
  const votingStart = await isVotingStart();

  return (
    <Container className="p-6 my-20">
      <div className="flex flex-col items-start justify-between mb-10">
        <h2 className="font-[600] py-5 text-4xl font-heading text-transparent bg-clip-text bg-gradient-to-br from-[#FCAA43] from-5% via-[#943C30] via-20% to-[#5941A9] to-75%">
          Nominee
        </h2>
      </div>

      <Suspense fallback={<Skeleton />}>
        <CandidateTable
          csrfToken={csrfToken}
          isVotingStart={votingStart ?? false}
          isVotingDone={votingDone ?? false}
          candidates={candidates}
        />
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
