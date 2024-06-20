import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await getServerSession(authOptions)
  if(session?.user) {
    redirect('/user')
  } else{
    redirect('/api/auth/signin')
  }

}
