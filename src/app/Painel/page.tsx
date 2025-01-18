"use client";
import CommonWrapper from "@/components/CommonWrapper";
import dynamic from "next/dynamic";
const Dashboard = dynamic(() => import("@/components/Dashboard"), {
  ssr: false,
});
export default function Painel() {
  return (
    <CommonWrapper>
      <Dashboard />
    </CommonWrapper>
  );
}
