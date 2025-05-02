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
import {
  createUser,
  uploadDocument,
  connectSocialMedia,
} from "../../services/userService";

export default function Form() {
  const methods = useForm();
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [formData, setFormData] = useState({});

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      toast.success("Usuário criado com sucesso!");
      return data;
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Erro ao criar usuário. Tente novamente."
      );
      throw error;
    },
  });

  // Upload document mutation
  const uploadDocumentMutation = useMutation({
    mutationFn: ({ userId, documentData }) =>
      uploadDocument(userId, documentData),
    onSuccess: () => {
      toast.success("Documento enviado com sucesso!");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Erro ao enviar documento. Tente novamente."
      );
      throw error;
    },
  });

  // Connect social media mutation
  const connectSocialMediaMutation = useMutation({
    mutationFn: ({ userId, socialData }) =>
      connectSocialMedia(userId, socialData),
    onError: (error) => {
      console.error("Error connecting social media:", error);
      // We don't show toast errors for social media as they're not critical
    },
  });

  const handleStepSubmit = async (data) => {
    try {
      const newFormData = { ...formData };

      switch (currentStep) {
        case 1:
          // Personal data step
          newFormData.name = data.name;
          newFormData.email = data.email;
          newFormData.cpf = data.cpf.replace(/\D/g, "");
          newFormData.address = {
            street: data.street,
            number: data.number,
            city: data.city,
            state: data.state,
            neighborhood: data.neighborhood,
            complement: data.complement || "",
            zipCode: data.zipCode.replace(/\D/g, ""),
          };
          newFormData.esportsInterests = data.esportsInterests
            ? data.esportsInterests.split(",").map((item) => item.trim())
            : [];
          newFormData.attendedEvents = data.attendedEvents
            ? data.attendedEvents.split(";").map((event) => {
                const [name, date, location] = event
                  .split("/")
                  .map((item) => item.trim());
                return {
                  name: name || "Evento",
                  date: parseDate(date),
                  location: location || "Local não especificado",
                };
              })
            : [];
          newFormData.participatedActivities = data.participatedActivities
            ? data.participatedActivities.split(";").map((activity) => {
                const [name, date, description] = activity
                  .split("/")
                  .map((item) => item.trim());
                return {
                  name: name || "Atividade",
                  date: parseDate(date),
                  description: description || "Sem descrição",
                };
              })
            : [];
          newFormData.purchases = data.purchases
            ? data.purchases.split(";").map((purchase) => {
                const [item, amount, date] = purchase
                  .split("/")
                  .map((item) => item.trim());
                return {
                  item: item || "Item",
                  amount: Number(amount) || 0,
                  date: parseDate(date),
                };
              })
            : [];
          break;

        case 2:
          // Document step
          newFormData.documentType = data.documentType;
          newFormData.documentNumber = data.documentNumber.replace(/\D/g, "");
          newFormData.documentImage = data.documentImage;
          break;

        case 3:
          // Social media step - final step
          try {
            // Create user with all collected data
            const userData = await createUserMutation.mutateAsync({
              name: newFormData.name,
              email: newFormData.email,
              cpf: newFormData.cpf,
              address: newFormData.address,
              esportsInterests: newFormData.esportsInterests,
              attendedEvents: newFormData.attendedEvents,
              participatedActivities: newFormData.participatedActivities,
              purchases: newFormData.purchases,
            });

            // Get the user ID from the response
            const userId = userData.user.id;

            // Upload document
            await uploadDocumentMutation.mutateAsync({
              userId,
              documentData: {
                documentType: newFormData.documentType,
                documentNumber: newFormData.documentNumber,
                documentImage: newFormData.documentImage,
              },
            });

            // Connect single social media account
            if (data.socialMediaPlatform && data.socialMediaAccount) {
              await connectSocialMediaMutation.mutateAsync({
                userId,
                socialData: {
                  platform: data.socialMediaPlatform,
                  accountId: data.socialMediaAccount,
                },
              });
            }

            toast.success("Cadastro finalizado com sucesso!");
            methods.reset();
            setCurrentStep(1);
            setCompletedSteps([]);
            setFormData({});
            return;
          } catch (error) {
            console.error("Error in final submission:", error);
            toast.error(
              error?.response?.data?.message ||
                error?.message ||
                "Erro ao finalizar cadastro. Tente novamente."
            );
            return;
          }
      }

      setFormData(newFormData);
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep((prev) => prev + 1);
      toast.success("Dados salvos com sucesso!");
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Erro ao salvar dados. Tente novamente."
      );
    }
  };

  const parseDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toISOString().split("T")[0];
    } catch {
      return new Date().toISOString().split("T")[0];
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-4 w-full">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div
            className={`rounded-full font-semibold h-8 w-8 flex items-center justify-center ${
              completedSteps.includes(step.number)
                ? "bg-yellow-500 text-white"
                : currentStep === step.number
                ? "bg-yellow-500 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            {completedSteps.includes(step.number) ? (
              <Icon icon="Check" size={16} />
            ) : (
              step.number
            )}
          </div>
          <span
            className={`ml-2 text-sm text-nowrap font-medium ${
              currentStep >= step.number ? "text-gray-900" : "text-gray-400"
            }`}
          >
            {step.title}
          </span>
          {index < steps.length - 1 && (
            <div className="h-[2px] w-23 mx-2 bg-gray-300" />
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
              onSubmit={methods.handleSubmit(handleStepSubmit)}
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
              <div className="flex justify-between mt-2">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    disabled={
                      createUserMutation.isPending ||
                      uploadDocumentMutation.isPending ||
                      connectSocialMediaMutation.isPending
                    }
                  >
                    Voltar
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={
                    createUserMutation.isPending ||
                    uploadDocumentMutation.isPending ||
                    connectSocialMediaMutation.isPending
                  }
                  fullWidth={
                    currentStep === 1 ||
                    !completedSteps.includes(currentStep - 1)
                  }
                >
                  {createUserMutation.isPending ||
                  uploadDocumentMutation.isPending
                    ? "Enviando..."
                    : currentStep === steps.length
                    ? "Finalizar cadastro"
                    : "Salvar e continuar"}
                </Button>
              </div>
              {(createUserMutation.isPending ||
                uploadDocumentMutation.isPending ||
                connectSocialMediaMutation.isPending) && <Loader />}
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
