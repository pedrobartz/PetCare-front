import { NOMES_DIAS_JS } from "../constants/diasSemana";
import { buscarEspecie } from "../constants/especies";
import { MOEDA_PADRAO, simboloMoeda } from "../constants/moedas";

function doisDigitos(numero) {
  return String(numero).padStart(2, "0");
}

export function formatarPreco(valor, moeda = MOEDA_PADRAO) {
  const numero = Number(valor) || 0;
  const [inteiro, decimal] = numero.toFixed(2).split(".");
  const inteiroComPontos = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${simboloMoeda(moeda)} ${inteiroComPontos},${decimal}`;
}

export function textoParaData(texto) {
  if (!texto) return null;
  const [data, hora = "00:00:00"] = texto.split("T");
  const [ano, mes, dia] = data.split("-").map(Number);
  const [horas, minutos] = hora.split(":").map(Number);
  return new Date(ano, mes - 1, dia, horas, minutos);
}

export function formatarData(texto) {
  const data = textoParaData(texto);
  if (!data) return "-";
  return `${doisDigitos(data.getDate())}/${doisDigitos(data.getMonth() + 1)}/${data.getFullYear()}`;
}

export function formatarHora(texto) {
  if (!texto) return "--:--";
  const parteHora = texto.includes("T") ? texto.split("T")[1] : texto;
  return parteHora.slice(0, 5);
}

export function formatarDataHora(texto) {
  if (!texto) return "-";
  return `${formatarData(texto)} às ${formatarHora(texto)}`;
}

export function dataParaApi(data) {
  return `${data.getFullYear()}-${doisDigitos(data.getMonth() + 1)}-${doisDigitos(data.getDate())}`;
}

export function montarDataHora(dataApi, hora) {
  return `${dataApi}T${formatarHora(hora)}:00`;
}

export function descreverDia(data) {
  return {
    diaSemana: NOMES_DIAS_JS[data.getDay()],
    dia: doisDigitos(data.getDate()),
    mes: doisDigitos(data.getMonth() + 1),
  };
}

export function proximosDias(quantidade) {
  const hoje = new Date();
  return Array.from({ length: quantidade }, (_, indice) => {
    const data = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + indice);
    return data;
  });
}

export function calcularIdade(dataNascimento) {
  const nascimento = textoParaData(dataNascimento);
  if (!nascimento) return null;
  const hoje = new Date();
  let anos = hoje.getFullYear() - nascimento.getFullYear();
  const aindaNaoFezAniversario =
    hoje.getMonth() < nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate());
  if (aindaNaoFezAniversario) anos -= 1;
  return anos;
}

export function descreverIdade(dataNascimento) {
  const anos = calcularIdade(dataNascimento);
  if (anos === null) return null;
  if (anos < 1) return "Menos de 1 ano";
  return anos === 1 ? "1 ano" : `${anos} anos`;
}

export function formatarEndereco(endereco) {
  if (!endereco) return "";
  const complemento = endereco.complement ? `, ${endereco.complement}` : "";
  return `${endereco.street}, ${endereco.number}${complemento} - ${endereco.district}, ${endereco.city}/${endereco.state}`;
}

export function textoParaNumero(texto) {
  if (texto === null || texto === undefined || String(texto).trim() === "") return null;
  const numero = Number(String(texto).replace(",", "."));
  return Number.isNaN(numero) ? NaN : numero;
}

export function numeroParaTexto(numero) {
  if (numero === null || numero === undefined) return "";
  return String(numero).replace(".", ",");
}

export function dataBrasileiraParaApi(texto) {
  const partes = String(texto).trim().split("/");
  if (partes.length !== 3) return null;
  const [dia, mes, ano] = partes;
  return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
}

export function dataApiParaBrasileira(texto) {
  if (!texto) return "";
  const [ano, mes, dia] = texto.split("-");
  return `${dia}/${mes}/${ano}`;
}

export function descreverPet(pet) {
  const partes = [buscarEspecie(pet.species).rotulo];
  if (pet.breed) partes.push(pet.breed);
  const idade = descreverIdade(pet.birthDate);
  if (idade) partes.push(idade);
  return partes.join(" - ");
}
