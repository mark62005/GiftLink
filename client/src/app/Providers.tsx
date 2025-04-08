import { ReactNode } from "react";
import StoreProvider from "@/state/redux";

function Providers({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return <StoreProvider>{children}</StoreProvider>;
}
export default Providers;
