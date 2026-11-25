const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_DATA = /^\d{4}-\d{2}-\d{2}$/;
const REGEX_HORA = /^([01]\d|2[0-3]):[0-5]\d$/;
const REGEX_CEP = /^\d{5}-?\d{3}$/;

export function estaVazio(valor) {
  return valor === null || valor === undefined || String(valor).trim() === "";
}

export function emailValido(email) {
  return REGEX_EMAIL.test(String(email).trim());
}

export function dataValida(texto) {
  if (!REGEX_DATA.test(texto)) return false;
  const [ano, mes, dia] = texto.split("-").map(Number);
  const data = new Date(ano, mes - 1, dia);
  return data.getFullYear() === ano && data.getMonth() === mes - 1 && data.getDate() === dia;
}

export function dataNoFuturo(texto) {
  const [ano, mes, dia] = texto.split("-").map(Number);
  return new Date(ano, mes - 1, dia) > new Date();
}

export function horaValida(texto) {
  return REGEX_HORA.test(texto);
}

export function cepValido(texto) {
  return REGEX_CEP.test(String(texto).trim());
}

export function numeroPositivo(numero) {
  return typeof numero === "number" && !Number.isNaN(numero) && numero > 0;
}

export function inteiroNaoNegativo(numero) {
  return Number.isInteger(numero) && numero >= 0;
}

export function possuiErros(erros) {
  return Object.values(erros).some(Boolean);
}
