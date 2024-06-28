import { NextResponse } from "next/server";
import db from "@repo/db/client"

export const GET = async () => {
    await db.todo.create({
        data:{
            title: "jjkj",
            userId: 1,
        }
    })
    return NextResponse.json({
        msg: "user created"
    })
}
