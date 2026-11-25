import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function useListaPaginada(buscarPagina, dependencias = [], { recarregarAoFocar = false } = {}) {
  const [itens, setItens] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [ultimaPagina, setUltimaPagina] = useState(true);
  const [carregando, setCarregando] = useState(true);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState("");
  const ultimaRequisicao = useRef(0);

  const carregarPagina = useCallback(async (numeroPagina) => {
    const numeroRequisicao = ++ultimaRequisicao.current;
    setErro("");
    const response = await buscarPagina(numeroPagina);

    if (numeroRequisicao !== ultimaRequisicao.current) return;

    if (!response.success) {
      setErro(response.message);
      return;
    }

    const { content, last } = response.data;
    setItens((anteriores) => (numeroPagina === 0 ? content : [...anteriores, ...content]));
    setPagina(numeroPagina);
    setUltimaPagina(last);
  }, dependencias);

  const recarregar = useCallback(async () => {
    setCarregando(true);
    await carregarPagina(0);
    setCarregando(false);
  }, [carregarPagina]);

  async function atualizar() {
    setAtualizando(true);
    await carregarPagina(0);
    setAtualizando(false);
  }

  async function carregarMais() {
    if (ultimaPagina || carregandoMais || carregando) return;
    setCarregandoMais(true);
    await carregarPagina(pagina + 1);
    setCarregandoMais(false);
  }

  useEffect(() => {
    if (!recarregarAoFocar) recarregar();
  }, [recarregar]);

  useFocusEffect(
    useCallback(() => {
      if (recarregarAoFocar) recarregar();
    }, [recarregar])
  );

  return { itens, carregando, carregandoMais, atualizando, erro, ultimaPagina, recarregar, atualizar, carregarMais };
}
