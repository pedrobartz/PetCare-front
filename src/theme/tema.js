import { MD3LightTheme } from "react-native-paper";

import cores from "./cores";

const tema = {
  ...MD3LightTheme,
  roundness: 3,
  colors: {
    ...MD3LightTheme.colors,
    primary: cores.primaria,
    primaryContainer: cores.primariaClara,
    secondary: cores.alerta,
    background: cores.fundo,
    surface: cores.superficie,
    error: cores.perigo,
    outline: cores.borda,
    onSurface: cores.texto,
  },
};

export default tema;
