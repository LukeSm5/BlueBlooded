import { useState } from 'react';
export function useCommunity() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

    function toggleCategory(category: string) {
        setSelectedCategory((prev) => {
            return prev.includes(category)
                ? prev.filter((cat) => cat !== category)
                : [...prev, category];
        });
    }

    function clearFilters() {
        setSelectedCategory([]);
    }
    return {
        isFilterOpen,
        setIsFilterOpen,
        selectedCategory,
        toggleCategory,
        clearFilters
    };
}