import { TAMANHO_PAGINA } from "../config/api";

export default function parametrosPagina(pagina = 0, tamanho = TAMANHO_PAGINA) {
  return { page: pagina, size: tamanho };
}
