import { useEffect, useState } from "react";

import { listarHorariosLivres } from "../services/petShopService";

export default function useHorariosLivres(petShopId, servicoId, data) {
  const [horarios, setHorarios] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    setErro("");
    listarHorariosLivres(petShopId, servicoId, data).then((response) => {
      if (!ativo) return;
      setHorarios(response.success ? response.data : []);
      setErro(response.success ? "" : response.message);
      setCarregando(false);
    });
    return () => {
      ativo = false;
    };
  }, [petShopId, servicoId, data]);

  return { horarios, carregando, erro };
}
