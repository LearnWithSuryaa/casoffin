import Rating from "../components/Rating";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-200" id="Footer">
            <div className="mx-auto w-full max-w-screen-xl px-8 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="#" className="flex items-center">
                            <img
                                src="/Logo.png"
                                alt="Logo Casofin"
                                className="h-[4.5rem] w-[4.5rem] relative rounded-full"
                            />
                            <span className="self-center text-2xl font-semibold text-orange-500 ml-4">Casofin</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div>
                            <h2 className="mb-4 text-sm font-semibold uppercase text-orange-500">Created By</h2>
                            <ul className="text-gray-400 font-medium">
                                <li className="mb-2">
                                    <a href="https://www.instagram.com/suryahipersomniaa" className="hover:text-orange-500">
                                        SURYA
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-4 text-sm font-semibold uppercase text-orange-500">Follow Us</h2>
                            <ul className="text-gray-400 font-medium">
                                <li className="mb-2">
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
                    <div className="flex items-center justify-center mt-8 md:hidden">
                        <Rating />
                    </div>
                </div>
                <hr className="my-6 border-orange-700" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <p className="text-center text-sm text-gray-400 sm:text-left">
                        © {new Date().getFullYear()} Casofin | Di Kelola Oleh LearnWithSuryaa
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
