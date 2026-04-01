import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { RepositorySavedScreen } from "../screens/RepositorySavedScreen/RepositorySavedScreen.index";
import { SearchNavigator } from "./SearchNavigator";
import { RootTabParamList } from "./types";
import { Ionicons } from "@expo/vector-icons";

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
          tabBarItemStyle: {
            paddingVertical: 12,
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
          options={{
            title: "Search",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search-outline" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="SavedTab"
          component={RepositorySavedScreen}
          options={{
            title: "Saved",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="star-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
