import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export const GET = async () => {
   const session = await getServerSession(authOptions)
   console.log(session)
   
   if(session.user) {
    return NextResponse.json({
        user: session.user.name
    })
   }
   
   console.log(session.user)
    return NextResponse.json({
        msg: "user not loged in"
    })
}
