import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
    
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
    } else {
        return NextResponse.json({ status:'error',message:'unauthorized'},{status:401})
    }
}

   


