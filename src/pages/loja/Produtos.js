import { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";

import EstadoVazio from "../../components/comuns/EstadoVazio";
import ListaPaginada from "../../components/comuns/ListaPaginada";
import SeletorOpcoes from "../../components/comuns/SeletorOpcoes";
import CardProduto from "../../components/produtos/CardProduto";
import { useMoeda } from "../../contexts/MoedaContext";
import useListaPaginada from "../../hooks/useListaPaginada";
import { listarCategorias, listarProdutos } from "../../services/produtoService";
import cores from "../../theme/cores";

const OPCAO_TODAS = { valor: "", rotulo: "Todas" };
const ATRASO_BUSCA_MS = 500;

export default function Produtos({ navigation, route }) {
  const petShopId = route.params?.petShopId;
  const nomePetShop = route.params?.nome;
  const { moeda } = useMoeda();
  const [textoBusca, setTextoBusca] = useState("");
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([OPCAO_TODAS]);

  const lista = useListaPaginada(
    (pagina) => listarProdutos({ pagina, moeda, busca, categoria, petShopId }),
    [moeda, busca, categoria, petShopId]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      ...(nomePetShop ? { headerTitle: nomePetShop } : {}),
      headerRight: () => (
        <IconButton icon="cart-outline" iconColor={cores.primaria} onPress={() => navigation.navigate("Carrinho")} />
      ),
    });
  }, [navigation, nomePetShop]);

  useEffect(() => {
    listarCategorias().then((response) => {
      if (response.success) {
        setCategorias([OPCAO_TODAS, ...response.data.map((item) => ({ valor: item, rotulo: item }))]);
      }
    });
  }, []);

  useEffect(() => {
    const temporizador = setTimeout(() => setBusca(textoBusca.trim()), ATRASO_BUSCA_MS);
    return () => clearTimeout(temporizador);
  }, [textoBusca]);

  return (
    <View style={styles.container}>
      <View style={styles.filtros}>
        <Searchbar placeholder="Buscar produto" value={textoBusca} onChangeText={setTextoBusca} style={styles.busca} />
        <SeletorOpcoes opcoes={categorias} selecionado={categoria} aoSelecionar={setCategoria} />
      </View>
      <ListaPaginada
        lista={lista}
        renderizarItem={(produto) => (
          <CardProduto produto={produto} aoPressionar={() => navigation.navigate("DetalheProduto", { id: produto.id })} />
        )}
        componenteVazio={
          <EstadoVazio icone="package-variant-closed" titulo="Nenhum produto encontrado" descricao="Tente outra busca ou categoria." />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: cores.fundo, flex: 1 },
  filtros: { backgroundColor: cores.superficie, gap: 10, paddingHorizontal: 20, paddingVertical: 12 },
  busca: { backgroundColor: cores.fundo },
});
