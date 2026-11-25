export const ESPECIES = [
  { valor: "CACHORRO", rotulo: "Cachorro", icone: "dog" },
  { valor: "GATO", rotulo: "Gato", icone: "cat" },
  { valor: "PASSARO", rotulo: "Pássaro", icone: "bird" },
  { valor: "ROEDOR", rotulo: "Roedor", icone: "rodent" },
  { valor: "PEIXE", rotulo: "Peixe", icone: "fish" },
  { valor: "REPTIL", rotulo: "Réptil", icone: "turtle" },
  { valor: "OUTRO", rotulo: "Outro", icone: "paw" },
];

export function buscarEspecie(valor) {
  return ESPECIES.find((especie) => especie.valor === valor) || ESPECIES[ESPECIES.length - 1];
}
