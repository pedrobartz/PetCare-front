import EstadoVazio from "../../components/comuns/EstadoVazio";
import ListaPaginada from "../../components/comuns/ListaPaginada";
import CardPetShop from "../../components/petshops/CardPetShop";
import useListaPaginada from "../../hooks/useListaPaginada";
import { listarPetShops } from "../../services/petShopService";

export default function PetShops({ navigation }) {
  const lista = useListaPaginada((pagina) => listarPetShops(pagina));

  return (
    <ListaPaginada
      lista={lista}
      renderizarItem={(petShop) => (
        <CardPetShop petShop={petShop} aoPressionar={() => navigation.navigate("DetalhePetShop", { id: petShop.id })} />
      )}
      componenteVazio={<EstadoVazio icone="storefront-outline" titulo="Nenhum pet shop cadastrado ainda" />}
    />
  );
}
