import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {

    const isVotingDone = await prisma.appConfig.findFirst({
        where: {
            key: "IS_VOTING_DONE",
        },
    });

    const isVotingStart = await prisma.appConfig.findFirst({
        where: {
        key: "IS_VOTING_START",
        },
    });    

    if (!isVotingStart?.value) {
        return NextResponse.json({
            status: "voting not started",
        }, {
            status: 401
        })
    }
    
    if (isVotingDone?.value) {
        return NextResponse.json({
            status: "voting closed",
        }, {
            status: 401
        })
    }

    const session = await getServerSession(authOptions)
    if (session) {
        const body = await req.json();     
        await prisma.votes.create({
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

    return NextResponse.json({ status:'error',message:'unauthorized'},{status:401})
}

   


