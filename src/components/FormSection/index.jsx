// Components
import Button from "../Button";
import PersonalDataForm from "../PersonalDataForm";
import Loader from "../Loader";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { createUser } from "../../services/userService";
import { useMutation } from "@tanstack/react-query";

export default function Form() {
  const methods = useForm();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      console.log("Formulario preenchido com sucesso");
      setSuccessMsg("Usuário cadastrado com sucesso!");
      methods.reset();
    },
    onError: (err) => {
      setErrorMsg(
        err?.response?.data?.message ||
          err?.message ||
          "Erro ao cadastrar usuário. Tente novamente."
      );
    },
  });

  const onSubmit = async (data) => {
    const address = {
      street: data.street,
      number: data.number,
      city: data.city,
      state: data.state,
      neighborhood: data.neighborhood,
      complement: data.complement,
      zipCode: data.zipCode,
    };

    const userPayload = {
      name: data.name,
      cpf: data.cpf,
      address,
      esportsInterests: data.esportsInterests
        ? data.esportsInterests.split(",").map((item) => item.trim())
        : [],
      attendedEvents: data.attendedEvents
        ? data.attendedEvents.split(",").map((item) => item.trim())
        : [],
      participatedActivities: data.participatedActivities
        ? data.participatedActivities.split(",").map((item) => item.trim())
        : [],
      purchases: data.purchases
        ? data.purchases.split(",").map((item) => item.trim())
        : [],
    };

    mutate(userPayload);
  };

  return (
    <section
      className="min-h-screen bg-[radial-gradient(circle_at_70%_90%,#eab308_0%,rgba(93,254,214,0)_40%)]"
      id="form"
    >
      <div className="max-w-5xl w-full mx-auto flex flex-col items-center gap-6 px-5 py-20">
        <div className="w-full flex flex-col items-center justify-center gap-2 md:flex-row">
          <h2 className="text-2xl font-bold text-center">
            Não fique parado, fale conosco
          </h2>
        </div>
        <div className="max-w-xl w-full bg-white/95 rounded-md overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.15)] mb-8">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="w-full h-full p-6 flex flex-col gap-3"
            >
              <PersonalDataForm />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Cadastrar"}
              </Button>
              {isLoading && <Loader />}
              {successMsg && (
                <div className="text-green-600 text-sm">{successMsg}</div>
              )}
              {errorMsg && (
                <div className="text-red-600 text-sm">{errorMsg}</div>
              )}
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
