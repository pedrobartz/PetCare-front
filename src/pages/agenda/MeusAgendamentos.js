import { useLayoutEffect } from "react";
import { IconButton } from "react-native-paper";

import CardAgendamento from "../../components/agendamentos/CardAgendamento";
import EstadoVazio from "../../components/comuns/EstadoVazio";
import ListaPaginada from "../../components/comuns/ListaPaginada";
import useListaPaginada from "../../hooks/useListaPaginada";
import { listarMeusAgendamentos } from "../../services/agendamentoService";
import cores from "../../theme/cores";

export default function MeusAgendamentos({ navigation }) {
  const lista = useListaPaginada((pagina) => listarMeusAgendamentos({ pagina }), [], { recarregarAoFocar: true });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton icon="calendar-plus" iconColor={cores.primaria} onPress={() => navigation.navigate("PetShops")} />
      ),
    });
  }, [navigation]);

  return (
    <ListaPaginada
      lista={lista}
      renderizarItem={(agendamento) => (
        <CardAgendamento
          agendamento={agendamento}
          aoPressionar={() => navigation.navigate("DetalheAgendamento", { id: agendamento.id })}
        />
      )}
      componenteVazio={
        <EstadoVazio
          icone="calendar-blank-outline"
          titulo="Nenhum agendamento"
          descricao="Agende banho, tosa e outros serviços para o seu pet."
          textoAcao="Agendar serviço"
          aoPressionarAcao={() => navigation.navigate("PetShops")}
        />
      }
    />
  );
}
