//SkillMatch JS: Simulador de compatibilidade com Vaga Front-End Júnior.

//RF01: perfil do candidato
const candidato = {
  nome: "Andrey Silva",
  areaInteresse: "Desenvolvedor Front-End Júnior",
  experienciaProfissional: 0,
  habilidades: ["HTML", "CSS", "JavaScript", "Git", "GitHub", "Flexbox"],
};

//RF02: lista de vagas
const vagasDisponiveis = [
  {
    id: 1,
    empresa: "NVIDIA",
    cargo: "Desenvolvedor Front-End Júnior",
    requisitos: ["HTML", "CSS", "JavaScript", "Responsividade"],
  },
  {
    id: 2,
    empresa: "Meta",
    cargo: "Desenvolvedor React Júnior",
    requisitos: ["HTML", "CSS", "JavaScript", "React", "API REST", "Git"],
  },
  {
    id: 3,
    empresa: "Tesla",
    cargo: "Desenvolvedor Front-End Júnior",
    requisitos: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "TypeScript",
      "Testes",
      "Figma",
    ],
  },
  {
    id: 4,
    empresa: "BrasilTec",
    cargo: "Desenvoldedor Front-End Júnior",
    requisitos: ["HTML", "CSS", "JavaScript", "Git", "Responsividade"],
  },
];

// Teste rápido: exibe os dados no console
console.log("Candidato:", candidato.nome, "-", candidato.areaInteresse);
console.log("Experiência:", candidato.experienciaProfissional, "meses");
console.log("Habilidades:", candidato.habilidades.join(", "));

for (const vaga of vagasDisponiveis) {
  console.log(`Vaga ${vaga.id}: ${vaga.cargo} na ${vaga.empresa}`);
}
