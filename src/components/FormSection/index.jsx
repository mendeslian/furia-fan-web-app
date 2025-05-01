import { useForm, FormProvider } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

// Components
import Button from "../Button";
import Loader from "../Loader";
import PersonalDataForm from "../PersonalDataForm";

// Hooks
import { useToast } from "../../hooks/useToast";

// Services
import { createUser } from "../../services/userService";

export default function Form() {
  const methods = useForm();
  const toast = useToast();

  const { mutate, isLoading } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("Usuário cadastrado com sucesso!");
      methods.reset();
    },
    onError: (err) => {
      toast.error(
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

    const parseDate = (dateStr) => {
      try {
        const date = new Date(dateStr);
        return date.toISOString().split("T")[0];
      } catch {
        return new Date().toISOString().split("T")[0]; // fallback to current date
      }
    };

    const userPayload = {
      name: data.name,
      email: data.email,
      cpf: data.cpf.replace(/\D/g, ""),
      address,
      esportsInterests: data.esportsInterests
        ? data.esportsInterests.split(",").map((item) => item.trim())
        : [],
      attendedEvents: data.attendedEvents
        ? data.attendedEvents.split(";").map((event) => {
            const [name, date, location] = event
              .split("|")
              .map((item) => item.trim());
            return {
              name: name || "Evento",
              date: parseDate(date),
              location: location || "Local não especificado",
            };
          })
        : [],
      participatedActivities: data.participatedActivities
        ? data.participatedActivities.split(";").map((activity) => {
            const [name, date, description] = activity
              .split("|")
              .map((item) => item.trim());
            return {
              name: name || "Atividade",
              date: parseDate(date),
              description: description || "Sem descrição",
            };
          })
        : [],
      purchases: data.purchases
        ? data.purchases.split(";").map((purchase) => {
            const [item, amount, date] = purchase
              .split("|")
              .map((item) => item.trim());
            return {
              item: item || "Item",
              amount: Number(amount) || 0,
              date: parseDate(date),
            };
          })
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
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
