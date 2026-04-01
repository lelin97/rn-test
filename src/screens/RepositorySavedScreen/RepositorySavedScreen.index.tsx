import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { repositorySavedScreenStyles as styles } from "./RepositorySavedScreen.styles";

export function RepositorySavedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Saved</Text>
        <Text style={styles.subtitle}>Here should be the list of saved repositories.</Text>
      </View>
    </SafeAreaView>
  );
}
