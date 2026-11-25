import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import Botao from "../../components/comuns/Botao";
import Cartao from "../../components/comuns/Cartao";
import ConteudoRequisicao from "../../components/comuns/ConteudoRequisicao";
import LinhaInfo from "../../components/comuns/LinhaInfo";
import SeletorQuantidade from "../../components/comuns/SeletorQuantidade";
import Tela from "../../components/comuns/Tela";
import ImagemProduto from "../../components/produtos/ImagemProduto";
import { useAuth } from "../../contexts/AuthContext";
import { useMoeda } from "../../contexts/MoedaContext";
import useAcao from "../../hooks/useAcao";
import useRequisicao from "../../hooks/useRequisicao";
import { adicionarItem } from "../../services/carrinhoService";
import { buscarPetShop } from "../../services/petShopService";
import { buscarProduto } from "../../services/produtoService";
import cores from "../../theme/cores";
import avisar from "../../utils/avisar";
import confirmar from "../../utils/confirmar";
import { formatarPreco } from "../../utils/formatadores";

async function carregarProdutoComLoja(id, moeda) {
  const response = await buscarProduto(id, moeda);
  if (!response.success) return response;

  const loja = await buscarPetShop(response.data.establishmentId);
  return { ...response, data: { ...response.data, nomeLoja: loja.success ? loja.data.name : null } };
}

export default function DetalheProduto({ route, navigation }) {
  const { id } = route.params;
  const { moeda } = useMoeda();
  const { ehCliente } = useAuth();
  const [quantidade, setQuantidade] = useState(1);
  const { executando, executar } = useAcao();
  const requisicao = useRequisicao(() => carregarProdutoComLoja(id, moeda), [id, moeda]);

  async function adicionarAoCarrinho() {
    const response = await executar(() => adicionarItem(id, quantidade), { silencioso: true });

    if (response.status === 409) {
      const trocar = await confirmar(
        "Carrinho de outra loja",
        `${response.message}\n\nDeseja esvaziar o carrinho e adicionar este produto?`,
        "Trocar"
      );
      if (!trocar) return;
      const substituicao = await executar(() => adicionarItem(id, quantidade, true));
      if (substituicao.success) irParaCarrinho();
      return;
    }

    if (!response.success) {
      avisar("Não foi possível adicionar", response.message);
      return;
    }

    irParaCarrinho();
  }

  function irParaCarrinho() {
    navigation.navigate("Carrinho");
  }

  return (
    <ConteudoRequisicao requisicao={requisicao}>
      {(produto) => {
        const semEstoque = produto.stock <= 0;
        return (
          <Tela
            rodape={
              ehCliente ? (
                <View style={styles.rodape}>
                  <SeletorQuantidade
                    quantidade={quantidade}
                    aoAlterar={setQuantidade}
                    maximo={produto.stock}
                    desabilitado={semEstoque}
                  />
                  <Botao
                    icon="cart-plus"
                    onPress={adicionarAoCarrinho}
                    carregando={executando}
                    disabled={semEstoque}
                    estilo={styles.botao}
                  >
                    {semEstoque ? "Sem estoque" : "Adicionar"}
                  </Botao>
                </View>
              ) : null
            }
          >
            <View style={styles.imagem}>
              <ImagemProduto uri={produto.image} tamanho={220} />
            </View>
            <Text variant="headlineSmall" style={styles.nome}>
              {produto.name}
            </Text>
            <Text variant="headlineSmall" style={styles.preco}>
              {formatarPreco(produto.convertedPrice, produto.targetCurrency)}
            </Text>
            {produto.currency !== produto.targetCurrency ? (
              <Text variant="bodySmall" style={styles.secundario}>
                Preço original: {formatarPreco(produto.price, produto.currency)}
              </Text>
            ) : null}

            <Cartao estilo={styles.detalhes}>
              {produto.nomeLoja ? <LinhaInfo rotulo="Vendido por" valor={produto.nomeLoja} /> : null}
              {produto.brand ? <LinhaInfo rotulo="Marca" valor={produto.brand} /> : null}
              {produto.model ? <LinhaInfo rotulo="Modelo" valor={produto.model} /> : null}
              {produto.category ? <LinhaInfo rotulo="Categoria" valor={produto.category} /> : null}
              <LinhaInfo rotulo="Estoque" valor={`${produto.stock} unidade(s)`} />
            </Cartao>

            {produto.description ? (
              <>
                <Text variant="titleMedium" style={styles.subtitulo}>
                  Descrição
                </Text>
                <Text variant="bodyMedium" style={styles.descricao}>
                  {produto.description}
                </Text>
              </>
            ) : null}
          </Tela>
        );
      }}
    </ConteudoRequisicao>
  );
}

const styles = StyleSheet.create({
  imagem: { alignItems: "center", backgroundColor: cores.superficie, borderRadius: 16, marginBottom: 16, padding: 12 },
  nome: { color: cores.texto, fontWeight: "bold" },
  preco: { color: cores.primaria, fontWeight: "bold", marginTop: 6 },
  secundario: { color: cores.textoSecundario },
  detalhes: { marginTop: 16 },
  subtitulo: { color: cores.texto, fontWeight: "bold", marginBottom: 6, marginTop: 10 },
  descricao: { color: cores.texto },
  rodape: { alignItems: "center", flexDirection: "row", gap: 12 },
  botao: { flex: 1 },
});
