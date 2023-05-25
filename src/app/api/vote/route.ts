import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    
    const body = await req.json();
    const result = await prisma.votes.create({
        data: {
            email: body.email,
            candidate: {
                connect: {
                    code: body.code
                }
            }
        }
    })
 
    return NextResponse.json({
        status: "success",
    })
}


