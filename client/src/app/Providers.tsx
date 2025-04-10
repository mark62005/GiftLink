"use client";

import { ReactNode, useEffect } from "react";
import StoreProvider, { useAppDispatch } from "@/state/redux";
import { fetchAuthFromStorage } from "@/state/slices/authSlice";

function HydrateAuth() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (typeof window !== "undefined") {
			dispatch(fetchAuthFromStorage());
		}
	}, [dispatch]);

	return null;
}

function Providers({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<StoreProvider>
			<HydrateAuth />
			{children}
		</StoreProvider>
	);
}
export default Providers;
