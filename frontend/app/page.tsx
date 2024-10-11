import Acortador from "@/components/Acortador";
import HeaderLayout from "@/components/HeaderLayout";
import History from "@/components/History";

export default function Page() {
  return (
    <>
      <HeaderLayout />
      <main className="content-center h-[70vh] px-[20px] lg:px-0">
        <Acortador />
        <section className="mt-8 lg:mt-20 w-full lg:px-8">
          <History />
        </section>
      </main>
    </>
  );
}
