import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server"

export async function GET() {
    
   const res = await prisma.appConfig.findFirst({
    where: {
      key: "IS_VOTING_START",
    },
  });
 
    return NextResponse.json({
      start: res?.value,
      
    })
}




