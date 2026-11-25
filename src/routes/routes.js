import Carregando from "../components/comuns/Carregando";
import { useAuth } from "../contexts/AuthContext";
import AuthRoutes from "./AuthRoutes";
import ClienteRoutes from "./ClienteRoutes";
import PrestadorRoutes from "./PrestadorRoutes";

export default function Routes() {
  const { usuario, carregandoSessao, ehPrestador } = useAuth();

  if (carregandoSessao) return <Carregando />;
  if (!usuario) return <AuthRoutes />;
  return ehPrestador ? <PrestadorRoutes /> : <ClienteRoutes />;
}
