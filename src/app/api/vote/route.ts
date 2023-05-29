import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "@/lib/auth";
import { TURNSTILE_SECRET } from "@/config/env";

const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export async function POST(req: NextRequest) {
    
    const body = await req.json();     

    //verify bot
    const turnstileRes = await fetch(verifyEndpoint, {
        method: 'POST',
        body: `secret=${encodeURIComponent(`${TURNSTILE_SECRET}`)}&response=${encodeURIComponent(body.turnsitle_response)}`,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })

    const turnstileResData = await turnstileRes.json()

    console.log(turnstileResData)

    if (!turnstileResData.success) {
        return NextResponse.json({
            status: "verification failed",
        }, {
            status:400
        })
    }


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

   


