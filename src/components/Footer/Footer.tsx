function Footer() {
    function getCurrentYear(): number {
        return new Date().getFullYear();
    }

    return (
        <footer className="py-4 bg-black text-center text-white w-full">
            &copy; {getCurrentYear()} Wirdly. All rights reserved.
        </footer>
    );
}

export default Footer;
