import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, UserPlus, ShieldCheck } from "lucide-react";

interface Responsavel {
  id: number;
}

const ResponsaveisForm = () => {
  const [responsaveis, setResponsaveis] = useState<Responsavel[]>([{ id: 1 }]);

  const addResponsavel = () => {
    setResponsaveis((prev) => [...prev, { id: Date.now() }]);
  };

  const removeResponsavel = (id: number) => {
    if (responsaveis.length === 1) return;
    setResponsaveis((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6 section-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Ao menos um responsável é obrigatório para alunos menores de 18 anos.
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addResponsavel} className="gap-1.5">
          <Plus className="h-4 w-4" />
          Adicionar
        </Button>
      </div>

      {responsaveis.map((resp, index) => (
        <div
          key={resp.id}
          className="relative rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                {index + 1}
              </div>
              <span className="text-sm font-semibold text-foreground">Responsável {index + 1}</span>
            </div>
            {responsaveis.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeResponsavel(resp.id)}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Nome completo <span className="text-destructive">*</span>
                </Label>
                <Input placeholder="Nome do responsável" className="h-11" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  CPF <span className="text-destructive">*</span>
                </Label>
                <Input placeholder="000.000.000-00" className="h-11" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Parentesco <span className="text-destructive">*</span>
                </Label>
                <Select>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pai">Pai</SelectItem>
                    <SelectItem value="mae">Mãe</SelectItem>
                    <SelectItem value="avo">Avô / Avó</SelectItem>
                    <SelectItem value="tio">Tio / Tia</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Telefone <span className="text-destructive">*</span>
                </Label>
                <Input placeholder="(00) 00000-0000" className="h-11" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  E-mail <span className="text-destructive">*</span>
                </Label>
                <Input type="email" placeholder="email@exemplo.com" className="h-11" />
              </div>
            </div>

            {/* Toggles */}
            <div className="flex flex-wrap items-center gap-6 rounded-lg bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <Switch id={`financeiro-${resp.id}`} />
                <Label htmlFor={`financeiro-${resp.id}`} className="flex cursor-pointer items-center gap-1.5 text-sm">
                  <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                  Responsável financeiro
                </Label>
              </div>
              <div className="flex items-center gap-2.5">
                <Switch id={`retirada-${resp.id}`} />
                <Label htmlFor={`retirada-${resp.id}`} className="flex cursor-pointer items-center gap-1.5 text-sm">
                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                  Autorizado a retirar o aluno
                </Label>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResponsaveisForm;
