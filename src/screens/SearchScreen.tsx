import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { SearchStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<SearchStackParamList, "SearchList">;

export function SearchScreen({ navigation }: Props) {
  const openExampleRepository = () => {
    navigation.navigate("RepositoryDetail", {
      owner: "facebook",
      repo: "react-native",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.subtitle}>
          Here should be the search input and the list of results.
        </Text>

        <Pressable style={styles.button} onPress={openExampleRepository}>
          <Text style={styles.buttonText}>Open repository details</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090d1a",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  title: {
    color: "#f8fafc",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#3730a3",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#e2e8f0",
    fontWeight: "600",
    fontSize: 14,
  },
});
