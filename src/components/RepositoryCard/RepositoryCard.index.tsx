import { Pressable, Text, View } from "react-native";

import { RepositoryListItem } from "../../types/repository";
import { repositoryCardStyles } from "./RepositoryCard.styles";

type RepositoryCardProps = {
  repository: RepositoryListItem;
  onPress: (repository: RepositoryListItem) => void;
};

export function RepositoryCard({ repository, onPress }: RepositoryCardProps) {
  return (
    <Pressable
      style={repositoryCardStyles.card}
      onPress={() => onPress(repository)}
    >
      <Text style={repositoryCardStyles.cardName}>{repository.name}</Text>
      <Text style={repositoryCardStyles.cardOwner}>{repository.owner}</Text>
      <View style={repositoryCardStyles.cardMetaRow}>
        <Text style={repositoryCardStyles.cardMeta}>{repository.language}</Text>
        <Text style={repositoryCardStyles.cardMeta}>★ {repository.stars}</Text>
      </View>
    </Pressable>
  );
}
