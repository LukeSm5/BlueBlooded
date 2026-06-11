import { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useAuth } from './useAuth';
export function useCommunity() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);  
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const { user } = useAuth();


    async function createDiscussion() {
        const { data, error } = await supabase.from('threads').insert({

            user_id: user?.id,
            title: title.trim(),
            body: content.trim(),
            category: selectedCategory, 
            pinned: false,
            is_deleted: false,
        });

        if (error) {
            setError(error.message);
            return;
        }
        setError('');
    }

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
        clearFilters,
        isCreateOpen,
        setIsCreateOpen,
        createDiscussion,
        title,
        setTitle,
        content,
        setContent,
        error,
        setError
    };
}