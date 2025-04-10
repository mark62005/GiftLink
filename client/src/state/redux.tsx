"use client";

import { useRef } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import globalReducer from "@/state/slices/global";
import authReducer from "@/state/slices/authSlice";
import { baseApi } from "./apis/baseApi";

/* REDUX STORE */
const rootReducer = combineReducers({
	global: globalReducer,
	auth: authReducer,
	[baseApi.reducerPath]: baseApi.reducer,
});

export const makeStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(baseApi.middleware),
	});
};

/* REDUX TYPES */
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* PROVIDER */
export default function StoreProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const storeRef = useRef<AppStore | null>(null);
	if (!storeRef.current) {
		storeRef.current = makeStore();
		setupListeners(storeRef.current.dispatch);
	}
	return <Provider store={storeRef.current}>{children}</Provider>;
}
