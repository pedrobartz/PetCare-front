import { MaterialCommunityIcons } from "@expo/vector-icons";

import { opcoesAbas } from "./opcoesNavegacao";

export default function criarTelaDeAbas(Abas, abas) {
  return function TelaDeAbas() {
    return (
      <Abas.Navigator screenOptions={opcoesAbas}>
        {abas.map((aba) => (
          <Abas.Screen
            key={aba.nome}
            name={aba.nome}
            component={aba.componente}
            options={{
              title: aba.titulo,
              tabBarLabel: aba.rotulo,
              headerShown: aba.cabecalho !== false,
              tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name={aba.icone} color={color} size={size} />,
            }}
          />
        ))}
      </Abas.Navigator>
    );
  };
}
