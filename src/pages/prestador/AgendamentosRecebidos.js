import CardAgendamento from "../../components/agendamentos/CardAgendamento";
import EstadoVazio from "../../components/comuns/EstadoVazio";
import ListaPaginada from "../../components/comuns/ListaPaginada";
import useListaPaginada from "../../hooks/useListaPaginada";
import { listarAgendamentosRecebidos } from "../../services/prestador/agendamentosRecebidosService";

export default function AgendamentosRecebidos({ navigation }) {
  const lista = useListaPaginada((pagina) => listarAgendamentosRecebidos({ pagina }), [], { recarregarAoFocar: true });

  return (
    <ListaPaginada
      lista={lista}
      renderizarItem={(agendamento) => (
        <CardAgendamento
          agendamento={agendamento}
          mostrarCliente
          aoPressionar={() => navigation.navigate("DetalheAgendamentoRecebido", { id: agendamento.id })}
        />
      )}
      componenteVazio={<EstadoVazio icone="calendar-blank-outline" titulo="Nenhum agendamento recebido" />}
    />
  );
}
