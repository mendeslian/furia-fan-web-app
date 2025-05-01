import { useFormContext } from "react-hook-form";
import Input from "../Input";
import Select from "../Select";

export default function DocumentForm({ fileInputRef }) {
  const { setValue } = useFormContext();

  return (
    <>
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
            setValue("documentImage", e.target.files);
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
    </>
  );
}
