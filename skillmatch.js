// SkillMatch JS: Simulador de Compatibilidade com Vaga Front-End Júnior

// ===== 1. DADOS =====

// RF01: perfil do candidato
const candidato = {
  nome: "Andrey Silva",
  areaInteresse: "Desenvolvedor Front-End Júnior",
  experienciaProfissional: 0,
  habilidades: ["HTML", "CSS", "JavaScript", "Git", "GitHub", "Flexbox"],
};

// ===== 2. CLASSES =====

// RF09: classe base que representa uma vaga
class Vaga {
  constructor(id, empresa, cargo, requisitos) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
  }

  // RF11: this acessa os dados da vaga que está chamando o método
  resumo() {
    return `Vaga ${this.id}: ${this.cargo} na ${this.empresa} (${this.requisitos.length} requisitos)`;
  }

  // RF05: requisitos que o candidato ainda não tem
  habilidadesFaltantes(habilidadesCandidato) {
    return this.requisitos.filter((req) => !habilidadesCandidato.includes(req));
  }

  // RF03: percentual de compatibilidade (0 a 100)
  calcularCompatibilidade(habilidadesCandidato) {
    const atendidos =
      this.requisitos.length - this.habilidadesFaltantes(habilidadesCandidato).length;
    return Math.round((atendidos / this.requisitos.length) * 100);
  }
}

// RF10: vaga remota é uma vaga, mas com informação extra
class VagaRemota extends Vaga {
  constructor(id, empresa, cargo, requisitos, fusoHorario) {
    super(id, empresa, cargo, requisitos);
    this.fusoHorario = fusoHorario;
  }

  // sobrescreve o método da classe pai, reaproveitando o resumo original
  resumo() {
    return `${super.resumo()} [Remota, fuso ${this.fusoHorario}]`;
  }
}

// RF02: lista de vagas (instâncias das classes)
const vagasDisponiveis = [
  new Vaga(1, "NVIDIA", "Desenvolvedor Front-End Júnior", [
    "HTML",
    "CSS",
    "JavaScript",
    "Responsividade",
  ]),
  new VagaRemota(
    2,
    "Meta",
    "Desenvolvedor React Júnior",
    ["HTML", "CSS", "JavaScript", "React", "API REST", "Git"],
    "GMT-3"
  ),
  new Vaga(3, "Tesla", "Front-End Júnior com TypeScript", [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "TypeScript",
    "Testes",
    "Figma",
  ]),
  new Vaga(4, "BrasilTec", "Desenvolvedor Web Júnior", [
    "HTML",
    "CSS",
    "JavaScript",
    "Git",
    "Responsividade",
  ]),
];

// ===== 3. FUNÇÕES DE REGRA =====

// RF04: classificação com if/else
function classificarCompatibilidade(percentual) {
  if (percentual >= 80) {
    return "Alta compatibilidade";
  } else if (percentual >= 50) {
    return "Média compatibilidade";
  } else {
    return "Baixa compatibilidade";
  }
}

// ===== 4. EXECUÇÃO =====

// RF08: map transforma cada vaga em um objeto com a análise completa
function analisarVagas(vagas, habilidades) {
  return vagas.map((vaga) => {
    const percentual = vaga.calcularCompatibilidade(habilidades);
    return {
      vaga,
      percentual,
      classificacao: classificarCompatibilidade(percentual),
      faltantes: vaga.habilidadesFaltantes(habilidades),
    };
  });
}

// RF06: reduce percorre as análises guardando a de maior percentual
function encontrarMelhorVaga(analises) {
  return analises.reduce((melhor, atual) =>
    atual.percentual > melhor.percentual ? atual : melhor
  );
}

console.log("Candidato:", candidato.nome, "-", candidato.areaInteresse);
console.log("Experiência:", candidato.experienciaProfissional, "meses");
console.log("Habilidades:", candidato.habilidades.join(", "));
console.log("");

const analises = analisarVagas(vagasDisponiveis, candidato.habilidades);

for (const analise of analises) {
  console.log(analise.vaga.resumo());
  console.log(`  Compatibilidade: ${analise.percentual}% (${analise.classificacao})`);
  console.log(
    `  Faltam: ${analise.faltantes.length > 0 ? analise.faltantes.join(", ") : "nenhuma"}`
  );
}

const melhor = encontrarMelhorVaga(analises);
console.log(
  `\nMelhor vaga: ${melhor.vaga.cargo} na ${melhor.vaga.empresa} (${melhor.percentual}%)`
);

// find devolve a primeira análise que passa no teste (ou undefined)
const primeiraAlta = analises.find((a) => a.classificacao === "Alta compatibilidade");
if (primeiraAlta) {
  console.log(`Primeira vaga com alta compatibilidade: ${primeiraAlta.vaga.empresa}`);
} else {
  console.log("Nenhuma vaga com alta compatibilidade.");
}