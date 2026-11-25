import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import Botao from "../../components/comuns/Botao";
import Cartao from "../../components/comuns/Cartao";
import ConteudoRequisicao from "../../components/comuns/ConteudoRequisicao";
import LinhaInfo from "../../components/comuns/LinhaInfo";
import Tela from "../../components/comuns/Tela";
import TituloSecao from "../../components/comuns/TituloSecao";
import AvatarPet from "../../components/pets/AvatarPet";
import { buscarEspecie } from "../../constants/especies";
import useAcao from "../../hooks/useAcao";
import useRequisicao from "../../hooks/useRequisicao";
import { buscarPet, removerPet } from "../../services/petService";
import cores from "../../theme/cores";
import confirmar from "../../utils/confirmar";
import { descreverIdade, formatarData, numeroParaTexto } from "../../utils/formatadores";

export default function DetalhePet({ route, navigation }) {
  const { id } = route.params;
  const { executando, executar } = useAcao();
  const requisicao = useRequisicao(() => buscarPet(id), [id], { recarregarAoFocar: true });

  async function aoRemover(pet) {
    const confirmado = await confirmar(
      "Remover pet",
      `Deseja remover ${pet.name}? Agendamentos antigos continuarão mostrando o nome do pet.`,
      "Remover"
    );
    if (!confirmado) return;
    const response = await executar(() => removerPet(id));
    if (response.success) navigation.goBack();
  }

  return (
    <ConteudoRequisicao requisicao={requisicao}>
      {(pet) => (
        <Tela>
          <View style={styles.cabecalho}>
            <AvatarPet especie={pet.species} tamanho={96} />
            <Text variant="headlineSmall" style={styles.nome}>
              {pet.name}
            </Text>
            <Text variant="bodyMedium" style={styles.secundario}>
              {buscarEspecie(pet.species).rotulo}
              {pet.breed ? ` - ${pet.breed}` : ""}
            </Text>
          </View>

          <TituloSecao titulo="Informações" />
          <Cartao>
            <LinhaInfo rotulo="Espécie" valor={buscarEspecie(pet.species).rotulo} />
            <LinhaInfo rotulo="Raça" valor={pet.breed || "Não informada"} />
            <LinhaInfo
              rotulo="Nascimento"
              valor={pet.birthDate ? `${formatarData(pet.birthDate)} (${descreverIdade(pet.birthDate)})` : "Não informado"}
            />
            <LinhaInfo rotulo="Peso" valor={pet.weight ? `${numeroParaTexto(pet.weight)} kg` : "Não informado"} />
          </Cartao>

          <TituloSecao titulo="Observações" />
          <Cartao>
            <Text variant="bodyMedium" style={pet.notes ? styles.texto : styles.secundario}>
              {pet.notes || "Nenhuma observação."}
            </Text>
          </Cartao>

          <Botao icon="calendar-plus" onPress={() => navigation.navigate("PetShops")} estilo={styles.botao}>
            Agendar serviço
          </Botao>
          <Botao variante="secundario" icon="pencil-outline" onPress={() => navigation.navigate("FormularioPet", { pet })}>
            Editar
          </Botao>
          <Botao variante="perigo" icon="trash-can-outline" carregando={executando} onPress={() => aoRemover(pet)}>
            Remover pet
          </Botao>
        </Tela>
      )}
    </ConteudoRequisicao>
  );
}

const styles = StyleSheet.create({
  cabecalho: { alignItems: "center", marginBottom: 6 },
  nome: { color: cores.texto, fontWeight: "bold", marginTop: 10 },
  secundario: { color: cores.textoSecundario },
  texto: { color: cores.texto },
  botao: { marginTop: 16 },
});
