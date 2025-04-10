"use client";

import Link from "next/link";
import { useAppSelector } from "@/state/redux";
import { useDispatch } from "react-redux";
import { logout } from "@/state/slices/authSlice";
import { HEADER_HEIGHT } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Logo from "../Logo";
import Navbar from "./Navbar";
import NavLink from "./Navbar/NavLink";

const NAV_LINKS_CONFIG: NavLinkType[] = [
	{
		href: "/",
		label: "Home",
	},
	{
		href: "/gifts",
		label: "Gifts",
	},
];

function Header() {
	const dispatch = useDispatch();
	const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
	const user = useAppSelector((state) => state.auth.user);

	function handleSignOut() {
		dispatch(logout());
	}

	return (
		<header className="border-b-2 fixed top-0 left-0 right-0 z-2 bg-background">
			<MaxWidthWrapper>
				<div
					className="flex justify-between items-center w-full"
					style={{ minHeight: HEADER_HEIGHT }}
				>
					<Logo />

					{/* RIGHT SIDE */}
					<div className="flex justify-between items-center gap-2 md:gap-3">
						<Navbar navLinks={NAV_LINKS_CONFIG} />

						{!isLoggedIn ? (
							<>
								<Link href="/sign-in">
									<Button variant="secondary">Sign In</Button>
								</Link>

								<NavLink navLink={{ href: "/sign-up", label: "Register" }} />
							</>
						) : (
							<>
								<span className="">Hi, {user?.firstName}!</span>
								<Button
									variant="destructive"
									onClick={handleSignOut}
								>
									Sign Out
								</Button>
							</>
						)}

						{/* TODO: Mobile nav menu */}
					</div>
				</div>
			</MaxWidthWrapper>
		</header>
	);
}
export default Header;
