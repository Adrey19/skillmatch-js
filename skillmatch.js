// SkillMatch JS: Simulador de Compatibilidade com Vaga Front-End Júnior

// ===== 1. DADOS =====

// RF01: perfil do candidato
const candidato = {
  nome: "Andrey Silva",
  areaInteresse: "Desenvolvedor Front-End Júnior",
  experienciaProfissional: 0,
  habilidades: ["HTML", "CSS", "JavaScript", "Git", "GitHub", "Flexbox"],
};

// ===== 2. FUNÇÕES AUXILIARES =====

// Procura um requisito na lista de habilidades usando for + if
function possuiHabilidade(habilidades, requisito) {
  for (let i = 0; i < habilidades.length; i++) {
    if (habilidades[i] === requisito) {
      return true;
    }
  }
  return false;
}

// Junta os itens de uma lista em um único texto, separados por vírgula
function juntarTexto(lista) {
  let texto = "";
  for (let i = 0; i < lista.length; i++) {
    if (i > 0) {
      texto = texto + ", ";
    }
    texto = texto + lista[i];
  }
  return texto;
}

// ===== 3. CLASSES =====

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
    return this.requisitos.filter(
      (req) => !possuiHabilidade(habilidadesCandidato, req)
    );
  }

  // RF03: percentual de compatibilidade (0 a 100), sem casas decimais
  calcularCompatibilidade(habilidadesCandidato) {
    const total = this.requisitos.length;
    const atendidos = total - this.habilidadesFaltantes(habilidadesCandidato).length;
    const bruto = atendidos * 100;
    // o resto da divisão (%) é a parte que "sobra"; ao tirá-lo, a divisão fica exata
    return (bruto - (bruto % total)) / total;
  }
}

// RF10: vaga remota é uma vaga, mas com informação extra
class VagaRemota extends Vaga {
  constructor(id, empresa, cargo, requisitos, fusoHorario) {
    super(id, empresa, cargo, requisitos);
    this.fusoHorario = fusoHorario;
  }

  // sobrescreve o método da classe pai
  resumo() {
    return `Vaga ${this.id}: ${this.cargo} na ${this.empresa} (${this.requisitos.length} requisitos) [Remota, fuso ${this.fusoHorario}]`;
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

// ===== 4. FUNÇÕES DE REGRA =====

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

// RF12: callback. Recebe uma função (aoPercorrer) e a executa para cada item
function percorrerItens(itens, aoPercorrer) {
  for (let i = 0; i < itens.length; i++) {
    aoPercorrer(itens[i]);
  }
}

// RF13: closure. O contador fica guardado dentro da função e persiste entre chamadas
function criarContador() {
  let total = 0;
  return function () {
    total++;
    return total;
  };
}

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

// ===== 5. EXECUÇÃO =====

console.log("Candidato:", candidato.nome, "-", candidato.areaInteresse);
console.log("Experiência:", candidato.experienciaProfissional, "meses");
console.log("Habilidades:", juntarTexto(candidato.habilidades));
console.log("");

const analises = analisarVagas(vagasDisponiveis, candidato.habilidades);
const proximoNumero = criarContador();

percorrerItens(analises, (analise) => {
  console.log(`#${proximoNumero()} ${analise.vaga.resumo()}`);
  console.log(`  Compatibilidade: ${analise.percentual}% (${analise.classificacao})`);
  console.log(
    `  Faltam: ${analise.faltantes.length > 0 ? juntarTexto(analise.faltantes) : "nenhuma"}`
  );
});

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