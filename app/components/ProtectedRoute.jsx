"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, removeUser } from "../utils/storage";
import { API_URL } from "../utils/api";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const user = getUser();
      if (!user) {
        router.replace("/login");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/users/me`, {
          credentials: "include",
        });

        if (!response.ok) {
          removeUser();
          router.replace("/login");
          return;
        }

        setChecked(true);
      } catch (error) {
        removeUser();
        router.replace("/login");
      }
    };

    verify();
  }, [router]);

  if (!checked) return null;

  return <>{children}</>;
}
