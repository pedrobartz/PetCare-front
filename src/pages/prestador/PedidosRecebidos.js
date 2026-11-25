import { useState } from "react";
import { StyleSheet, View } from "react-native";

import EstadoVazio from "../../components/comuns/EstadoVazio";
import ListaPaginada from "../../components/comuns/ListaPaginada";
import SeletorOpcoes from "../../components/comuns/SeletorOpcoes";
import CardPedido from "../../components/pedidos/CardPedido";
import { FILTROS_PEDIDO_RECEBIDO } from "../../constants/statusPedido";
import useListaPaginada from "../../hooks/useListaPaginada";
import { listarPedidosRecebidos } from "../../services/prestador/pedidosRecebidosService";
import cores from "../../theme/cores";

export default function PedidosRecebidos({ navigation }) {
  const [status, setStatus] = useState("");
  const lista = useListaPaginada((pagina) => listarPedidosRecebidos({ pagina, status }), [status], {
    recarregarAoFocar: true,
  });

  return (
    <View style={styles.container}>
      <View style={styles.filtros}>
        <SeletorOpcoes opcoes={FILTROS_PEDIDO_RECEBIDO} selecionado={status} aoSelecionar={setStatus} />
      </View>
      <ListaPaginada
        lista={lista}
        renderizarItem={(pedido) => (
          <CardPedido
            pedido={pedido}
            mostrarCliente
            aoPressionar={() => navigation.navigate("DetalhePedidoRecebido", { id: pedido.id })}
          />
        )}
        componenteVazio={<EstadoVazio icone="inbox-outline" titulo="Nenhum pedido encontrado" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: cores.fundo, flex: 1 },
  filtros: { backgroundColor: cores.superficie, paddingHorizontal: 20, paddingVertical: 10 },
});
