"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "../utils/storage";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();

    if (!user) {
      router.replace("/login");
    }
  }, [router]);

  return <>{children}</>;
}
