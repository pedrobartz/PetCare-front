import { useLayoutEffect } from "react";
import { IconButton } from "react-native-paper";

import ConteudoRequisicao from "../../components/comuns/ConteudoRequisicao";
import EstadoVazio from "../../components/comuns/EstadoVazio";
import Tela from "../../components/comuns/Tela";
import CardEndereco from "../../components/enderecos/CardEndereco";
import useAcao from "../../hooks/useAcao";
import useRequisicao from "../../hooks/useRequisicao";
import { listarEnderecos, removerEndereco } from "../../services/enderecoService";
import cores from "../../theme/cores";
import confirmar from "../../utils/confirmar";

export default function Enderecos({ navigation }) {
  const requisicao = useRequisicao(listarEnderecos, [], { recarregarAoFocar: true });
  const { executar } = useAcao();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton icon="plus" iconColor={cores.primaria} onPress={() => navigation.navigate("FormularioEndereco")} />
      ),
    });
  }, [navigation]);

  async function aoRemover(endereco) {
    const confirmado = await confirmar("Remover endereço", `Deseja remover o endereço "${endereco.label}"?`, "Remover");
    if (!confirmado) return;
    const response = await executar(() => removerEndereco(endereco.id));
    if (response.success) requisicao.recarregar();
  }

  return (
    <ConteudoRequisicao requisicao={requisicao}>
      {(enderecos) => (
        <Tela>
          {enderecos.length === 0 ? (
            <EstadoVazio
              icone="map-marker-plus-outline"
              titulo="Nenhum endereço cadastrado"
              textoAcao="Adicionar endereço"
              aoPressionarAcao={() => navigation.navigate("FormularioEndereco")}
            />
          ) : (
            enderecos.map((endereco) => (
              <CardEndereco
                key={endereco.id}
                endereco={endereco}
                aoEditar={() => navigation.navigate("FormularioEndereco", { endereco })}
                aoRemover={aoRemover}
              />
            ))
          )}
        </Tela>
      )}
    </ConteudoRequisicao>
  );
}
