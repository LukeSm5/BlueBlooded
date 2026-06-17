import { useEffect, useState } from 'react';
import { Text, StyleSheet, SafeAreaView, View, ActivityIndicator, ScrollView} from 'react-native';
import Button from '../../components/shared/Button';
import { colors } from '../../constants/colors';
import TextInput from '../../components/shared/TextInput';
import { CategoryFilter } from '../../components/community/categoryFilter';
import { CreateDiscussionModal } from '../../components/community/createDiscussionModal';
import { supabase } from '../../services/supabaseClient';
import { Thread } from '../../types/thread';
import PostPill from '../../components/community/PostPill';
import { CommunityProvider } from '../../context/communityContext';
import { useAuth } from '../../hooks/useAuth';

const CommunityScreen = () => {
    return (
        <CommunityProvider>
            <CommunityScreenInner />
        </CommunityProvider>
    );
};

const CommunityScreenInner = () => {
    const [search, setSearch] = useState('');
    const [topPosts, setTopPosts] = useState<Thread[]>([]);
    const [userPosts, setUserPosts] = useState<Thread[]>([]);
    const [loading, setLoading] = useState(true);
    const { profile, userIdToUsername } = useAuth();
    const [usernameMap, setUsernameMap] = useState<Record<string, string>>({});
    const [likesMap, setLikesMap] = useState<Record<string, { count: number; likedByMe: boolean }>>({});

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
    const channel = supabase
        .channel('likes-changes')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'likes' },
            (payload) => {
                const row = payload.eventType === 'DELETE' ? payload.old : payload.new;
                const threadId = row.thread_id;

                setLikesMap(prev => {
                    const current = prev[threadId] ?? { count: 0, likedByMe: false };
                    const delta = payload.eventType === 'INSERT' ? 1 : -1;
                    return {
                        ...prev,
                        [threadId]: {
                            ...current,
                            count: Math.max(0, current.count + delta),
                        },
                    };
                });
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
}, []);

    const fetchPosts = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        const { data: top } = await supabase
            .from('threads')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);
        
        const { data: mine } = await supabase
            .from('threads')
            .select('*')
            .eq('user_id', user?.id)
            .order('created_at', { ascending: false });
        setTopPosts(top ?? []);
        setUserPosts(mine ?? []);
        const allPosts = [...(top ?? []), ...(mine ?? [])];
        const uniqueUserIds = [...new Set(allPosts.map(p => p.user_id))];

        const entries = await Promise.all(
            uniqueUserIds.map(async (id) => [id, await userIdToUsername(id)])
        );
        setUsernameMap(Object.fromEntries(entries));
        const allIds = allPosts.map(p => p.id);

        const { data: likesData } = await supabase
            .from('likes')
            .select('thread_id, user_id')
            .in('thread_id', allIds);

        const newLikesMap: Record<string, { count: number; likedByMe: boolean }> = {};
        for (const id of allIds) {
            const rows = likesData?.filter(l => l.thread_id === id) ?? [];
            newLikesMap[id] = {
                count: rows.length,
                likedByMe: rows.some(l => l.user_id === user?.id),
            };
        }
        setLikesMap(newLikesMap);
        console.log('likesMap:', JSON.stringify(newLikesMap, null, 2));
        setLoading(false);
    }

    const handleSearch = () => {
        // Implement search functionality here
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Discussion Board</Text>
            <View style={styles.searchContainer}>
                <Button style={styles.button} icon="search" onPress={handleSearch} size = "sm"/>
                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder="Search"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
                <CategoryFilter />
            </View>
            <CreateDiscussionModal onCreated={fetchPosts}/>
             <ScrollView contentContainerStyle={styles.feed}>
            <Text style={styles.subtitle}>Top Posts</Text>
            {loading ? (
                <ActivityIndicator color={colors.white} style={{ marginTop: 20 }} />
            ) : (
                topPosts.map(post => (
                    <PostPill
                        key={post.id}
                        postId={post.id}
                        title={post.title}
                        description={post.body}
                        username={usernameMap[post.user_id] ?? 'No username yet'}
                        timestamp={new Date(post.created_at).toLocaleDateString()}
                        currentUserId={profile?.id ?? ''}
                        likeCount={likesMap[post.id]?.count ?? 0}
                        likedByMe={likesMap[post.id]?.likedByMe ?? false}
                    />
                ))
            )}

            <Text style={styles.subtitle}>Your Posts</Text>
            {!loading && userPosts.length === 0 ? (
                <Text style={styles.empty}>No posts yet.</Text>
            ) : (
                userPosts.map(post => (
                    <PostPill
                        key={post.id}
                        postId={post.id}
                        title={post.title}
                        description={post.body}
                        username={profile?.username ?? "No username yet"}
                        timestamp={new Date(post.created_at).toLocaleDateString()}
                        currentUserId={profile?.id ?? ''}
                        likeCount={likesMap[post.id]?.count ?? 0}
                        likedByMe={likesMap[post.id]?.likedByMe ?? false}
                    />
                ))
            )}
        </ScrollView>
        </SafeAreaView>

    );
};
export default CommunityScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    title: {
        marginTop: 20,
        color: colors.white,
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Anton-Regular',
    },
    subtitle: {
        marginTop: 50,
        color: colors.white,
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Anton-Regular',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        gap: 8,
        
    },
    inputWrapper: { 
      flex: 1,
      marginBottom: -16,
    },
    button: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
    },
    feed: {
        paddingBottom: 40,
    },
    empty: { 
        color: colors.white,
        textAlign: 'center',
        marginTop: 12,
        opacity: 0.5,
        fontSize: 13,
    }
})