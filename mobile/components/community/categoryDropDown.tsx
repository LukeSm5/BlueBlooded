import { Picker } from '@react-native-picker/picker';
import { categories } from '../../constants/categories';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { useCommunityContext } from '../../context/communityContext';

export function CategoryDropDown() {
    const { createCategory, setCreateCategory } = useCommunityContext();
    return (
        <View>
            <Text style={styles.label}>Category</Text>
            <Picker
                selectedValue={createCategory}
                onValueChange={(itemValue) => setCreateCategory(itemValue)} 
                >
                {categories.map((category) => (
                    <Picker.Item key={category} label={category} value={category} />
                ))}
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        marginBottom: 12,
        fontFamily: 'Inter-Regular',
        color: colors.white,
    }
})