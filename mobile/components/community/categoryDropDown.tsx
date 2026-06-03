import { Picker } from '@react-native-picker/picker';
import { categories } from '../../constants/categories';
import { useState } from 'react';

export function CategoryDropDown() {
    const [selected, setSelected] = useState(categories[0]);
    return (
        <Picker
            selectedValue={selected}
            onValueChange={(itemValue) => setSelected(itemValue)}
            >
            {categories.map((category) => (
                <Picker.Item key={category} label={category} value={category} />
            ))}
        </Picker>
    );
}