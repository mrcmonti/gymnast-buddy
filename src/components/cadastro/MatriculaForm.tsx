import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, FileText, AlertTriangle } from "lucide-react";

const MatriculaForm = () => {
  const [possuiComorbidades, setPossuiComorbidades] = useState(false);
  const [atestadoFile, setAtestadoFile] = useState<string | null>(null);

  return (
    <div className="space-y-8 section-fade-in">
      {/* Modalidade + Plano + Turma */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Modalidade <span className="text-destructive">*</span>
          </Label>
          <Select>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ginastica-artistica">Ginástica Artística</SelectItem>
              <SelectItem value="ginastica-ritmica">Ginástica Rítmica</SelectItem>
              <SelectItem value="trampolim">Trampolim</SelectItem>
              <SelectItem value="acrobatica">Ginástica Acrobática</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Plano <span className="text-destructive">*</span>
          </Label>
          <Select>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mensal">Mensal</SelectItem>
              <SelectItem value="trimestral">Trimestral</SelectItem>
              <SelectItem value="semestral">Semestral</SelectItem>
              <SelectItem value="anual">Anual</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Turma <span className="text-destructive">*</span>
          </Label>
          <Select>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="turma-a">Turma A — Seg/Qua 14h</SelectItem>
              <SelectItem value="turma-b">Turma B — Ter/Qui 16h</SelectItem>
              <SelectItem value="turma-c">Turma C — Seg/Qua/Sex 18h</SelectItem>
              <SelectItem value="turma-d">Turma D — Sáb 09h</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tipo de matrícula + Datas */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Tipo de matrícula <span className="text-destructive">*</span>
          </Label>
          <Select defaultValue="regular">
            <SelectTrigger className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="regular">Regular</SelectItem>
              <SelectItem value="experimental">Aula Experimental</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="dt-inicio" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Data de início <span className="text-destructive">*</span>
          </Label>
          <Input id="dt-inicio" type="date" className="h-11" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="dt-fim" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Data de encerramento
          </Label>
          <Input id="dt-fim" type="date" className="h-11" />
        </div>
      </div>

      {/* Comorbidades */}
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <div>
              <p className="text-sm font-semibold">Possui comorbidades?</p>
              <p className="text-xs text-muted-foreground">
                Caso o aluno possua condições de saúde relevantes, marque e anexe o atestado médico.
              </p>
            </div>
          </div>
          <Switch checked={possuiComorbidades} onCheckedChange={setPossuiComorbidades} />
        </div>

        {possuiComorbidades && (
          <div className="mt-4 space-y-3 border-t pt-4">
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Atestado de comorbidades <span className="text-destructive">*</span>
            </Label>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-input px-4 py-3 transition-colors hover:border-primary/40 hover:bg-accent/50">
              <Upload className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {atestadoFile || "Clique para anexar PDF ou imagem"}
              </span>
              <input
                type="file"
                accept=".pdf,image/*"
                className="hidden"
                onChange={(e) => setAtestadoFile(e.target.files?.[0]?.name || null)}
              />
            </label>
          </div>
        )}
      </div>

      {/* Desconto */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Tipo de desconto
          </Label>
          <Select>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Nenhum" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nenhum">Nenhum</SelectItem>
              <SelectItem value="familia">Família (irmãos)</SelectItem>
              <SelectItem value="modalidade">Múltiplas modalidades</SelectItem>
              <SelectItem value="pontualidade">Pontualidade</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="desconto" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Percentual de desconto (%)
          </Label>
          <Input id="desconto" type="number" min={0} max={100} placeholder="0" className="h-11" />
        </div>
      </div>

      {/* Info card */}
      <div className="flex items-start gap-3 rounded-lg bg-info/10 px-4 py-3">
        <FileText className="mt-0.5 h-4 w-4 text-info" />
        <p className="text-xs text-info">
          O contrato será gerado automaticamente após a confirmação do cadastro.
        </p>
      </div>
    </div>
  );
};

export default MatriculaForm;
