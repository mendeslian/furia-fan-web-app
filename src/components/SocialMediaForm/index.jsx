import Input from "../Input";
import Select from "../Select";

export default function SocialMediaForm() {
  return (
    <>
      <h3 className="font-semibold text-lg mt-4 mb-2">Conectar Rede Social</h3>
      <Select
        name="platform"
        label="Plataforma"
        required={true}
        options={[
          { value: "instagram", label: "Instagram" },
          { value: "twitter", label: "Twitter" },
          { value: "twitch", label: "Twitch" },
          { value: "facebook", label: "Facebook" },
        ]}
      />
      <Input
        name="accountId"
        label="Identificador da conta"
        placeholder="@exemplo"
        required={true}
      />
    </>
  );
}
