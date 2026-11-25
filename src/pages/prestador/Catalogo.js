import { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, SegmentedButtons } from "react-native-paper";

import AbaProdutos from "./catalogo/AbaProdutos";
import AbaServicos from "./catalogo/AbaServicos";
import Carregando from "../../components/comuns/Carregando";
import EstadoVazio from "../../components/comuns/EstadoVazio";
import MensagemErro from "../../components/comuns/MensagemErro";
import useRequisicao from "../../hooks/useRequisicao";
import { buscarMeuPetShop, STATUS_SEM_PET_SHOP } from "../../services/prestador/meuPetShopService";
import cores from "../../theme/cores";

const ABAS = {
  produtos: { componente: AbaProdutos, formulario: "FormularioProduto" },
  servicos: { componente: AbaServicos, formulario: "FormularioServico" },
};

export default function Catalogo({ navigation }) {
  const [aba, setAba] = useState("produtos");
  const petShop = useRequisicao(buscarMeuPetShop, [], { recarregarAoFocar: true });
  const { componente: ConteudoAba, formulario } = ABAS[aba];
  const possuiPetShop = Boolean(petShop.dados);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        possuiPetShop ? (
          <IconButton icon="plus" iconColor={cores.primaria} onPress={() => navigation.navigate(formulario)} />
        ) : null,
    });
  }, [navigation, formulario, possuiPetShop]);

  if (petShop.carregando && !possuiPetShop) return <Carregando />;

  if (petShop.status === STATUS_SEM_PET_SHOP) {
    return (
      <EstadoVazio
        icone="storefront-outline"
        titulo="Cadastre seu pet shop primeiro"
        descricao="Produtos e serviços ficam vinculados ao seu pet shop."
        textoAcao="Cadastrar pet shop"
        aoPressionarAcao={() => navigation.navigate("DadosPetShop")}
      />
    );
  }

  if (!possuiPetShop) return <MensagemErro mensagem={petShop.erro} aoTentarNovamente={petShop.recarregar} />;

  return (
    <View style={styles.container}>
      <View style={styles.abas}>
        <SegmentedButtons
          value={aba}
          onValueChange={setAba}
          buttons={[
            { value: "produtos", label: "Produtos", icon: "package-variant" },
            { value: "servicos", label: "Serviços", icon: "content-cut" },
          ]}
        />
      </View>
      <ConteudoAba navigation={navigation} petShopId={petShop.dados.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: cores.fundo, flex: 1 },
  abas: { backgroundColor: cores.superficie, padding: 12 },
});
