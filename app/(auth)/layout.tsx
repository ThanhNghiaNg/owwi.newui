"use client";

import { query } from "@/api/query";
import { DotLoader } from "@/components/ui/skeleton/dot-loader";
import ERROR_MESSAGE from "@/utils/constants/error-message";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import toast from "react-hot-toast";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: res, isFetching } = useQuery(query.user.whoami());

  useEffect(() => {
    if (!isFetching && !res?.isLoggedIn) {
      // setTimeout(() => {
        toast.error(ERROR_MESSAGE.UNAUTHORIZED);
        router.replace("/login");
      // }, 150);
    }
  }, [res, isFetching, router]);

  if (isFetching || !res?.isLoggedIn) return <DotLoader />;  // Block UI until check done

  return <>{children}</>;
}
