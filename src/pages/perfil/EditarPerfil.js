import Botao from "../../components/comuns/Botao";
import CampoTexto from "../../components/comuns/CampoTexto";
import Tela from "../../components/comuns/Tela";
import { useAuth } from "../../contexts/AuthContext";
import useAcao from "../../hooks/useAcao";
import useFormulario from "../../hooks/useFormulario";
import { atualizarNome } from "../../services/perfilService";
import avisar from "../../utils/avisar";
import { estaVazio } from "../../utils/validadores";

function validarPerfil({ nome }) {
  return { nome: estaVazio(nome) ? "Informe o nome." : "" };
}

export default function EditarPerfil({ navigation }) {
  const { usuario, atualizarUsuario } = useAuth();
  const { valores, erros, alterarCampo, validarFormulario } = useFormulario({ nome: usuario.name }, validarPerfil);
  const { executando, executar } = useAcao();

  async function aoSalvar() {
    if (!validarFormulario()) return;
    const response = await executar(() => atualizarNome(valores.nome.trim()), { tituloErro: "Não foi possível salvar" });
    if (!response.success) return;

    await atualizarUsuario(response.data);
    avisar("Perfil atualizado", "Seu nome foi alterado com sucesso.");
    navigation.goBack();
  }

  return (
    <Tela>
      <CampoTexto label="Nome" icone="account-outline" valor={valores.nome} aoAlterar={alterarCampo("nome")} erro={erros.nome} />
      <CampoTexto label="E-mail" icone="email-outline" valor={usuario.email} disabled />
      <Botao icon="content-save-outline" onPress={aoSalvar} carregando={executando}>
        Salvar
      </Botao>
    </Tela>
  );
}
