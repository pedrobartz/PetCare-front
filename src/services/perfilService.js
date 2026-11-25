import api from "./api";
import executarRequisicao from "./executarRequisicao";

export function buscarUsuarioLogado() {
  return executarRequisicao(() => api.get("/ws/auth/me"));
}

export function atualizarNome(nome) {
  return executarRequisicao(() => api.put("/ws/auth/me", { name: nome }));
}

export function alterarSenha(senhaAtual, novaSenha) {
  return executarRequisicao(() =>
    api.put("/ws/auth/me/password", { currentPassword: senhaAtual, newPassword: novaSenha })
  );
}
