import { useLayoutEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

import ConteudoRequisicao from "../../components/comuns/ConteudoRequisicao";
import EstadoVazio from "../../components/comuns/EstadoVazio";
import CardPet from "../../components/pets/CardPet";
import useRequisicao from "../../hooks/useRequisicao";
import { listarPets } from "../../services/petService";
import cores from "../../theme/cores";
import espacamentos from "../../theme/espacamentos";

export default function MeusPets({ navigation }) {
  const requisicao = useRequisicao(listarPets, [], { recarregarAoFocar: true });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton icon="plus" iconColor={cores.primaria} onPress={() => navigation.navigate("FormularioPet")} />
      ),
    });
  }, [navigation]);

  return (
    <ConteudoRequisicao requisicao={requisicao}>
      {(pets) => (
        <FlatList
          style={styles.lista}
          contentContainerStyle={styles.conteudo}
          data={pets}
          keyExtractor={(pet) => String(pet.id)}
          renderItem={({ item }) => (
            <CardPet pet={item} aoPressionar={() => navigation.navigate("DetalhePet", { id: item.id })} />
          )}
          refreshing={requisicao.atualizando}
          onRefresh={requisicao.atualizar}
          ListEmptyComponent={
            <EstadoVazio
              icone="paw"
              titulo="Nenhum pet cadastrado"
              descricao="Cadastre seus pets para agendar serviços."
              textoAcao="Cadastrar pet"
              aoPressionarAcao={() => navigation.navigate("FormularioPet")}
            />
          }
        />
      )}
    </ConteudoRequisicao>
  );
}

const styles = StyleSheet.create({
  lista: { backgroundColor: cores.fundo },
  conteudo: { flexGrow: 1, padding: espacamentos.grande },
});
