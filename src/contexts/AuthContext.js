import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { definirAoExpirarSessao, definirToken } from "../services/api";
import * as authService from "../services/authService";
import { buscarUsuarioLogado } from "../services/perfilService";
import { sessaoStorage } from "../storage/armazenamento";
import { TIPO_CLIENTE, TIPO_PRESTADOR } from "../constants/tiposUsuario";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [carregandoSessao, setCarregandoSessao] = useState(true);

  const sair = useCallback(async () => {
    definirToken(null);
    setToken(null);
    setUsuario(null);
    await sessaoStorage.limpar();
  }, []);

  useEffect(() => {
    definirAoExpirarSessao(sair);
    restaurarSessao();
  }, [sair]);

  async function restaurarSessao() {
    const sessao = await sessaoStorage.carregar();

    if (sessao && sessao.token) {
      definirToken(sessao.token);
      const response = await buscarUsuarioLogado();

      if (response.success) {
        setToken(sessao.token);
        setUsuario(response.data);
      } else if (response.status === 401) {
        await sair();
      } else {
        setToken(sessao.token);
        setUsuario(sessao.usuario);
      }
    }

    setCarregandoSessao(false);
  }

  async function entrar(email, senha) {
    const response = await authService.entrar(email, senha);
    if (!response.success) return response;

    const { user, token: novoToken } = response.data;
    definirToken(novoToken);
    setToken(novoToken);
    setUsuario(user);
    await sessaoStorage.salvar({ token: novoToken, usuario: user });
    return response;
  }

  async function cadastrar(dados, tipo) {
    const cadastrarPorTipo =
      tipo === TIPO_PRESTADOR ? authService.cadastrarPrestador : authService.cadastrarCliente;
    const response = await cadastrarPorTipo(dados);
    if (!response.success) return response;
    return entrar(dados.email, dados.password);
  }

  async function atualizarUsuario(dadosAtualizados) {
    const novoUsuario = { ...usuario, ...dadosAtualizados };
    setUsuario(novoUsuario);
    await sessaoStorage.salvar({ token, usuario: novoUsuario });
  }

  const valor = useMemo(
    () => ({
      usuario,
      carregandoSessao,
      ehCliente: usuario?.type === TIPO_CLIENTE,
      ehPrestador: usuario?.type === TIPO_PRESTADOR,
      entrar,
      cadastrar,
      sair,
      atualizarUsuario,
    }),
    [usuario, token, carregandoSessao]
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
