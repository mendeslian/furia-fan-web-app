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
      <Input name="email" label="Email" placeholder="Email" required={true} />
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

      <h3 className="font-semibold text-lg mb-3">Interesses e Atividades</h3>

      <Input
        name="esportsInterests"
        label="Interesses em e-sports (opcional)"
        placeholder="CS:GO, League of Legends, Valorant"
        helperText="Formato: Jogo 1,Jogo 2,Jogo 3 (separe os jogos com vírgula)"
      />
      <Input
        name="attendedEvents"
        label="Eventos que participou (opcional)"
        placeholder="IEM Rio Major 2022/2022-11-13/Rio de Janeiro"
        helperText="Formato: Nome/Data/Local (separe eventos com ponto e vírgula)"
      />
      <Input
        name="participatedActivities"
        label="Atividades que participou (opcional)"
        placeholder="Campeonato Universitário/2023-05-10/Participação em campeonato universitário"
        helperText="Formato: Nome/Data/Descrição (separe atividades com ponto e vírgula)"
      />
      <Input
        name="purchases"
        label="Compras realizadas (opcional)"
        placeholder="Camiseta FURIA/120/2023-08-10"
        helperText="Formato: Item/Valor/Data (separe compras com ponto e vírgula)"
      />
    </>
  );
}
