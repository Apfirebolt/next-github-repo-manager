import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-carafe">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-sand text-2xl">Github Manager</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-white hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-white hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/github" className="text-white hover:text-gray-300">
                Github Users
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
