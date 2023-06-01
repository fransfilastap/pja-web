"use client";

import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default function PJAConfetti() {
  const { width, height } = useWindowSize();
  return <Confetti width={width} height={height * 3} />;
}
