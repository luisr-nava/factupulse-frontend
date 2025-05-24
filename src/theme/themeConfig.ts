// src/theme/themeConfig.ts
import type { ThemeConfig } from "antd";

// colorPrimary: "#00ADB4", // Color primario
// colorInfo: "#00ADB4", // Info usa el primario
// colorSuccess: "#22C55E", // Verde para éxito
// colorWarning: "#F59E0B", // Amarillo para advertencia
// colorError: "#EF4444", // Rojo para errores
// colorBgBase: "#FFFFFF", // Fondo claro
// colorTextBase: "#1E293B", // Texto oscuro (slate-800)

export const lightTheme: ThemeConfig = {
  token: {},
  components: {
    Input: {
      colorBgBase: "#00adb4",
      colorTextBase: "#1E293B",
    },
    Notification: {
      colorBgContainer: "#00ADB4", // Fondo
      colorText: "#ffffff",
    },
  },
};

export const darkTheme: ThemeConfig = {
  token: {},
  components: {
    Input: {
      colorBgBase: "#00adb4",
    },
    Notification: {
      colorBgContainer: "#00ADB4", // Fondo
      colorText: "#ffffff",
    },
  },
};



