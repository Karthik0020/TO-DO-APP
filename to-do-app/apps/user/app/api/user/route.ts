import { NextResponse } from "next/server";
import db from "@repo/db/client"


export const GET = async () => {
    await db.user.create({
        data: {
            email:       "addasd",
            password:   "545454545",
            name:       "hihi"
        }
    })
    
    return NextResponse.json({
        message: "user created"
    })
}