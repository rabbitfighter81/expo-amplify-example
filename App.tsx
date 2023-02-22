import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

// Amplify
// @ts-ignore
import { Amplify, Auth } from "aws-amplify";
// @ts-ignore
import awsconfig from "./src/aws-exports";
// @ts-ignore
import { withAuthenticator } from "aws-amplify-react-native";
import { Button, Text } from "react-native";

Amplify.configure(awsconfig);

function App() {
  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  }

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <Text>💙 + 💛 = React Native + Amplify </Text>
        <Button title="Sign Out" color="tomato" onPress={signOut} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

const AppWithAuth = withAuthenticator(App, false);

export default AppWithAuth;
