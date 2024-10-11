"use client";
import Acortador from "@/components/Acortador";
import HeaderLayout from "@/components/HeaderLayout";

export default function Page() {
  return (
    <>
      <HeaderLayout />
      <main className="content-center h-[70vh] px-[20px] lg:px-0">
        <Acortador />
      </main>
    </>
  );
}
