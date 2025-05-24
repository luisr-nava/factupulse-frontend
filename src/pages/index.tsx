import Head from "next/head";
import { Landing } from "@/modules/landing";

export default function Home() {
  return (
    <>
      <Head>
        <title>FactuPulse</title>
        <meta
          name="description"
          content="FactuPulse es una plataforma para emprendedores..."
        />
        <link rel="icon" href="/factu-pulse.ico" />
      </Head>
      <>
        <Landing />
      </>
    </>
  );
}

