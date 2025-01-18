"use client";
import CommonWrapper from "@/components/CommonWrapper";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("@/components/GetLocation"),
  { ssr: false }
);

export default function Cadastrar() {
  return (
    <CommonWrapper>
      <DynamicComponentWithNoSSR />
    </CommonWrapper>
  );
}
