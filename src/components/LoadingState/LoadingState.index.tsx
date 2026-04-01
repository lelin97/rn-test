import { ActivityIndicator, Text, View } from "react-native";

import { loadingStateStyles } from "./LoadingState.styles";

type LoadingProps = {
  message: string;
};

export function LoadingState({ message }: LoadingProps) {
  return (
    <View style={loadingStateStyles.container}>
      <ActivityIndicator size="small" color="#818cf8" />
      <Text style={loadingStateStyles.text}>{message}</Text>
    </View>
  );
}
