"use client";

import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from "react";

interface AuthContextType {
	isLoggedIn: boolean;
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
	username: string;
	setUsername: Dispatch<SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthContextProvider({ children }: Readonly<{ children: ReactNode }>) {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [username, setUsername] = useState<string>("");

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, setIsLoggedIn, username, setUsername }}
		>
			{children}
		</AuthContext.Provider>
	);
}
export default AuthContextProvider;

export function useAuthContext() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within a AuthContextProvider");
	}

	return context;
}
