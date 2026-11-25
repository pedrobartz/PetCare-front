import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function useRequisicao(buscarDados, dependencias = [], { recarregarAoFocar = false } = {}) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [status, setStatus] = useState(null);
  const [atualizando, setAtualizando] = useState(false);
  const ultimaRequisicao = useRef(0);

  const carregar = useCallback(async () => {
    const numeroRequisicao = ++ultimaRequisicao.current;
    setCarregando(true);
    setErro("");
    const response = await buscarDados();

    if (numeroRequisicao !== ultimaRequisicao.current) return;

    if (response.success) {
      setDados(response.data);
    } else {
      setErro(response.message);
    }

    setStatus(response.status);
    setCarregando(false);
  }, dependencias);

  async function atualizar() {
    setAtualizando(true);
    await carregar();
    setAtualizando(false);
  }

  useEffect(() => {
    if (!recarregarAoFocar) carregar();
  }, [carregar]);

  useFocusEffect(
    useCallback(() => {
      if (recarregarAoFocar) carregar();
    }, [carregar])
  );

  return { dados, setDados, carregando, atualizando, erro, status, recarregar: carregar, atualizar };
}
