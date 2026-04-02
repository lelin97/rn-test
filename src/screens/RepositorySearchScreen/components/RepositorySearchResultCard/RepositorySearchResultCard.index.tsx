import { Pressable, Text, View } from "react-native";

import type { RepositoryCardItem } from "../../../../types/repository";
import { formatStarCount } from "../../../../utils/formatStarCount";
import { repositorySearchResultCardStyles as styles } from "./RepositorySearchResultCard.styles";

type RepositorySearchResultCardProps = {
  repository: RepositoryCardItem;
  onPress: (repository: RepositoryCardItem) => void;
};

export function RepositorySearchResultCard({
  repository,
  onPress,
}: RepositorySearchResultCardProps) {
  return (
    <Pressable style={styles.card} onPress={() => onPress(repository)}>
      <Text style={styles.cardName}>{repository.name}</Text>
      <Text style={styles.cardOwner}>{repository.owner.login}</Text>
      <View style={styles.cardMetaRow}>
        <Text style={styles.cardMeta}>{repository.language ?? "—"}</Text>
        <Text style={styles.cardMeta}>★ {formatStarCount(repository.stargazers_count)}</Text>
      </View>
    </Pressable>
  );
}
