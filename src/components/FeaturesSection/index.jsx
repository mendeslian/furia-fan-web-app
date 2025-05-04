// Components
import Icon from "../icon";

export default function Features() {
  const features = [
    {
      id: "personal",
      icon: "User",
      title: "Dados Pessoais",
      description:
        "Preencha seus dados pessoais para que possamos conhecer melhor você e personalizar sua experiência como fã da FURIA.",
    },
    {
      id: "documents",
      icon: "FileText",
      title: "Documentos",
      description:
        "Envie seus documentos de forma simples e segura. Utilizamos criptografia avançada para proteger suas informações.",
    },
    {
      id: "social",
      icon: "Globe",
      title: "Redes Sociais",
      description:
        "Conecte suas redes sociais para acompanhar novidades, participar de promoções exclusivas e interagir com a comunidade FURIA.",
    },
  ];

  return (
    <section className="w-full py-20 relative bg-neutral-100">
      <div className="max-w-5xl w-full mx-auto px-5 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-4">
          Processo de Cadastro
        </h2>
        <p className="text-neutral-600 text-center font-medium mb-16 max-w-xl mx-auto">
          Nosso formulário é dividido em etapas simples para facilitar seu
          cadastro
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white/95 min-h-80 rounded-md overflow-hidden shadow-lg p-6 flex flex-col items-center justify-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center mb-6">
                <Icon icon={feature.icon} size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <div className="w-20 h-1 mb-4 rounded-full bg-yellow-500"></div>
              <p className="text-neutral-500 text-sm font-semibold">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
