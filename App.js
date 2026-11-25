import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import { AuthProvider } from "./src/contexts/AuthContext";
import { MoedaProvider } from "./src/contexts/MoedaContext";
import Routes from "./src/routes/routes";
import tema from "./src/theme/tema";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={tema}>
        <AuthProvider>
          <MoedaProvider>
            <NavigationContainer>
              <StatusBar style="dark" />
              <Routes />
            </NavigationContainer>
          </MoedaProvider>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
