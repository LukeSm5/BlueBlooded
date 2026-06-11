import { createContext, useContext, ReactNode } from 'react';
import { useCommunity } from '../hooks/useCommunity';

const CommunityContext = createContext<ReturnType<typeof useCommunity> | null>(null);

export function CommunityProvider({ children }: { children: ReactNode }) {
    const community = useCommunity();
    return (
        <CommunityContext.Provider value={community}>
            {children}
        </CommunityContext.Provider>
    );
}

export function useCommunityContext() {
    const ctx = useContext(CommunityContext);
    if (!ctx) throw new Error('useCommunityContext must be used within CommunityProvider');
    return ctx;
}