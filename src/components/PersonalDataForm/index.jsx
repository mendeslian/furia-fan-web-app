import Input from "../Input";

export default function PersonalDataForm() {
  return (
    <>
      <h3 className="font-semibold text-lg mb-2">Dados pessoais</h3>
      <Input
        name="name"
        label="Nome completo"
        placeholder="Nome completo"
        required={true}
      />
      <div className="flex gap-4">
        <Input name="street" label="Rua" placeholder="Rua" required={true} />
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
      <div className="flex gap-4 flex-col sm:flex-row">
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
      <div className="flex gap-4 flex-col sm:flex-row">
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
      <div className="flex gap-1 flex-col mb-2">
        <h3 className="font-semibold text-lg">Interesses e Atividades</h3>
        <p className="font-medium text-xs opacity-80">
          Obs: Separe as informações por vírgula
        </p>
      </div>

      <Input
        name="esportsInterests"
        label="Interesses em E-sports (opcional)"
        placeholder="CS:GO, League of Legends, Valorant"
        helperText="Separe os jogos por vírgula"
      />
      <Input
        name="attendedEvents"
        label="Eventos que participou (opcional)"
        placeholder="Major Rio 2022, ESL Pro League"
        helperText="Separe os eventos por vírgula"
      />
      <Input
        name="participatedActivities"
        label="Atividades que participou (opcional)"
        placeholder="Meet & Greet, Workshops"
        helperText="Separe as atividades por vírgula"
      />
      <Input
        name="purchases"
        label="Compras realizadas (opcional)"
        placeholder="Camiseta oficial, Mousepad"
        helperText="Separe as compras por vírgula"
      />
    </>
  );
}
