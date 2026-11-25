import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import Botao from "../../components/comuns/Botao";
import CampoTexto from "../../components/comuns/CampoTexto";
import SeletorOpcoes from "../../components/comuns/SeletorOpcoes";
import Tela from "../../components/comuns/Tela";
import ImagemProduto from "../../components/produtos/ImagemProduto";
import { MOEDAS, MOEDA_PADRAO } from "../../constants/moedas";
import useAcao from "../../hooks/useAcao";
import useFormulario from "../../hooks/useFormulario";
import { atualizarProduto, criarProduto, desativarProduto } from "../../services/prestador/meusProdutosService";
import cores from "../../theme/cores";
import confirmar from "../../utils/confirmar";
import { numeroParaTexto, textoParaNumero } from "../../utils/formatadores";
import { estaVazio, inteiroNaoNegativo, numeroPositivo } from "../../utils/validadores";

function valoresIniciais(produto) {
  return {
    nome: produto?.name || "",
    marca: produto?.brand || "",
    modelo: produto?.model || "",
    descricao: produto?.description || "",
    categoria: produto?.category || "",
    moeda: produto?.currency || MOEDA_PADRAO,
    preco: numeroParaTexto(produto?.price),
    estoque: produto ? String(produto.stock) : "",
    imagem: produto?.image || "",
  };
}

function validarProduto(valores) {
  return {
    nome: estaVazio(valores.nome) ? "Informe o nome." : "",
    preco: numeroPositivo(textoParaNumero(valores.preco)) ? "" : "Informe um preço válido.",
    estoque: inteiroNaoNegativo(textoParaNumero(valores.estoque)) ? "" : "Informe um estoque inteiro.",
  };
}

function textoOuNulo(texto) {
  return texto.trim() || null;
}

function montarProduto(valores) {
  return {
    name: valores.nome.trim(),
    brand: textoOuNulo(valores.marca),
    model: textoOuNulo(valores.modelo),
    description: textoOuNulo(valores.descricao),
    category: textoOuNulo(valores.categoria),
    currency: valores.moeda,
    price: textoParaNumero(valores.preco),
    stock: textoParaNumero(valores.estoque),
    image: textoOuNulo(valores.imagem),
  };
}

export default function FormularioProduto({ route, navigation }) {
  const produto = route.params?.produto;
  const { valores, erros, alterarCampo, validarFormulario } = useFormulario(valoresIniciais(produto), validarProduto);
  const { executando, executar } = useAcao();

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: produto ? "Editar produto" : "Novo produto" });
  }, [navigation, produto]);

  async function aoSalvar() {
    if (!validarFormulario()) return;
    const dados = montarProduto(valores);
    const response = await executar(() => (produto ? atualizarProduto(produto.id, dados) : criarProduto(dados)), {
      tituloErro: "Não foi possível salvar",
    });
    if (response.success) navigation.goBack();
  }

  async function aoDesativar() {
    const confirmado = await confirmar("Desativar produto", "O produto deixará de aparecer na loja. Deseja continuar?", "Desativar");
    if (!confirmado) return;
    const response = await executar(() => desativarProduto(produto.id));
    if (response.success) navigation.goBack();
  }

  return (
    <Tela>
      <View style={styles.previa}>
        <ImagemProduto uri={valores.imagem.trim() || null} tamanho={120} />
      </View>
      <CampoTexto label="Nome *" valor={valores.nome} aoAlterar={alterarCampo("nome")} erro={erros.nome} />
      <View style={styles.linha}>
        <View style={styles.coluna}>
          <CampoTexto label="Marca" valor={valores.marca} aoAlterar={alterarCampo("marca")} />
        </View>
        <View style={styles.coluna}>
          <CampoTexto label="Modelo" valor={valores.modelo} aoAlterar={alterarCampo("modelo")} />
        </View>
      </View>
      <CampoTexto label="Categoria" icone="tag-outline" valor={valores.categoria} aoAlterar={alterarCampo("categoria")} />
      <CampoTexto label="Descrição" valor={valores.descricao} aoAlterar={alterarCampo("descricao")} multiline />

      <Text variant="labelLarge" style={styles.rotulo}>
        Moeda do preço
      </Text>
      <SeletorOpcoes opcoes={MOEDAS} selecionado={valores.moeda} aoSelecionar={alterarCampo("moeda")} />

      <View style={[styles.linha, styles.espaco]}>
        <View style={styles.coluna}>
          <CampoTexto
            label="Preço *"
            valor={valores.preco}
            aoAlterar={alterarCampo("preco")}
            erro={erros.preco}
            keyboardType="decimal-pad"
          />
        </View>
        <View style={styles.coluna}>
          <CampoTexto
            label="Estoque *"
            valor={valores.estoque}
            aoAlterar={alterarCampo("estoque")}
            erro={erros.estoque}
            keyboardType="number-pad"
          />
        </View>
      </View>
      <CampoTexto
        label="URL da imagem"
        icone="image-outline"
        valor={valores.imagem}
        aoAlterar={alterarCampo("imagem")}
        autoCapitalize="none"
        keyboardType="url"
      />

      <Botao icon="content-save-outline" onPress={aoSalvar} carregando={executando}>
        Salvar produto
      </Botao>
      {produto?.active ? (
        <Botao variante="perigo" icon="eye-off-outline" onPress={aoDesativar} disabled={executando}>
          Desativar produto
        </Botao>
      ) : null}
    </Tela>
  );
}

const styles = StyleSheet.create({
  previa: { alignItems: "center", marginBottom: 14 },
  linha: { flexDirection: "row", gap: 10 },
  coluna: { flex: 1 },
  rotulo: { color: cores.texto, marginBottom: 4 },
  espaco: { marginTop: 10 },
});
