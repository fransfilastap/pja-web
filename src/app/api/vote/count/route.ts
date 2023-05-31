import { prisma } from "@/lib/prisma";
import { toNumber } from "lodash";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) { 
    const { searchParams } = new URL(req.url);
    const candidateId = searchParams.get('c');

    if (!candidateId) {
        return NextResponse.json({
            status: 'error',
            message: 'not found'
        }, {
            status: 404
        })
    }

    try {
        const result = await prisma.candidateVotes.findFirst({
            where: {
                id: toNumber(candidateId)
            }
        })
        return NextResponse.json({
            votes: Number(result?.votes)
        })
         
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 'ELIGIBLE_TO_VOTE'
        }, {
            status: 404
        })
    }
}