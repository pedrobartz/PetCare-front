import { MaterialCommunityIcons } from "@expo/vector-icons";

import ConteudoRequisicao from "../../../components/comuns/ConteudoRequisicao";
import EstadoVazio from "../../../components/comuns/EstadoVazio";
import Tela from "../../../components/comuns/Tela";
import CardServico from "../../../components/petshops/CardServico";
import useRequisicao from "../../../hooks/useRequisicao";
import { listarServicosDoPetShop } from "../../../services/petShopService";
import cores from "../../../theme/cores";

export default function AbaServicos({ navigation, petShopId }) {
  const requisicao = useRequisicao(() => listarServicosDoPetShop(petShopId), [petShopId], { recarregarAoFocar: true });

  return (
    <ConteudoRequisicao requisicao={requisicao}>
      {(servicos) => (
        <Tela atualizando={requisicao.atualizando} aoAtualizar={requisicao.atualizar}>
          {servicos.length === 0 ? (
            <EstadoVazio
              icone="content-cut"
              titulo="Nenhum serviço cadastrado"
              textoAcao="Cadastrar serviço"
              aoPressionarAcao={() => navigation.navigate("FormularioServico")}
            />
          ) : (
            servicos.map((servico) => (
              <CardServico
                key={servico.id}
                servico={servico}
                aoPressionar={() => navigation.navigate("FormularioServico", { servico })}
                acao={<MaterialCommunityIcons name="pencil-outline" size={20} color={cores.textoSecundario} />}
              />
            ))
          )}
        </Tela>
      )}
    </ConteudoRequisicao>
  );
}
