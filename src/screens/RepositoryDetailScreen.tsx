import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { SearchStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<SearchStackParamList, "RepositoryDetail">;

export function RepositoryDetailScreen({ route, navigation }: Props) {
  const { owner, repo } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Pressable
          onPress={navigation.goBack}
          style={styles.backButton}
          hitSlop={15}
        >
          <Ionicons name="chevron-back" size={20} color="#818cf8" />
          <Text style={styles.backText}>Results</Text>
        </Pressable>

        <Text style={styles.title}>{repo}</Text>
        <Text style={styles.owner}>
          {owner}/{repo}
        </Text>
        <Text style={styles.body}>
          This screen will be used to display the complete details of the
          repository and the favorite toggle.
        </Text>
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
    padding: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 16,
    gap: 6,
  },
  backText: {
    color: "#818cf8",
    fontSize: 18,
    fontWeight: "600",
  },
  title: {
    color: "#f8fafc",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  owner: {
    color: "#818cf8",
    fontSize: 16,
    marginBottom: 16,
  },
  body: {
    color: "#94a3b8",
    fontSize: 15,
    lineHeight: 22,
  },
});
