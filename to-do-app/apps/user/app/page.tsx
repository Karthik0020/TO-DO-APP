import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";


export default function Home() {
    const session = getServerSession(authOptions)
    //@ts-ignore
    if(session?.user){
      redirect('./api/user')
    } else {
      redirect ('./api/auth/signin')
    }
  }
