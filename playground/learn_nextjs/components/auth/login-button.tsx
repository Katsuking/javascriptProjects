"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect", // defaultでは、redirect ユーザーが何も渡さなかった場合
  asChild
}: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    // console.log("Login button clicked");
    router.push("/auth/login")
  }

  if (mode === "modal") {
    return (
      <span>
        TODO: implement modal
      </span>
    )
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}