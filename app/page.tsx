'use client'
import { APP_VERSION } from "@/lib/env";
import { useRouter } from "next/navigation"
import { useEffect } from "react";


export default function Page() {
  const router = useRouter();
  router.push("/dashboard");
  useEffect(()=>{
    console.debug("App version: ", APP_VERSION);
  },[])
  return <></>
}
