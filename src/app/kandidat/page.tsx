import Container from "@/components/container";
import { Metadata } from "next";
import BlogPost from "@/components/blog-post";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Vote Kandidat - Paralegal Justice Awards",
  description: "Kandidat Non Litigation Peacemaker",
};

export default async function Page() {
  return (
    <Container className="p-6 my-20">
      <div className="flex flex-col items-start justify-between mb-10">
        <h2 className="font-[600] py-5 text-4xl font-heading text-transparent bg-clip-text bg-gradient-to-br from-[#FCAA43] from-5% via-[#943C30] via-20% to-[#5941A9] to-75%">
          Vote Kades/Lurah Terfavorit.
        </h2>
      </div>
      <Suspense fallback={<Skeleton />}>
        <div className="h-[30vh]">
          <h5 className="text-xl font-[500] font-heading">
            Voting dimulai tanggal 26/05/2023. Stay tuned!
          </h5>
        </div>
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
