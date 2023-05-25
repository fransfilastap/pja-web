
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    
   const res = await prisma.appConfig.findFirst({
    where: {
      key: "IS_VOTING_DONE",
    },
  });
 
return NextResponse.json({
    done: res?.value,
})
}