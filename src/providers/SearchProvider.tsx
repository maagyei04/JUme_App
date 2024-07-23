import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useDebounce } from 'use-debounce';

type SearchContextType = {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    debouncedSearchTerm: string;
    isSearchFocused: boolean;
    setIsSearchFocused: (focused: boolean) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm, debouncedSearchTerm, isSearchFocused, setIsSearchFocused }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};