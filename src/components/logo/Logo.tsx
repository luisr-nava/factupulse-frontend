import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 hover:scale-105 duration-500">
      <Image
        src="/factu-pulse.svg"
        alt="FactuPulse Logo"
        width={45}
        height={45}
      />
      <h1 className="text-xl font-extrabold text-primary">FactuPulse</h1>
    </div>
  );
}


