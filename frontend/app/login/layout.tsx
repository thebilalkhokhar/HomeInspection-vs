import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In · Home Inspection",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
