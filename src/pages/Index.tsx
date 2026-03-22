import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  User,
  Users,
  GraduationCap,
  Save,
} from "lucide-react";
import DadosPessoaisForm from "@/components/cadastro/DadosPessoaisForm";
import ResponsaveisForm from "@/components/cadastro/ResponsaveisForm";
import MatriculaForm from "@/components/cadastro/MatriculaForm";

type SectionKey = "pessoais" | "responsaveis" | "matricula";

interface SectionConfig {
  key: SectionKey;
  label: string;
  icon: React.ReactNode;
  description: string;
  conditionallyVisible?: boolean;
}

const Index = () => {
  const [dataNascimento, setDataNascimento] = useState("");
  const [activeSection, setActiveSection] = useState<SectionKey>("pessoais");

  const sectionRefs = useRef<Record<SectionKey, HTMLDivElement | null>>({
    pessoais: null,
    responsaveis: null,
    matricula: null,
  });

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

  const sections: SectionConfig[] = [
    {
      key: "pessoais",
      label: "Dados Pessoais",
      icon: <User className="h-4 w-4" />,
      description: "Informações de identificação do aluno",
    },
    {
      key: "responsaveis",
      label: "Responsáveis",
      icon: <Users className="h-4 w-4" />,
      description: "Responsáveis legais e financeiros",
      conditionallyVisible: true,
    },
    {
      key: "matricula",
      label: "Matrícula",
      icon: <GraduationCap className="h-4 w-4" />,
      description: "Modalidade, plano e condições",
    },
  ];

  const visibleSections = sections.filter(
    (s) => !s.conditionallyVisible || isMenor
  );

  // Track scroll position to highlight active sidebar item
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 160;
      let current: SectionKey = visibleSections[0].key;

      for (const section of visibleSections) {
        const el = sectionRefs.current[section.key];
        if (el && el.offsetTop <= scrollY) {
          current = section.key;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenor]);

  const scrollToSection = (key: SectionKey) => {
    const el = sectionRefs.current[key];
    if (el) {
      const top = el.offsetTop - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleSave = () => {
    toast.success("Cadastro salvo com sucesso!", {
      description: "Os dados do aluno foram registrados.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-card/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight">Cadastro de Aluno</h1>
              <p className="text-xs text-muted-foreground">Academia de Ginástica Artística</p>
            </div>
          </div>
          <Button
            type="button"
            onClick={handleSave}
            className="gap-1.5 transition-transform active:scale-[0.97]"
          >
            <Save className="h-4 w-4" />
            Salvar Cadastro
          </Button>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-0">
        {/* Left sidebar nav */}
        <aside className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-64 flex-shrink-0 border-r bg-card/50 p-4 md:block">
          <nav className="space-y-1 pt-4">
            {visibleSections.map((section, i) => {
              const isActive = activeSection === section.key;
              return (
                <button
                  key={section.key}
                  onClick={() => scrollToSection(section.key)}
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all active:scale-[0.98]
                    ${isActive
                      ? "bg-primary/10 font-semibold text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                >
                  <span
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-xs font-bold transition-colors
                      ${isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:bg-muted-foreground/20"
                      }`}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate">{section.label}</div>
                    <div className={`truncate text-[11px] transition-colors ${isActive ? "text-primary/70" : "text-muted-foreground/60"}`}>
                      {section.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Progress indicator */}
          <div className="mt-6 px-3">
            <div className="flex items-center gap-1.5">
              {visibleSections.map((section) => (
                <div
                  key={section.key}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    visibleSections.indexOf(section) <= visibleSections.findIndex((s) => s.key === activeSection)
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Etapa {visibleSections.findIndex((s) => s.key === activeSection) + 1} de {visibleSections.length}
            </p>
          </div>

          {/* Minor alert in sidebar */}
          {isMenor && (
            <div className="mt-6 flex items-start gap-2 rounded-lg bg-warning/10 px-3 py-2.5 text-xs text-warning">
              <Users className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
              <span>Aluno menor de 18 anos — responsável obrigatório.</span>
            </div>
          )}
        </aside>

        {/* Main scrollable content */}
        <main className="flex-1 px-6 py-8 md:px-10">
          {/* Mobile nav pills */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2 md:hidden">
            {visibleSections.map((section, i) => {
              const isActive = activeSection === section.key;
              return (
                <button
                  key={section.key}
                  onClick={() => scrollToSection(section.key)}
                  className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors
                    ${isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  {section.icon}
                  {section.label}
                </button>
              );
            })}
          </div>

          {/* Section: Dados Pessoais */}
          <section
            ref={(el: HTMLDivElement | null) => { sectionRefs.current.pessoais = el; }}
            className="scroll-mt-28"
          >
            <div className="mb-5 flex items-center gap-2 text-foreground">
              <User className="h-5 w-5" />
              <h2 className="text-xl font-bold">Dados Pessoais</h2>
            </div>
            <DadosPessoaisForm
              dataNascimento={dataNascimento}
              onDataNascimentoChange={setDataNascimento}
            />
          </section>

          {/* Section: Responsáveis — conditional */}
          {isMenor && (
            <section
              ref={(el: HTMLDivElement | null) => { sectionRefs.current.responsaveis = el; }}
              className="mt-16 scroll-mt-28 section-fade-in"
            >
              <div className="mb-5 flex items-center gap-2 text-foreground">
                <Users className="h-5 w-5" />
                <h2 className="text-xl font-bold">Responsáveis</h2>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                Responsáveis legais e financeiros do aluno menor de 18 anos.
              </p>
              <ResponsaveisForm />
            </section>
          )}

          {/* Section: Matrícula */}
          <section
            ref={(el: HTMLDivElement | null) => { sectionRefs.current.matricula = el; }}
            className="mt-16 scroll-mt-28"
          >
            <div className="mb-5 flex items-center gap-2 text-foreground">
              <GraduationCap className="h-5 w-5" />
              <h2 className="text-xl font-bold">Matrícula</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Modalidade, plano e condições da matrícula.
            </p>
            <MatriculaForm />
          </section>

          {/* Bottom save */}
          <div className="mt-16 flex justify-end border-t pt-6">
            <Button
              type="button"
              onClick={handleSave}
              size="lg"
              className="gap-1.5 transition-transform active:scale-[0.97]"
            >
              <Save className="h-4 w-4" />
              Salvar Cadastro
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
