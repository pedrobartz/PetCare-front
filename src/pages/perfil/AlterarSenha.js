import Botao from "../../components/comuns/Botao";
import CampoSenha from "../../components/comuns/CampoSenha";
import Tela from "../../components/comuns/Tela";
import useAcao from "../../hooks/useAcao";
import useFormulario from "../../hooks/useFormulario";
import { TAMANHO_MINIMO_SENHA } from "../../constants/regras";
import { alterarSenha } from "../../services/perfilService";
import avisar from "../../utils/avisar";
import { estaVazio } from "../../utils/validadores";

function validarSenhas({ atual, nova, confirmacao }) {
  return {
    atual: estaVazio(atual) ? "Informe a senha atual." : "",
    nova: nova.length < TAMANHO_MINIMO_SENHA ? `A nova senha deve ter ao menos ${TAMANHO_MINIMO_SENHA} caracteres.` : "",
    confirmacao: confirmacao !== nova ? "As senhas não conferem." : "",
  };
}

export default function AlterarSenha({ navigation }) {
  const { valores, erros, alterarCampo, validarFormulario } = useFormulario(
    { atual: "", nova: "", confirmacao: "" },
    validarSenhas
  );
  const { executando, executar } = useAcao();

  async function aoSalvar() {
    if (!validarFormulario()) return;
    const response = await executar(() => alterarSenha(valores.atual, valores.nova), {
      tituloErro: "Não foi possível alterar",
    });
    if (!response.success) return;

    avisar("Senha alterada", "Sua senha foi atualizada com sucesso.");
    navigation.goBack();
  }

  return (
    <Tela>
      <CampoSenha label="Senha atual" valor={valores.atual} aoAlterar={alterarCampo("atual")} erro={erros.atual} />
      <CampoSenha label="Nova senha" valor={valores.nova} aoAlterar={alterarCampo("nova")} erro={erros.nova} />
      <CampoSenha
        label="Confirmar nova senha"
        valor={valores.confirmacao}
        aoAlterar={alterarCampo("confirmacao")}
        erro={erros.confirmacao}
      />
      <Botao icon="lock-check-outline" onPress={aoSalvar} carregando={executando}>
        Alterar senha
      </Botao>
    </Tela>
  );
}
