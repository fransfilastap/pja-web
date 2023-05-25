"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Button, { ButtonProps } from "./button";
import clsxm from "@/helpers/clsxm";
import { useState } from "react";

export default function VoteButton({
  candidateCode,
  className,
  ...rest
}: { candidateCode: string } & ButtonProps) {
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const { data: session } = useSession();

  const vote = async (candidate: string) => {
    const res = await fetch("api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: candidate,
        email: session?.user?.email,
      }),
    });

    if (res.status === 200) {
      alert("Terima kasih!");
    }
  };

  const isVoted = async (email: string) => {
    const res = await fetch(`api/vote/check?voter=${email}`);
    if (res.status === 404) return true;
    return false;
  };

  const clickHandler = async () => {
    if (!session?.user) {
      await signIn();
    } else {
      setIsSubmiting(true);
      const voted = await isVoted(session.user.email!);
      if (voted) {
        await vote(candidateCode);
      } else {
        alert("sudah voting");
      }
      setIsSubmiting(false);
    }
  };

  return (
    <Button className={clsxm(className)} onClick={clickHandler} {...rest}>
      {isSubmiting && <span>...</span>}
      {!isSubmiting && <span>Vote</span>}
    </Button>
  );
}
