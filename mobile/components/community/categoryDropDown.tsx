import { Picker } from '@react-native-picker/picker';
import { categories } from '../../constants/categories';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';

export function CategoryDropDown() {
    const [selected, setSelected] = useState(categories[0]);
    return (
        <View>
            <Text style={styles.label}>Category</Text>
            <Picker
                selectedValue={selected}
                onValueChange={(itemValue) => setSelected(itemValue)}
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