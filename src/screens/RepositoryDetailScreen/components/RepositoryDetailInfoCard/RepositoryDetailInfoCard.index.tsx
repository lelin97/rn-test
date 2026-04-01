import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import type { RepositoryDetailInfoCardModel } from "../../../../types/repository";
import { formatStarCount } from "../../../../utils/formatStarCount";
import { repositoryDetailInfoCardStyles as styles } from "./RepositoryDetailInfoCard.styles";

type RepositoryDetailInfoCardProps = {
  repository: RepositoryDetailInfoCardModel;
};

export function RepositoryDetailInfoCard({ repository }: RepositoryDetailInfoCardProps) {
  const fullName = `${repository.owner.login ?? ""}/${repository.name}`;

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{repository.name}</Text>
      <Text style={styles.fullName}>{fullName}</Text>

      {repository.description ? <Text style={styles.description}>{repository.description}</Text> : null}

      <View style={styles.statsRow}>
        <StatItem icon="star-outline" label={formatStarCount(repository.stargazers_count)} />
        <StatItem icon="git-branch-outline" label={formatStarCount(repository.forks_count)} />
        <StatItem icon="alert-circle-outline" label={String(repository.open_issues_count)} />
      </View>

      {repository.language ? (
        <View style={styles.metaRow}>
          <Ionicons name="ellipse" size={12} color="#818cf8" />
          <Text style={styles.metaText}>{repository.language}</Text>
        </View>
      ) : null}
    </View>
  );
}

function StatItem({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View style={styles.statItem}>
      <Ionicons name={icon} size={16} color="#94a3b8" />
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}
