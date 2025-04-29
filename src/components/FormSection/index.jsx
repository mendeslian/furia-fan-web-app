// Components
import Input from "../Input";
import Button from "../Button";
import Icon from "../icon";
import Loader from "../Loader";
import TextLoader from "../TextLoader";
import { useForm, FormProvider } from "react-hook-form";

export default function Form() {
  const methods = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section
      className="min-h-screen bg-[radial-gradient(circle_at_70%_90%,#eab308_0%,rgba(93,254,214,0)_40%)]

"
      id="form"
    >
      <div className="max-w-5xl w-full mx-auto flex flex-col items-center gap-6 px-5 py-20">
        <div className="w-full flex flex-col items-center justify-center gap-2 md:flex-row">
          <h2 className="text-2xl font-bold text-center">
            Não fique parado, fale conosco
          </h2>
        </div>
        <div className="max-w-xl w-full bg-white/95  rounded-md overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.15)]">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="w-full h-full p-6 flex flex-col gap-3"
            >
              <Input
                name="name"
                label="Nome completo"
                placeholder="Nome completo"
                required={true}
              />
              <div className="flex gap-4">
                <Input
                  name="street"
                  label="Rua"
                  placeholder="Rua"
                  required={true}
                />
                <Input
                  name="number"
                  label="Número"
                  placeholder="100"
                  required={true}
                  className="max-w-20"
                  pattern={{
                    value: /^[0-9]+$/,
                    message: "Apenas números são permitidos",
                  }}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <Input
                name="city"
                label="Cidade"
                placeholder="Cidade"
                required={true}
              />
              <Input
                name="state"
                label="Estado"
                placeholder="Estado"
                required={true}
              />
              <Input
                name="cpf"
                label="CPF"
                placeholder="000.000.000-00"
                required={true}
                mask="###.###.###-##"
                // Remove the pattern validation since it's causing conflicts
                validate={(value) => {
                  // Get only digits
                  const digits = value.replace(/\D/g, "");
                  // Return true if valid (11 digits)
                  return digits.length === 11 || "CPF deve conter 11 dígitos";
                }}
                // Limit input to max 14 characters (including formatting)
                maxLength={14}
              />
              <Button type="submit">Enviar</Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
