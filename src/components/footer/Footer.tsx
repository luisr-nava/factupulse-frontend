export default function Footer() {
  return (
    <footer>
      <div className="container mx-auto py-4 text-center lg:text-xl">
        <p className="text-gray-600 dark:text-white">
          <span className=" font-bold"> FactuPulse</span> &copy;{" "}
          {new Date().getFullYear()} Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

