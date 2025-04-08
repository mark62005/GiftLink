import { ReactNode } from "react";
import StoreProvider from "@/state/redux";
import AuthContextProvider from "@/contexts/AuthContext";

function Providers({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<StoreProvider>
			<AuthContextProvider>{children}</AuthContextProvider>
		</StoreProvider>
	);
}
export default Providers;
