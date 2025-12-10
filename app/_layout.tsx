import { useDesignSystem } from "@/hooks/useDesignSystem";
import { useLoading, useToast } from "@/redux/actions/hooks/useOthers";
import { store } from "@/redux/store";
import { theme } from "@/utils/designSystem";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Incubator, LoaderScreen } from "react-native-ui-lib";
import { Provider } from "react-redux";
require("react-native-ui-lib/config").setConfig({ appScheme: "default" });

export default function RootLayout() {
  useDesignSystem();

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation />
        <StatusBar
          style="dark"
          backgroundColor={theme.color.containerBackground}
        />
      </GestureHandlerRootView>
    </Provider>
  );
}

function Navigation() {
  const { toast, Toaster } = useToast();
  const { loading } = useLoading();
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(initialRoute)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      {
        loading && (
          <LoaderScreen overlay loaderColor={theme.color.primary} message="Loading..." backgroundColor={!isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"} />
        )
      }
      <Incubator.Toast
        backgroundColor={"#fff"}
        autoDismiss={2000}
        swipeable
        position="bottom"
        messageStyle={{
          color: "#000",
          fontSize: theme.fontSize.regular,
          fontFamily: theme.font.regular,
        }}
        onDismiss={() => {
          Toaster({ visible: false });
        }}
        {...toast}
      />
    </SafeAreaView>
  );
}
