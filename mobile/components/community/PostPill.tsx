import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type PostPillProps = {
  title: string;
  description: string;
  username: string;
  timestamp?: string;
  initialLikes?: number;
};

export default function PostPill({
  title,
  description,
  username,
  timestamp = '',
  initialLikes = 0,
}: PostPillProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const toggleLike = () => {
    setLiked(prev => !prev);
    setLikes(prev => (liked ? prev - 1 : prev + 1));
  };

  const avatarInitials = username
    .replace(/^u\//, '')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>

      <View style={styles.footer}>
        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{avatarInitials}</Text>
          </View>
          <Text style={styles.username}>{username}</Text>
          {timestamp ? (
            <>
              <Text style={styles.dot}>·</Text>
              <Text style={styles.timestamp}>{timestamp}</Text>
            </>
          ) : null}
        </View>

        <TouchableOpacity style={styles.likeBtn} onPress={toggleLike} activeOpacity={0.7}>
          <Text style={[styles.likeIcon, liked && styles.likeIconActive]}>
            {liked ? '♥' : '♡'}
          </Text>
          <Text style={[styles.likeCount, liked && styles.likeCountActive]}>
            {likes}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f0f0f',
    marginBottom: 5,
    lineHeight: 21,
  },
  description: {
    fontSize: 13,
    color: '#6b6b6b',
    lineHeight: 19,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#1d4ed8',
  },
  username: {
    fontSize: 12,
    color: '#6b6b6b',
  },
  dot: {
    fontSize: 12,
    color: '#9ca3af',
  },
  timestamp: {
    fontSize: 12,
    color: '#9ca3af',
  },
  likeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  likeIcon: {
    fontSize: 16,
    color: '#9ca3af',
  },
  likeIconActive: {
    color: '#e8580a',
  },
  likeCount: {
    fontSize: 12,
    color: '#9ca3af',
  },
  likeCountActive: {
    color: '#e8580a',
  },
});
