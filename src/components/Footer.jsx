import Rating from "../components/Rating";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-200" id="Footer">
            <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-8 py-4 lg:py-4">
                <div className="md:flex md:justify-between md:items-center">
                    <div className="mb-4 md:mb-2 flex justify-center md:justify-start">
                        <a href="#" className="flex items-center">
                            <img
                                src="/Logo.png"
                                alt="Logo Casofin"
                                className="h-12 w-12 sm:h-16 sm:w-16 rounded-full"
                            />
                            <span className="self-center text-xl sm:text-2xl font-semibold text-orange-500 ml-4">Casofin</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 text-center sm:text-left">
                        <div>
                            <h2 className="mb-3 text-sm font-semibold uppercase text-orange-500">Created By</h2>
                            <ul className="text-gray-400 font-medium">
                                <li>
                                    <a href="https://www.instagram.com/suryahipersomniaa" className="hover:text-orange-500">
                                        SURYA
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-3 text-sm font-semibold uppercase text-orange-500">Follow Us</h2>
                            <ul className="text-gray-400 font-medium">
                                <li>
                                    <a href="https://www.instagram.com/casoffin_/" className="hover:text-orange-500">
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.tiktok.com/@casoffin" className="hover:text-orange-500">
                                        Tiktok
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="hidden md:block">
                            <Rating />
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-4 md:hidden">
                        <Rating />
                    </div>
                </div>
                <hr className="my-4 border-orange-700" />
                <div className="sm:flex sm:items-center sm:justify-between text-center sm:text-left">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} Casofin | Di Kelola Oleh LearnWithSuryaa
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
