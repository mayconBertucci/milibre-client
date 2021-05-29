import { createContext, ReactNode, useState } from 'react';

interface contextProps {
    children: ReactNode
}

interface ISearchContextData {
    searchData: string,
    setSearch: Function
}

export const SearchDataContext = createContext({} as ISearchContextData);

export function SearchDataProvider({children}: contextProps) {
    const [searchData, setSearchData] = useState('');
    
    const setSearch = (data: string) => {
        setSearchData(data);
    }

    return (
        <SearchDataContext.Provider value={{ searchData, setSearch }} >
            {children} 
        </SearchDataContext.Provider>
    );
}
