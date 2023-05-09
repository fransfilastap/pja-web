import { ComponentProps } from "react";

export default function Title({ children }: ComponentProps<"h1">) {
  return (
    <h1 className="text-4xl pb-2 text-transparent bg-clip-text bg-gradient-to-br from-[#FCAA43] from-5% via-[#943C30] via-20% to-[#5941A9] to-75% lg:text-6xl mb-10 tracking-normal font-body font-[700] text-black">
      {children}
    </h1>
  );
}
