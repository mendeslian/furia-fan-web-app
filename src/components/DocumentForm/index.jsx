import { useFormContext, useWatch } from "react-hook-form";
import { useRef, useState } from "react";
import Input from "../Input";
import Select from "../Select";

export default function DocumentForm() {
  const { setValue, control } = useFormContext();
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const documentType = useWatch({
    control,
    name: "documentType",
  });

  return (
    <>
      <h3 className="font-semibold text-lg mt-4 mb-2">Documento</h3>
      <div className="flex gap-4 mb-4">
        <Select
          name="documentType"
          label="Tipo de Documento"
          required={true}
          options={[
            { value: "RG", label: "RG" },
            { value: "CPF", label: "CPF" },
          ]}
        />
        <Input
          name="documentNumber"
          label="Número do Documento"
          placeholder={
            documentType === "RG"
              ? "00.000.000-0"
              : documentType === "CPF"
              ? "000.000.000-00"
              : "Número"
          }
          required={true}
          mask={
            documentType === "RG"
              ? "##.###.###-#"
              : documentType === "CPF"
              ? "###.###.###-##"
              : undefined
          }
          validate={(value) => {
            if (!value) return true;
            const digits = value.replace(/\D/g, "");
            if (documentType === "RG") {
              return digits.length === 9 || "RG deve conter 9 dígitos";
            }
            if (documentType === "CPF") {
              return digits.length === 11 || "CPF deve conter 11 dígitos";
            }
            return true;
          }}
          maxLength={
            documentType === "RG" ? 12 : documentType === "CPF" ? 14 : 20
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="documentImage"
          className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded cursor-pointer duration-200 transition-colors w-fit ${
            fileName
              ? "bg-yellow-500 text-white hover:bg-yellow-600"
              : "bg-neutral-100 hover:bg-neutral-200"
          }`}
        >
          {fileName ? "Documento selecionado" : "Selecionar documento"}
        </label>
        <input
          required={true}
          id="documentImage"
          name="documentImage"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              setValue("documentImage", files[0]);
              setFileName(files[0].name);
            } else {
              setValue("documentImage", null);
              setFileName("");
            }
          }}
          className="hidden"
        />
        <span className="text-sm text-neutral-700">
          {fileName || "Nenhum arquivo selecionado"}
        </span>
      </div>
    </>
  );
}
