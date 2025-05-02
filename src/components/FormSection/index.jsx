import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

// Components
import Icon from "../icon";
import Button from "../Button";
import Loader from "../Loader";
import PersonalDataForm from "../PersonalDataForm";
import DocumentForm from "../DocumentForm";
import SocialMediaForm from "../SocialMediaForm";

// Hooks
import { useToast } from "../../hooks/useToast";

// Services
import { createUser } from "../../services/userService";

export default function Form() {
  const methods = useForm();
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState(1);

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

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8 w-full">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div
            className={`rounded-full font-semibold h-8 w-8 flex items-center justify-center ${
              currentStep > step.number
                ? "bg-yellow-500 text-white"
                : currentStep === step.number
                ? "bg-yellow-500 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            {currentStep > step.number ? (
              <Icon icon="Check" size={16} />
            ) : (
              step.number
            )}
          </div>
          <span
            className={`ml-2 text-sm font-medium ${
              currentStep >= step.number ? "text-gray-900" : "text-gray-400"
            }`}
          >
            {step.title}
          </span>
          {index < steps.length - 1 && (
            <div className="h-[2px] w-32 mx-4 bg-gray-300" />
          )}
        </div>
      ))}
    </div>
  );

  const steps = [
    { number: 1, title: "Dados pessoais", component: PersonalDataForm },
    { number: 2, title: "Documentos", component: DocumentForm },
    { number: 3, title: "Redes sociais", component: SocialMediaForm },
  ];

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
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
        <div className="max-w-2xl w-full bg-white/95 rounded-md overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.15)] mb-8">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="w-full h-full p-6 flex flex-col gap-3"
            >
              {renderStepIndicator()}
              {steps.map(
                (step) =>
                  currentStep === step.number && (
                    <div key={step.number}>
                      <step.component />
                    </div>
                  )
              )}
              <div className="flex justify-between mt-6">
                {currentStep > 1 && (
                  <Button type="button" onClick={prevStep}>
                    Voltar
                  </Button>
                )}
                {currentStep < steps.length ? (
                  <Button type="button" onClick={nextStep}>
                    Próximo
                  </Button>
                ) : (
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Enviando..." : "Cadastrar"}
                  </Button>
                )}
              </div>
              {isLoading && <Loader />}
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
