"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Button, { ButtonProps } from "./button";
import clsxm from "@/helpers/clsxm";
import { useEffect, useState } from "react";
import { TurnstileInstance } from "@marsidev/react-turnstile";
import { headers } from "next/headers";

export default function VoteButton({
  candidateCode,
  className,
  turnstile,
  csrfToken,
  ...rest
}: {
  candidateCode: string;
  turnstile: TurnstileInstance | null;
  csrfToken: string;
} & ButtonProps) {
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const { data: session } = useSession();
  const [turnstileResponse, setTurnstileResponse] = useState<string>();

  useEffect(() => {
    if (turnstile) {
      setTurnstileResponse(turnstile.getResponse());
    }
  }, [turnstile]);

  const vote = async (candidate: string) => {
    const res = await fetch("api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: candidate,
        email: session?.user?.email,
        turnsitle_response: turnstileResponse,
        csrf_token: csrfToken,
      }),
    });

    console.log(csrfToken);

    if (res.status === 200) {
      alert("Terima kasih!");
    } else {
      const data = await res.json();
      alert(data.status);
    }
  };

  const isVoted = async (email: string) => {
    const res = await fetch(`api/vote/check?voter=${email}`);
    if (res.status === 404) return true;
    return false;
  };

  const clickHandler = async () => {
    if (!turnstileResponse) {
      alert("Gagal mengambil Anti-bot token. Tunggu / Refresh.");
      return;
    }

    if (!session?.user) {
      await signIn();
    } else {
      setIsSubmiting(true);
      const voted = await isVoted(session.user.email!);
      if (voted) {
        await vote(candidateCode);
      } else {
        alert("Maaf satu email hanya dapat digunakan satu kali voting.");
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
