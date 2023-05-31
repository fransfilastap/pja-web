import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "@/lib/auth";
import { TURNSTILE_SECRET } from "@/config/env";
import { trim } from "lodash";

const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const BLACKLIST_DOMAINS = ['@semart77.com','@oneweek2.com','@casvaro1.com','@netnot.site','@yahoo.co.id','@vevaw.com','@vleeeew.site','@dunepo.com','@hotmail.com','@yahoo.co.id','@ymail.com','@yyyegdf.top','@outlook.co.id','@butyusa.com','@vanilla95.com'];

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

    if (session?.user?.email !== undefined || session?.user?.email !== null) {

        //check domain
        if (!session?.user?.email?.includes('@gmail.com')) {
            return NextResponse.json({
                status: 'invalid email',
            }, {
                status: 400
            })
        }
        
        await prisma.votes.create({
            data: {
                email: session?.user?.email!,
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

   


