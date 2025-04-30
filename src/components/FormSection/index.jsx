// Components
import Input from "../Input";
import Button from "../Button";
import Icon from "../icon";
import Select from "../Select";
import Loader from "../Loader";
import TextLoader from "../TextLoader";
import { useForm, FormProvider } from "react-hook-form";
import { useState, useRef } from "react";
import {
  createUser,
  uploadDocument,
  connectSocialMedia,
} from "../../services/userService";

export default function Form() {
  const methods = useForm();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef();

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      // Monta o objeto address conforme esperado pelo backend
      const address = {
        street: data.street,
        number: data.number,
        city: data.city,
        state: data.state,
      };
      const userPayload = {
        name: data.name,
        cpf: data.cpf,
        address,
        email: data.email || "",
        esportsInterests: [],
        attendedEvents: [],
        participatedActivities: [],
        purchases: [],
      };
      // 1. Cria usuário
      const response = await createUser(userPayload);
      const userId = response?.data?.user?.id || response?.user?.id;
      if (!userId) throw new Error("ID do usuário não retornado!");

      // 2. Se documento preenchido, faz upload
      if (
        data.documentImage?.length &&
        data.documentType &&
        data.documentNumber
      ) {
        const file = data.documentImage[0];
        const documentData = {
          documentImage: file,
          documentType: data.documentType,
          documentNumber: data.documentNumber,
        };
        await uploadDocument(userId, documentData);
      }

      // 3. Se rede social preenchida, conecta
      if (data.platform && data.accountId && data.accessToken) {
        await connectSocialMedia(userId, {
          platform: data.platform,
          accountId: data.accountId,
          accessToken: data.accessToken,
        });
      }

      setSuccessMsg("Usuário cadastrado com sucesso!");
      methods.reset();
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setErrorMsg(
        err?.response?.data?.message ||
          err?.message ||
          "Erro ao cadastrar usuário. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
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
              {/* Dados do usuário */}
              <h3 className="font-semibold text-lg mb-2">Dados pessoais</h3>
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
              <div className="flex gap-4  flex-col sm:flex-row">
                <Input
                  name="complement"
                  label="Complemento (opcional)"
                  placeholder="Apartamento, casa, etc."
                />
                <Input
                  name="neighborhood"
                  label="Bairro"
                  placeholder="Bairro"
                  required={true}
                />
              </div>
              <div className="flex gap-4  flex-col sm:flex-row">
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
                  name="zipCode"
                  label="CEP"
                  placeholder="00000-000"
                  required={true}
                  mask="#####-###"
                  pattern={{
                    value: /^[0-9]{8}$/,
                    message: "CEP deve conter 8 dígitos numéricos",
                  }}
                  maxLength={9}
                />
              </div>
              <Input
                name="cpf"
                label="CPF"
                placeholder="000.000.000-00"
                required={true}
                mask="###.###.###-##"
                validate={(value) => {
                  const digits = value.replace(/\D/g, "");
                  return digits.length === 11 || "CPF deve conter 11 dígitos";
                }}
                maxLength={14}
              />
              {/* Documento */}
              <h3 className="font-semibold text-lg mt-4 mb-2">Documento</h3>
              <div className="flex gap-4">
                <Select
                  name="documentType"
                  label="Tipo de Documento (opcional)"
                  required={false}
                  options={[
                    { value: "RG", label: "RG" },
                    { value: "CNH", label: "CNH" },
                    { value: "Passaporte", label: "Passaporte" },
                    { value: "Outro", label: "Outro" },
                  ]}
                />
                <Input
                  name="documentNumber"
                  label="Número do Documento (opcional)"
                  placeholder="Número"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="documentImage"
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold  rounded cursor-pointer bg-neutral-100  duration-200 transition-colors w-fit "
                >
                  Selecionar documento
                </label>
                <input
                  id="documentImage"
                  name="documentImage"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => {
                    methods.setValue("documentImage", e.target.files);
                  }}
                  className="hidden"
                />
                <span className="text-sm text-neutral-700">
                  {fileInputRef.current &&
                  fileInputRef.current.files &&
                  fileInputRef.current.files.length > 0
                    ? fileInputRef.current.files[0].name
                    : "Nenhum arquivo selecionado"}
                </span>
              </div>

              {/* Rede Social */}
              <h3 className="font-semibold text-lg mt-4 mb-2">
                Conectar Rede Social
              </h3>
              <Select
                name="platform"
                label="Plataforma (opcional)"
                required={false}
                options={[
                  { value: "RJ", label: "Rio de Janeiro" },
                  { value: "SP", label: "São Paulo" },
                ]}
              />
              <Input
                name="accountId"
                label="ID da Conta (opcional)"
                placeholder="ID da conta"
              />
              <Input
                name="accessToken"
                label="Access Token (opcional)"
                placeholder="Token de acesso"
              />
              <Button type="submit" disabled={loading}>
                {loading ? <TextLoader text="Enviando..." /> : "Cadastrar"}
              </Button>
              {loading && <Loader />}
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
