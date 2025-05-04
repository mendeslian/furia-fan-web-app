// Assets
import FuriaBackground from "../../assets/furia-background.png";

export default function HeroSection() {
  return (
    <>
      <section
        className="w-full h-screen  relative flex flex-col justify-center items-center"
        aria-labelledby="welcome-heading"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-99"
          style={{
            backgroundImage: `url(${FuriaBackground})`,
          }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="max-w-5xl w-full mx-auto relative z-10 flex flex-col items-center gap-6 px-5">
          <div className="text-center max-w-140">
            <h1
              id="welcome-heading"
              className="text-white text-4xl font-bold mb-4"
            >
              Know Your Fan!
            </h1>
            <h2 className="text-white/90 text-lg font-medium ">
              Bem-vindo à experiência definitiva para os verdadeiros fãs da
              FURIA! Aqui, você mostra todo seu apoio à melhor equipe de
              e-sports do Brasil e ainda fica por dentro das novidades,
              conteúdos exclusivos e tudo que rola nos bastidores.
            </h2>
          </div>
          <div className="flex gap-4">
            <a
              href="#form"
              className="h-10 flex items-center justify-center text-lg gap-2 px-4 rounded-sm cursor-pointer duration-200 drop-shadow-md text-md font-semibold disabled:cursor-default bg-neutral-50 hover:bg-neutral-300 text-neutral-900 shadow-2xl"
              aria-label="Começar a conversar com o Furia BOT"
            >
              Preencher formulário
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
