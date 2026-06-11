import { Modal, View, Text, StyleSheet } from 'react-native';
import TextInput from '../shared/TextInput';
import Button from '../shared/Button';
import { colors } from '../../constants/colors';
import { CategoryDropDown } from './categoryDropDown';
import { useCommunityContext } from '../../context/communityContext';
import { Props } from '../../types/thread';

export function CreateDiscussionModal({ onCreated }: Props) {
    const { isCreateOpen, setIsCreateOpen, title, setTitle, content, setContent, error, setError, createDiscussion } = useCommunityContext();

    return (
        <View>
            <View style={styles.buttonContainer}>
            <Button label="Create Discussion" onPress={() => setIsCreateOpen(true)} size='sm' />
            </View>
            <Modal
                visible={isCreateOpen}
                transparent
                animationType="slide"
                onRequestClose={() => setIsCreateOpen(false)}
            >
                <View style={styles.backdrop}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>Create Discussion Post</Text>
                        <TextInput
                            label="Title"
                            placeholder="Enter discussion title"
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TextInput
                            label="Content"
                            placeholder="Enter discussion content"
                            value={content}
                            onChangeText={setContent}
                            multiline
                        />
                        <CategoryDropDown />
                        {error ? (
                            <Text style={styles.error}>{error}</Text>
                        ) : null}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Button label="Create" onPress={async () => {
                            const success = await createDiscussion();
                            if (success) {
                                setIsCreateOpen(false);
                                onCreated();
                            }
                        }} />
                        <Button label="Cancel" onPress={() => {setIsCreateOpen(false);
                            setError('');
                        }} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
    backgroundColor: colors.background,
    padding: 10,
    borderRadius: 12,
    width: '85%',
    },
    buttonContainer: {
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        marginBottom: 8
    },
    title: {
        color: colors.white,
        fontSize: 18,
        marginBottom: 12,
        textAlign: 'center',
        fontFamily: 'Anton-Regular',
    },
    error: {
        color: 'red',
        fontSize: 13,
        textAlign: 'center',
        marginTop: 8,
    }
})