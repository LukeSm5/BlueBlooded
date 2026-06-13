import { categories } from '../../constants/categories';
import { Modal, View, Text, StyleSheet} from 'react-native';
import Button from '../shared/Button';
import { colors } from '../../constants/colors';
import { useCommunityContext } from '../../context/communityContext';

export function CategoryFilter() {
    const { isFilterOpen, setIsFilterOpen, selectedCategory, toggleCategory, clearFilters } = useCommunityContext();

    return (
        <View>
            <Button
                icon="options-outline"
                size="sm"
                onPress={() => setIsFilterOpen(true)}
            />
            <Modal
                visible={isFilterOpen}
                transparent
                animationType="slide"
                onRequestClose={() => setIsFilterOpen(false)}
                >
                <View style={styles.backdrop}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>Filter by Category</Text>
                        <View style={styles.categoryContainer}>
                            {categories.map((category) => {
                                const isSelected = selectedCategory.includes(category);

                                return (
                                    <Button
                                        key={category}
                                        label={category}
                                        onPress={() => toggleCategory(category)}
                                        style = {isSelected ? styles.selectedButton : undefined}
                                    />
                                );
                            })}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <Button label="Clear Filters" onPress={clearFilters} size='sm' />
                            <Button label="Apply" onPress={() => setIsFilterOpen(false)} size='sm' />
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
  title: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'Anton-Regular',
    color: colors.white,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 4,
  },
  selectedButton: {
    backgroundColor: '#6b9fd4',
  },
  selectedText: {
    color: 'white',
  },
});