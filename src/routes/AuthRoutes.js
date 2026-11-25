import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Cadastro from "../pages/auth/Cadastro";
import Login from "../pages/auth/Login";
import { opcoesPilha } from "./opcoesNavegacao";

const Pilha = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Pilha.Navigator screenOptions={opcoesPilha}>
      <Pilha.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Pilha.Screen name="Cadastro" component={Cadastro} options={{ headerTitle: "Cadastro" }} />
    </Pilha.Navigator>
  );
}
