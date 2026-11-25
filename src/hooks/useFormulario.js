import { useState } from "react";

import { possuiErros } from "../utils/validadores";

export default function useFormulario(valoresIniciais, validar) {
  const [valores, setValores] = useState(valoresIniciais);
  const [erros, setErros] = useState({});

  function alterarCampo(campo) {
    return (valor) => {
      setValores((anteriores) => ({ ...anteriores, [campo]: valor }));
      setErros((anteriores) => ({ ...anteriores, [campo]: "" }));
    };
  }

  function validarFormulario() {
    const novosErros = validar(valores);
    setErros(novosErros);
    return !possuiErros(novosErros);
  }

  return { valores, setValores, erros, alterarCampo, validarFormulario };
}
