import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const voter = searchParams.get('voter');

    if (!voter) {
        return NextResponse.json({
            status: 'error',
            message: 'not found'
        }, {
            status: 404
        })
    }

    try {
        await prisma.votes.findUniqueOrThrow({
            where: {
                email: voter!
            }
         })
    } catch (error) {
        return NextResponse.json({
            status: 'ELIGIBLE_TO_VOTE'
        }, {
            status: 404
        })
    }

 
    return NextResponse.json({
        status: 'ALREADY_VOTED'
    })
}