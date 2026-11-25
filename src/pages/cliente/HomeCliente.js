import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CardAgendamento from "../../components/agendamentos/CardAgendamento";
import ConteudoRequisicao from "../../components/comuns/ConteudoRequisicao";
import EstadoVazio from "../../components/comuns/EstadoVazio";
import Tela from "../../components/comuns/Tela";
import TituloSecao from "../../components/comuns/TituloSecao";
import AvatarPet from "../../components/pets/AvatarPet";
import { useAuth } from "../../contexts/AuthContext";
import useRequisicao from "../../hooks/useRequisicao";
import { listarMeusAgendamentos } from "../../services/agendamentoService";
import { listarPets } from "../../services/petService";
import cores from "../../theme/cores";
import { textoParaData } from "../../utils/formatadores";

const ATALHOS = [
  { icone: "calendar-plus", rotulo: "Agendar serviço", destino: "PetShops" },
  { icone: "shopping-outline", rotulo: "Loja", destino: "Loja" },
  { icone: "cart-outline", rotulo: "Carrinho", destino: "Carrinho" },
  { icone: "receipt-text-outline", rotulo: "Meus pedidos", destino: "MeusPedidos" },
];

function proximoAgendamento(agendamentos) {
  const agora = new Date();
  return agendamentos
    .filter((item) => item.status === "AGENDADO" && textoParaData(item.startAt) >= agora)
    .sort((a, b) => textoParaData(a.startAt) - textoParaData(b.startAt))[0];
}

const QUANTIDADE_AGENDAMENTOS_RESUMO = 50;

async function carregarResumoCliente() {
  const [pets, agendamentos] = await Promise.all([
    listarPets(),
    listarMeusAgendamentos({ pagina: 0, tamanho: QUANTIDADE_AGENDAMENTOS_RESUMO }),
  ]);
  if (!pets.success) return pets;
  const proximo = agendamentos.success ? proximoAgendamento(agendamentos.data.content) : null;
  return { success: true, data: { pets: pets.data, proximo } };
}

export default function HomeCliente({ navigation }) {
  const { usuario } = useAuth();
  const requisicao = useRequisicao(carregarResumoCliente, [], { recarregarAoFocar: true });
  const primeiroNome = usuario.name.split(" ")[0];

  return (
    <ConteudoRequisicao requisicao={requisicao}>
      {({ pets, proximo }) => (
        <Tela atualizando={requisicao.atualizando} aoAtualizar={requisicao.atualizar}>
          <Text variant="headlineSmall" style={styles.ola}>
            Olá, {primeiroNome}
          </Text>
          <Text variant="bodyMedium" style={styles.secundario}>
            {pets.length === 1 ? "1 pet cadastrado" : `${pets.length} pets cadastrados`}
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pets}>
            {pets.map((pet) => (
              <TouchableOpacity
                key={pet.id}
                style={styles.pet}
                onPress={() => navigation.navigate("DetalhePet", { id: pet.id })}
              >
                <AvatarPet especie={pet.species} />
                <Text variant="titleSmall" style={styles.nomePet} numberOfLines={1}>
                  {pet.name}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.pet, styles.novoPet]} onPress={() => navigation.navigate("FormularioPet")}>
              <MaterialCommunityIcons name="plus" size={32} color={cores.primaria} />
              <Text variant="labelMedium" style={styles.secundario}>
                Adicionar
              </Text>
            </TouchableOpacity>
          </ScrollView>

          <TituloSecao titulo="Próximo agendamento" />
          {proximo ? (
            <CardAgendamento
              agendamento={proximo}
              aoPressionar={() => navigation.navigate("DetalheAgendamento", { id: proximo.id })}
            />
          ) : (
            <EstadoVazio
              icone="calendar-blank-outline"
              titulo="Nenhum agendamento futuro"
              textoAcao="Agendar agora"
              aoPressionarAcao={() => navigation.navigate("PetShops")}
            />
          )}

          <TituloSecao titulo="O que você quer hoje?" />
          <View style={styles.atalhos}>
            {ATALHOS.map((atalho) => (
              <TouchableOpacity
                key={atalho.destino}
                style={styles.atalho}
                onPress={() => navigation.navigate(atalho.destino)}
              >
                <MaterialCommunityIcons name={atalho.icone} size={28} color={cores.primaria} />
                <Text variant="labelLarge" style={styles.rotuloAtalho}>
                  {atalho.rotulo}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Tela>
      )}
    </ConteudoRequisicao>
  );
}

const styles = StyleSheet.create({
  ola: { color: cores.texto, fontWeight: "bold" },
  secundario: { color: cores.textoSecundario },
  pets: { gap: 10, paddingVertical: 14 },
  pet: {
    alignItems: "center",
    backgroundColor: cores.superficie,
    borderColor: cores.borda,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    justifyContent: "center",
    padding: 12,
    width: 100,
  },
  novoPet: { borderStyle: "dashed" },
  nomePet: { color: cores.texto, fontWeight: "bold" },
  atalhos: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  atalho: {
    alignItems: "center",
    backgroundColor: cores.superficie,
    borderColor: cores.borda,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    paddingVertical: 18,
    width: "48%",
  },
  rotuloAtalho: { color: cores.texto },
});
