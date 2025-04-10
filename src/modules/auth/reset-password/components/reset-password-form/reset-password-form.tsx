"use client";

import { useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return <div></div>;
}

