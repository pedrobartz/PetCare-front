import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import Botao from "../../components/comuns/Botao";
import CampoTexto from "../../components/comuns/CampoTexto";
import Carregando from "../../components/comuns/Carregando";
import MensagemErro from "../../components/comuns/MensagemErro";
import Tela from "../../components/comuns/Tela";
import useAcao from "../../hooks/useAcao";
import useFormulario from "../../hooks/useFormulario";
import useRequisicao from "../../hooks/useRequisicao";
import { buscarMeuPetShop, salvarMeuPetShop, STATUS_SEM_PET_SHOP } from "../../services/prestador/meuPetShopService";
import cores from "../../theme/cores";
import avisar from "../../utils/avisar";
import { estaVazio } from "../../utils/validadores";

function validarPetShop({ nome, endereco, telefone }) {
  return {
    nome: estaVazio(nome) ? "Informe o nome do pet shop." : "",
    endereco: estaVazio(endereco) ? "Informe o endereço." : "",
    telefone: estaVazio(telefone) ? "Informe o telefone." : "",
  };
}

export default function DadosPetShop({ navigation }) {
  const requisicao = useRequisicao(buscarMeuPetShop);
  const { valores, setValores, erros, alterarCampo, validarFormulario } = useFormulario(
    { nome: "", endereco: "", telefone: "" },
    validarPetShop
  );
  const { executando, executar } = useAcao();
  const jaCadastrado = Boolean(requisicao.dados);

  useEffect(() => {
    const petShop = requisicao.dados;
    if (petShop) setValores({ nome: petShop.name, endereco: petShop.address, telefone: petShop.phone });
  }, [requisicao.dados]);

  async function aoSalvar() {
    if (!validarFormulario()) return;
    const dados = { name: valores.nome.trim(), address: valores.endereco.trim(), phone: valores.telefone.trim() };
    const response = await executar(() => salvarMeuPetShop(dados), { tituloErro: "Não foi possível salvar" });
    if (!response.success) return;

    avisar("Pet shop salvo", "Os dados do seu pet shop foram atualizados.");
    navigation.goBack();
  }

  if (requisicao.carregando) return <Carregando />;
  if (requisicao.erro && requisicao.status !== STATUS_SEM_PET_SHOP) {
    return <MensagemErro mensagem={requisicao.erro} aoTentarNovamente={requisicao.recarregar} />;
  }

  return (
    <Tela
      rodape={
        <Botao icon="content-save-outline" onPress={aoSalvar} carregando={executando}>
          Salvar
        </Botao>
      }
    >
      {!jaCadastrado ? (
        <Text variant="bodyMedium" style={styles.aviso}>
          Cadastre seu pet shop para liberar o cadastro de produtos, serviços e horários.
        </Text>
      ) : null}
      <CampoTexto label="Nome do pet shop" icone="storefront-outline" valor={valores.nome} aoAlterar={alterarCampo("nome")} erro={erros.nome} />
      <CampoTexto
        label="Endereço"
        icone="map-marker-outline"
        valor={valores.endereco}
        aoAlterar={alterarCampo("endereco")}
        erro={erros.endereco}
      />
      <CampoTexto
        label="Telefone"
        icone="phone-outline"
        valor={valores.telefone}
        aoAlterar={alterarCampo("telefone")}
        erro={erros.telefone}
        keyboardType="phone-pad"
      />
    </Tela>
  );
}

const styles = StyleSheet.create({
  aviso: { color: cores.textoSecundario, marginBottom: 14 },
});
