import NavLink from "./NavLink";

interface NavbarProps {
	navLinks: NavLinkType[];
}

function Navbar({ navLinks }: NavbarProps) {
	return (
		<nav className="hidden justify-around items-center lg:flex">
			{navLinks.map((navLink: NavLinkType) => (
				<NavLink
					navLink={navLink}
					key={navLink.href}
				/>
			))}
		</nav>
	);
}
export default Navbar;
