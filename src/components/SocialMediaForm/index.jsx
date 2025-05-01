import { useFormContext } from "react-hook-form";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import Loader from "../Loader";

export default function SocialMediaForm() {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <>
      <h3 className="font-semibold text-lg mt-4 mb-2">Conectar Rede Social</h3>
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
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <TextLoader text="Enviando..." /> : "Cadastrar"}
      </Button>
    </>
  );
}
