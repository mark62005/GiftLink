import { HEADER_HEIGHT } from "@/lib/constants";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Logo from "../Logo";
import Navbar from "./Navbar";

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
	return (
		<header>
			<MaxWidthWrapper>
				<div
					className="flex justify-between items-center w-full"
					style={{ minHeight: HEADER_HEIGHT }}
				>
					<Logo />

					{/* RIGHT SIDE */}
					<div className="flex justify-between items-center gap-2 md:gap-3">
						<Navbar navLinks={NAV_LINKS_CONFIG} />

						{/* TODO: Mobile nav menu */}
					</div>
				</div>
			</MaxWidthWrapper>
		</header>
	);
}
export default Header;
