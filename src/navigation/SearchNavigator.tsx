import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RepositorySearchScreen } from "../screens/RepositorySearchScreen/RepositorySearchScreen.index";
import { SearchStackParamList } from "./types";

const Stack = createNativeStackNavigator<SearchStackParamList>();

export function SearchNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#090d1a" },
        headerTintColor: "#818cf8",
      }}
    >
      <Stack.Screen
        name="RepositorySearch"
        component={RepositorySearchScreen}
        options={{ title: "Explore", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
