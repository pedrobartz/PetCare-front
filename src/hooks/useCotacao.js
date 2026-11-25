import { useEffect, useState } from "react";

import { MOEDA_PADRAO } from "../constants/moedas";
import { buscarCotacao } from "../services/cotacaoService";

export default function useCotacao(moeda) {
  const [taxa, setTaxa] = useState(null);

  useEffect(() => {
    let ativo = true;
    setTaxa(null);
    if (moeda === MOEDA_PADRAO) return;

    buscarCotacao(moeda, MOEDA_PADRAO).then((response) => {
      if (ativo && response.success) setTaxa(response.data.conversionRate);
    });
    return () => {
      ativo = false;
    };
  }, [moeda]);

  return taxa;
}
