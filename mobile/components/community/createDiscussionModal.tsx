import { useCommunity } from '../../hooks/useCommunity';
import { Modal, View, Text, StyleSheet } from 'react-native';
import TextInput from '../shared/TextInput';
import { useState } from 'react';
import Button from '../shared/Button';
import { colors } from '../../constants/colors';
import { CategoryDropDown } from './categoryDropDown';

export function CreateDiscussionModal() {
    const { isCreateOpen, setIsCreateOpen } = useCommunity();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

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
                        <View style={styles.title}>
                            <Text>Create Discussion Post</Text>
                        </View>
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
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Button label="Create" onPress={() => {
                            // Handle create discussion logic here
                            setIsCreateOpen(false);
                        }} />
                        <Button label="Cancel" onPress={() => setIsCreateOpen(false)} />
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
    padding: 20,
    borderRadius: 12,
    width: '85%',
    },
    buttonContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    title: {
        color: colors.white,
        fontSize: 18,
        marginBottom: 12,
        textAlign: 'center',
    }
})