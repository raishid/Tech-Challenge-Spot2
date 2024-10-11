"use client";
import HeaderLayout from "@/components/HeaderLayout";
import Acortada from "@/components/Acortada";
import useAcortadorStore from "@/stores/acortador";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const { state } = useAcortadorStore;
    if (state.shorten === "") {
      router.push("/");
    }
  }, []);

  return (
    <>
      <HeaderLayout />
      <main className="content-center h-[70vh] px-[20px] lg:px-0">
        <Acortada />
      </main>
    </>
  );
}
