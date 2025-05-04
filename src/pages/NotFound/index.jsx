import { Link } from "react-router-dom";
import Button from "../../components/Button";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 py-20 bg-neutral-200">
      <div className="max-w-xl w-full bg-white rounded-md overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.15)] p-8 flex flex-col items-center">
        <h1 className="text-8xl font-bold text-yellow-500">404</h1>
        <h2 className="text-3xl font-semibold text-neutral-800 mt-4 mb-4 text-center">
          Página não encontrada
        </h2>
        <p className="text-neutral-600 text-center mb-4">
          Parece que você se perdeu. A página que você está procurando não
          existe ou foi movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/">
            <Button type="button" fullWidth>
              Voltar para a página inicial
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
