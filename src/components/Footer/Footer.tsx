function Footer() {
    function getCurrentYear(): number {
        return new Date().getFullYear();
    }

    return (
        <footer className="py-4 bg-gray-100 text-center text-gray-500 w-full">
            &copy; {getCurrentYear()} Wirdly. All rights reserved.
        </footer>
    );
}

export default Footer;
