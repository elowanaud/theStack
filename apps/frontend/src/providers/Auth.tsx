"use client";

import type { useApi } from "@/lib/api/client";
import type { InferResponseType } from "@tuyau/client";
import {
	type PropsWithChildren,
	createContext,
	useContext,
	useState,
} from "react";
import { type StoreApi, createStore, useStore } from "zustand";

type States = {
	currentUser: InferResponseType<typeof useApi.auth.me.$get> | null;
	isAuthenticated: boolean;
};

type Actions = {
	setCurrentUser: (newUser: States["currentUser"]) => void;
	removeCurrentUser: () => void;
};

type AuthStore = States & Actions;

const AuthContext = createContext<StoreApi<AuthStore> | undefined>(undefined);

export type AuthProviderProps = PropsWithChildren & {
	currentUser: AuthStore["currentUser"];
};

export function AuthProvider({ children, currentUser }: AuthProviderProps) {
	const [store] = useState(() =>
		createStore<AuthStore>((set) => ({
			currentUser: currentUser,
			isAuthenticated: !!currentUser,
			setCurrentUser: (newUser) =>
				set({ currentUser: newUser, isAuthenticated: !!newUser }),
			removeCurrentUser: () =>
				set({ currentUser: null, isAuthenticated: false }),
		})),
	);

	return <AuthContext value={store}>{children}</AuthContext>;
}

export function useAuth<T>(selector: (state: AuthStore) => T) {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within a AuthProvider");
	}

	return useStore(context, selector);
}
