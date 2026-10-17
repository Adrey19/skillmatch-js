// SkillMatch JS: Simulador de Compatibilidade com Vaga Front-End Júnior

// RF01: perfil do candidato
const candidato = {
  nome: "Andrey Silva",
  areaInteresse: "Desenvolvedor Front-End Júnior",
  experienciaProfissional: 0,
  habilidades: ["HTML", "CSS", "JavaScript", "Git", "GitHub", "Flexbox"],
};

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

// RF02: lista de vagas (agora são instâncias das classes)
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

// Teste rápido
console.log("Candidato:", candidato.nome, "-", candidato.areaInteresse);
console.log("Experiência:", candidato.experienciaProfissional, "meses");
console.log("Habilidades:", candidato.habilidades.join(", "));

for (const vaga of vagasDisponiveis) {
  console.log(vaga.resumo());
}