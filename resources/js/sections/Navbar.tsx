import React from 'react';

const navbarItems = ['Home', 'Webshop', 'Cart', 'Contact'];

interface NavItemsProps {
    items: string[];
}

const NavItems: React.FC<NavItemsProps> = ({ items }) => {
    return (
        <nav className="rounded-xl bg-[#007cb0] p-4 shadow-md">
            <ul className="flex flex-wrap justify-center space-x-4 md:space-x-10">
                {items.map((item, index) => (
                    <li key={index}>
                        <a
                            href="#"
                            className="rounded-lg px-4 py-2 text-lg font-semibold text-white transition duration-300 hover:bg-white hover:text-[#007cb0] md:text-base"
                        >
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

const Navbar: React.FC = () => {
    return (
        <header className="w-full bg-white shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
                <a href="/" className="flex items-center space-x-2">
                    <img src="/assets/first_logo.jpeg" alt="Site Logo" className="h-10 w-auto rounded-md" />
                    <span className="text-xl font-bold text-[#007cb0]">BrandName</span>
                </a>
                <div className="hidden md:block">
                    <NavItems items={navbarItems} />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
