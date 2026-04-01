import { Pressable, Text, View } from "react-native";

import type { RepositoryCardItem } from "../../types/repository";
import { formatStarCount } from "../../utils/formatStarCount";
import { repositoryCardStyles } from "./RepositoryCard.styles";

type RepositoryCardProps = {
  repository: RepositoryCardItem;
  onPress: (repository: RepositoryCardItem) => void;
};

export function RepositoryCard({ repository, onPress }: RepositoryCardProps) {
  return (
    <Pressable
      style={repositoryCardStyles.card}
      onPress={() => onPress(repository)}
    >
      <Text style={repositoryCardStyles.cardName}>{repository.name}</Text>
      <Text style={repositoryCardStyles.cardOwner}>
        {repository.owner.login}
      </Text>
      <View style={repositoryCardStyles.cardMetaRow}>
        <Text style={repositoryCardStyles.cardMeta}>
          {repository.language ?? "—"}
        </Text>
        <Text style={repositoryCardStyles.cardMeta}>
          ★ {formatStarCount(repository.stargazers_count)}
        </Text>
      </View>
    </Pressable>
  );
}
