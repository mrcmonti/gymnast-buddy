import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Camera, User } from "lucide-react";

interface DadosPessoaisFormProps {
  dataNascimento: string;
  onDataNascimentoChange: (value: string) => void;
}

const DadosPessoaisForm = ({ dataNascimento, onDataNascimentoChange }: DadosPessoaisFormProps) => {
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const calcularIdade = (nascimento: string) => {
    if (!nascimento) return null;
    const hoje = new Date();
    const nasc = new Date(nascimento);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
    return idade;
  };

  const idade = calcularIdade(dataNascimento);
  const isMenor = idade !== null && idade < 18;

  return (
    <div className="space-y-8 section-fade-in">
      {/* Foto + Nome */}
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <label
            htmlFor="foto-upload"
            className="relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-input bg-muted transition-colors hover:border-primary/40 hover:bg-accent"
          >
            {fotoPreview ? (
              <img src={fotoPreview} alt="Foto do aluno" className="h-full w-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-1">
                <Camera className="h-5 w-5 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">Foto</span>
              </div>
            )}
            <input id="foto-upload" type="file" accept="image/*" className="hidden" onChange={handleFotoChange} />
          </label>
        </div>
        <div className="flex-1 space-y-1.5">
          <Label htmlFor="nome" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Nome completo <span className="text-destructive">*</span>
          </Label>
          <Input id="nome" placeholder="Nome legal do aluno" className="h-11 text-base" />
        </div>
      </div>

      {/* Row: Data nasc + CPF + RG */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="nascimento" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Data de nascimento <span className="text-destructive">*</span>
          </Label>
          <Input
            id="nascimento"
            type="date"
            value={dataNascimento}
            onChange={(e) => onDataNascimentoChange(e.target.value)}
            className="h-11"
          />
          {idade !== null && (
            <p className={`text-xs font-medium ${isMenor ? "text-warning" : "text-muted-foreground"}`}>
              {idade} anos {isMenor && "— Menor de idade"}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cpf" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            CPF <span className="text-destructive">*</span>
          </Label>
          <Input id="cpf" placeholder="000.000.000-00" className="h-11" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="rg" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            RG <span className="text-destructive">*</span>
          </Label>
          <Input id="rg" placeholder="00.000.000-0" className="h-11" />
        </div>
      </div>

      {/* Row: Sexo + Status */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Sexo / Gênero <span className="text-destructive">*</span>
          </Label>
          <Select>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="masculino">Masculino</SelectItem>
              <SelectItem value="feminino">Feminino</SelectItem>
              <SelectItem value="outro">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Status <span className="text-destructive">*</span>
          </Label>
          <Select defaultValue="ativo">
            <SelectTrigger className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
              <SelectItem value="trancado">Trancado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Contatos */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="telefone" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Telefone <span className="text-destructive">*</span>
          </Label>
          <Input id="telefone" placeholder="(00) 00000-0000" className="h-11" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            E-mail
          </Label>
          <Input id="email" type="email" placeholder="aluno@email.com" className="h-11" />
        </div>
      </div>

      {/* Endereço */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-muted-foreground">Endereço</h4>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="cep" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">CEP</Label>
            <Input id="cep" placeholder="00000-000" className="h-11" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="rua" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Rua</Label>
            <Input id="rua" placeholder="Nome da rua" className="h-11" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
          <div className="space-y-1.5">
            <Label htmlFor="numero" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Número</Label>
            <Input id="numero" placeholder="Nº" className="h-11" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="complemento" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Complemento</Label>
            <Input id="complemento" placeholder="Apto, bloco..." className="h-11" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="bairro" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Bairro</Label>
            <Input id="bairro" placeholder="Bairro" className="h-11" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cidade" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Cidade / UF</Label>
            <Input id="cidade" placeholder="Cidade - UF" className="h-11" />
          </div>
        </div>
      </div>

      {/* Observações */}
      <div className="space-y-1.5">
        <Label htmlFor="obs" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Observações gerais
        </Label>
        <Textarea id="obs" placeholder="Anotações livres sobre o aluno..." rows={3} />
      </div>
    </div>
  );
};

export default DadosPessoaisForm;
