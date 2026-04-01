import { Text, View } from "react-native";

import { emptyStateStyles } from "./EmptyState.styles";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <View style={emptyStateStyles.container}>
      <Text style={emptyStateStyles.title}>{title}</Text>
      <Text style={emptyStateStyles.description}>{description}</Text>
    </View>
  );
}
