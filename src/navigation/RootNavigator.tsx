import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SavedScreen } from "../screens/SavedScreen";
import { SearchNavigator } from "./SearchNavigator";
import { RootTabParamList } from "./types";

const Tab = createBottomTabNavigator<RootTabParamList>();

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#090d1a",
    card: "#090d1a",
    text: "#f8fafc",
    border: "#1e293b",
    primary: "#818cf8",
  },
};

export function RootNavigator() {
  return (
    <NavigationContainer theme={appTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#090d1a",
            borderTopColor: "#1e293b",
          },
          tabBarActiveTintColor: "#818cf8",
          tabBarInactiveTintColor: "#64748b",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
        }}
      >
        <Tab.Screen
          name="SearchTab"
          component={SearchNavigator}
          options={{ title: "Search" }}
        />

        <Tab.Screen
          name="SavedTab"
          component={SavedScreen}
          options={{ title: "Saved" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
