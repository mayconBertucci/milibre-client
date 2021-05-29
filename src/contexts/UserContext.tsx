import { createContext, ReactNode, useState } from 'react';

interface IUser {
    birthday: Date,
    contact_id: string,
    email: string,
    favorite_author: string,
    favorite_book: string,
    id: string,
    location: string,
    name: string,
    photo: string,
    points: number,
    user_note: 0,
    num_books: 0
}

interface IUserContextData {
    user: IUser,
    signIn: Function
}

interface IUserContextProps {
    children: ReactNode
}

export const UserContext = createContext({} as IUserContextData);

export function UserProvider({children}: IUserContextProps) {
    const [user, setUser] = useState<IUser>({
        birthday: new Date(),
        contact_id: '',
        email: '',
        favorite_author: '',
        favorite_book: '',
        id: '',
        location: '',
        name: '',
        photo: '',
        points: 0,
        user_note: 0,
        num_books: 0
    });
    
    const signIn = (responseUser: IUser) => {
        setUser(responseUser);
    }

    return (
        <UserContext.Provider value={{ user, signIn }} >
            {children} 
        </UserContext.Provider>
    );
}
