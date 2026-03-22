import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  User,
  Users,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  Save,
} from "lucide-react";
import DadosPessoaisForm from "@/components/cadastro/DadosPessoaisForm";
import ResponsaveisForm from "@/components/cadastro/ResponsaveisForm";
import MatriculaForm from "@/components/cadastro/MatriculaForm";

const TABS = ["pessoais", "responsaveis", "matricula"] as const;
type TabKey = (typeof TABS)[number];

const tabConfig: Record<TabKey, { label: string; icon: React.ReactNode; description: string }> = {
  pessoais: {
    label: "Dados Pessoais",
    icon: <User className="h-4 w-4" />,
    description: "Informações de identificação do aluno",
  },
  responsaveis: {
    label: "Responsáveis",
    icon: <Users className="h-4 w-4" />,
    description: "Responsáveis legais e financeiros",
  },
  matricula: {
    label: "Matrícula",
    icon: <GraduationCap className="h-4 w-4" />,
    description: "Modalidade, plano e condições",
  },
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("pessoais");
  const [dataNascimento, setDataNascimento] = useState("");

  const currentIndex = TABS.indexOf(activeTab);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === TABS.length - 1;

  const goNext = () => {
    if (!isLast) setActiveTab(TABS[currentIndex + 1]);
  };
  const goPrev = () => {
    if (!isFirst) setActiveTab(TABS[currentIndex - 1]);
  };

  const handleSave = () => {
    toast.success("Cadastro salvo com sucesso!", {
      description: "Os dados do aluno foram registrados.",
    });
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Cadastro de Aluno</h1>
              <p className="text-xs text-muted-foreground">Academia de Ginástica Artística</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Data de cadastro</p>
            <p className="text-sm font-medium tabular-nums">
              {new Date().toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>
      </header>

      {/* Minor alert */}
      {isMenor && (
        <div className="mx-auto max-w-4xl px-6">
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-warning/10 px-4 py-2.5 text-sm text-warning">
            <Users className="h-4 w-4 flex-shrink-0" />
            <span>
              Aluno menor de 18 anos — o cadastro de ao menos um responsável é obrigatório.
            </span>
          </div>
        </div>
      )}

      {/* Main */}
      <main className="mx-auto max-w-4xl px-6 py-8">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabKey)}>
          <TabsList className="mb-8 grid w-full grid-cols-3 gap-1 bg-muted/60 p-1.5 h-auto rounded-xl">
            {TABS.map((tab, i) => {
              const config = tabConfig[tab];
              const isActive = activeTab === tab;
              const isDone = TABS.indexOf(activeTab) > i;
              return (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-all
                    ${isActive ? "bg-card shadow-md font-semibold" : ""}
                    ${isDone ? "text-primary" : ""}
                  `}
                >
                  <span className={`flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold transition-colors
                    ${isActive ? "bg-primary text-primary-foreground" : isDone ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}
                  `}>
                    {i + 1}
                  </span>
                  <span className="hidden sm:inline">{config.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Section header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-foreground">
              {tabConfig[activeTab].icon}
              <h2 className="text-xl font-bold">{tabConfig[activeTab].label}</h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{tabConfig[activeTab].description}</p>
          </div>

          <TabsContent value="pessoais">
            <DadosPessoaisForm dataNascimento={dataNascimento} onDataNascimentoChange={setDataNascimento} />
          </TabsContent>
          <TabsContent value="responsaveis">
            <ResponsaveisForm />
          </TabsContent>
          <TabsContent value="matricula">
            <MatriculaForm />
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between border-t pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={goPrev}
            disabled={isFirst}
            className="gap-1.5 transition-transform active:scale-[0.97]"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>

          <div className="flex items-center gap-2">
            {TABS.map((tab, i) => (
              <div
                key={tab}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  i <= currentIndex ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          {isLast ? (
            <Button
              type="button"
              onClick={handleSave}
              className="gap-1.5 transition-transform active:scale-[0.97]"
            >
              <Save className="h-4 w-4" />
              Salvar Cadastro
            </Button>
          ) : (
            <Button
              type="button"
              onClick={goNext}
              className="gap-1.5 transition-transform active:scale-[0.97]"
            >
              Próximo
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
