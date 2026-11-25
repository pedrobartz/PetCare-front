import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { MOEDA_PADRAO } from "../constants/moedas";
import { moedaStorage } from "../storage/armazenamento";

const MoedaContext = createContext(null);

export function MoedaProvider({ children }) {
  const [moeda, setMoeda] = useState(MOEDA_PADRAO);

  useEffect(() => {
    moedaStorage.carregar().then((moedaSalva) => {
      if (moedaSalva) setMoeda(moedaSalva);
    });
  }, []);

  function alterarMoeda(novaMoeda) {
    setMoeda(novaMoeda);
    moedaStorage.salvar(novaMoeda);
  }

  const valor = useMemo(() => ({ moeda, alterarMoeda }), [moeda]);

  return <MoedaContext.Provider value={valor}>{children}</MoedaContext.Provider>;
}

export function useMoeda() {
  return useContext(MoedaContext);
}
