import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Search,
  Plus,
  Phone,
  Mail,
  Calendar,
  Users,
  Filter,
  User,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Aluno {
  id: string;
  nome: string;
  dataNascimento: string;
  cpf: string;
  telefone: string;
  email: string;
  status: "Ativo" | "Inativo" | "Trancado";
  modalidade: string;
  turma: string;
  plano: string;
  foto?: string;
  idade: number;
  responsavel?: string;
}

const alunosMock: Aluno[] = [
  {
    id: "1",
    nome: "Beatriz Oliveira Santos",
    dataNascimento: "2016-03-14",
    cpf: "123.456.789-00",
    telefone: "(11) 98765-4321",
    email: "",
    status: "Ativo",
    modalidade: "Ginástica Artística",
    turma: "Turma A — Seg/Qua 14h",
    plano: "Mensal",
    idade: 10,
    responsavel: "Ana Paula Santos",
  },
  {
    id: "2",
    nome: "Lucas Gabriel Ferreira",
    dataNascimento: "2014-07-22",
    cpf: "987.654.321-00",
    telefone: "(11) 91234-5678",
    email: "",
    status: "Ativo",
    modalidade: "Ginástica Artística",
    turma: "Turma B — Ter/Qui 15h",
    plano: "Trimestral",
    idade: 12,
    responsavel: "Carlos Ferreira",
  },
  {
    id: "3",
    nome: "Sofia Helena Costa",
    dataNascimento: "2018-11-05",
    cpf: "456.789.123-00",
    telefone: "(21) 99876-5432",
    email: "",
    status: "Ativo",
    modalidade: "Ginástica Rítmica",
    turma: "Turma C — Seg/Qua 16h",
    plano: "Semestral",
    idade: 7,
    responsavel: "Mariana Costa",
  },
  {
    id: "4",
    nome: "Valentina Rodrigues Lima",
    dataNascimento: "2005-01-30",
    cpf: "321.654.987-00",
    telefone: "(11) 97654-3210",
    email: "valentina@email.com",
    status: "Ativo",
    modalidade: "Ginástica Artística",
    turma: "Turma D — Seg/Qua/Sex 18h",
    plano: "Anual",
    idade: 21,
  },
  {
    id: "5",
    nome: "Isabella Martins Alves",
    dataNascimento: "2015-09-12",
    cpf: "654.321.987-00",
    telefone: "(31) 98765-1234",
    email: "",
    status: "Inativo",
    modalidade: "Ginástica Artística",
    turma: "Turma A — Seg/Qua 14h",
    plano: "Mensal",
    idade: 11,
    responsavel: "Fernanda Martins",
  },
  {
    id: "6",
    nome: "Arthur Henrique Souza",
    dataNascimento: "2003-04-18",
    cpf: "789.123.456-00",
    telefone: "(11) 96543-2109",
    email: "arthur.souza@email.com",
    status: "Trancado",
    modalidade: "Ginástica Artística",
    turma: "Turma D — Seg/Qua/Sex 18h",
    plano: "Semestral",
    idade: 23,
  },
  {
    id: "7",
    nome: "Helena Barbosa Nunes",
    dataNascimento: "2017-06-08",
    cpf: "147.258.369-00",
    telefone: "(21) 91357-2468",
    email: "",
    status: "Ativo",
    modalidade: "Ginástica Rítmica",
    turma: "Turma C — Seg/Qua 16h",
    plano: "Mensal",
    idade: 9,
    responsavel: "Patrícia Barbosa",
  },
  {
    id: "8",
    nome: "Miguel Pereira Azevedo",
    dataNascimento: "2019-12-25",
    cpf: "258.369.147-00",
    telefone: "(11) 92468-1357",
    email: "",
    status: "Ativo",
    modalidade: "Ginástica Artística",
    turma: "Turma E — Sáb 9h",
    plano: "Mensal",
    idade: 6,
    responsavel: "Roberto Pereira",
  },
];

const getInitials = (nome: string) => {
  const parts = nome.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return parts[0][0].toUpperCase();
};

const statusConfig: Record<string, { class: string; label: string }> = {
  Ativo: { class: "bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]", label: "Ativo" },
  Inativo: { class: "bg-muted text-muted-foreground", label: "Inativo" },
  Trancado: { class: "bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))]", label: "Trancado" },
};

const Alunos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [modalidadeFilter, setModalidadeFilter] = useState<string>("todas");

  const filtered = alunosMock.filter((a) => {
    const matchSearch =
      a.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.cpf.includes(searchTerm) ||
      a.turma.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "todos" || a.status === statusFilter;
    const matchModalidade =
      modalidadeFilter === "todas" || a.modalidade === modalidadeFilter;
    return matchSearch && matchStatus && matchModalidade;
  });

  const modalidades = [...new Set(alunosMock.map((a) => a.modalidade))];

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
              <h1 className="text-base font-bold leading-tight">Alunos</h1>
              <p className="text-xs text-muted-foreground">
                Academia de Ginástica Artística
              </p>
            </div>
          </div>
          <Link to="/">
            <Button className="gap-1.5 transition-transform active:scale-[0.97]">
              <Plus className="h-4 w-4" />
              Novo Aluno
            </Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Search & Filters */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, CPF ou turma..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <Filter className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
                <SelectItem value="Trancado">Trancado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={modalidadeFilter} onValueChange={setModalidadeFilter}>
              <SelectTrigger className="w-[180px]">
                <GraduationCap className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue placeholder="Modalidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                {modalidades.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <p className="mb-4 text-sm text-muted-foreground">
          {filtered.length} aluno{filtered.length !== 1 ? "s" : ""} encontrado
          {filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Cards grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
            <User className="mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="text-sm font-medium text-muted-foreground">
              Nenhum aluno encontrado
            </p>
            <p className="mt-1 text-xs text-muted-foreground/60">
              Tente ajustar os filtros ou o termo de busca.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((aluno, i) => {
              const st = statusConfig[aluno.status];
              return (
                <article
                  key={aluno.id}
                  className="group relative flex flex-col rounded-xl border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md"
                  style={{
                    animationDelay: `${i * 60}ms`,
                  }}
                >
                  {/* Top section */}
                  <div className="flex items-start gap-3.5 p-5 pb-3">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {getInitials(aluno.nome)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="truncate text-sm font-semibold leading-tight text-foreground">
                          {aluno.nome}
                        </h3>
                        <Badge
                          className={`flex-shrink-0 border-0 text-[10px] ${st.class}`}
                        >
                          {st.label}
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {aluno.idade} anos · CPF {aluno.cpf}
                      </p>
                    </div>
                  </div>

                  {/* Info section */}
                  <div className="space-y-2 border-t px-5 py-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="truncate">
                        {aluno.modalidade} · {aluno.plano}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="truncate">{aluno.turma}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                      <span>{aluno.telefone}</span>
                    </div>
                    {aluno.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">{aluno.email}</span>
                      </div>
                    )}
                    {aluno.responsavel && (
                      <div className="flex items-center gap-2">
                        <Users className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">
                          Resp: {aluno.responsavel}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="mt-auto border-t px-5 py-3">
                    <Link to="/">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-full text-xs text-muted-foreground hover:text-foreground"
                      >
                        Ver detalhes
                      </Button>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Alunos;
