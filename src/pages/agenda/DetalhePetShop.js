import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Botao from "../../components/comuns/Botao";
import Cartao from "../../components/comuns/Cartao";
import LinhaIcone from "../../components/comuns/LinhaIcone";
import ConteudoRequisicao from "../../components/comuns/ConteudoRequisicao";
import EstadoVazio from "../../components/comuns/EstadoVazio";
import Tela from "../../components/comuns/Tela";
import TituloSecao from "../../components/comuns/TituloSecao";
import CardServico from "../../components/petshops/CardServico";
import useRequisicao from "../../hooks/useRequisicao";
import { buscarPetShop, listarServicosDoPetShop } from "../../services/petShopService";
import cores from "../../theme/cores";

async function carregarPetShopComServicos(id) {
  const [petShop, servicos] = await Promise.all([buscarPetShop(id), listarServicosDoPetShop(id)]);
  if (!petShop.success) return petShop;
  if (!servicos.success) return servicos;
  return { success: true, data: { petShop: petShop.data, servicos: servicos.data } };
}

export default function DetalhePetShop({ route, navigation }) {
  const { id } = route.params;
  const requisicao = useRequisicao(() => carregarPetShopComServicos(id), [id]);

  return (
    <ConteudoRequisicao requisicao={requisicao}>
      {({ petShop, servicos }) => (
        <Tela>
          <Cartao>
            <Text variant="titleLarge" style={styles.titulo}>
              {petShop.name}
            </Text>
            <LinhaIcone icone="map-marker-outline" texto={petShop.address} />
            <LinhaIcone icone="phone-outline" texto={petShop.phone} />
            <Botao
              variante="secundario"
              icon="shopping-outline"
              estilo={styles.botao}
              onPress={() => navigation.navigate("ProdutosDoPetShop", { petShopId: petShop.id, nome: petShop.name })}
            >
              Ver produtos da loja
            </Botao>
          </Cartao>

          <TituloSecao titulo="Serviços" />
          {servicos.length === 0 ? (
            <EstadoVazio icone="content-cut" titulo="Nenhum serviço disponível" />
          ) : (
            servicos.map((servico) => (
              <CardServico
                key={servico.id}
                servico={servico}
                aoPressionar={() => navigation.navigate("NovoAgendamento", { petShop, servico })}
                acao={<MaterialCommunityIcons name="calendar-plus" size={22} color={cores.primaria} />}
              />
            ))
          )}
          {servicos.length > 0 ? (
            <Text variant="bodySmall" style={styles.dica}>
              Toque em um serviço para agendar.
            </Text>
          ) : null}
        </Tela>
      )}
    </ConteudoRequisicao>
  );
}

const styles = StyleSheet.create({
  titulo: { color: cores.texto, fontWeight: "bold", marginBottom: 8 },
  botao: { marginTop: 12 },
  dica: { color: cores.textoSecundario, textAlign: "center" },
});
