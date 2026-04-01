import { Text, View } from "react-native";

import type { RepositoryDetailObject } from "../../../../types/repository";
import { repositoryDetailTopicsSectionStyles as styles } from "./RepositoryDetailTopicsSection.styles";

type RepositoryDetailTopicsSectionProps = {
  repository: RepositoryDetailObject;
};

export function RepositoryDetailTopicsSection({ repository }: RepositoryDetailTopicsSectionProps) {
  const topics = repository.topics ?? [];

  if (topics.length === 0) {
    return null;
  }

  return (
    <View>
      <Text style={styles.sectionTitle}>TOPICS</Text>
      <View style={styles.topicsRow}>
        {topics.map((topic) => (
          <View key={topic} style={styles.topicBadge}>
            <Text style={styles.topicText}>{topic}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
