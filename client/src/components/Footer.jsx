import { footerLinks, assets } from '../assets/assets';

const Footer = () => {
    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-accent-mauve/10">
            
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-accent-mauve/20 text-gray-600">

                {/* Logo & Description */}
                <div>
                    <img
                        className="w-34 md:w-32"
                        src={assets.logo}
                        alt="Stylic Logo"
                    />

                    <p className="max-w-[410px] mt-6">
                        Discover beautiful accessories designed to complement your
                        style. From everyday essentials to special occasions,
                        Stylic brings elegance to every moment.
                    </p>
                </div>

                {/* Footer Links */}
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">

                    {footerLinks.map((section, index) => (
                        <div key={index}>

                            <h3 className="font-semibold text-base text-text-dark md:mb-5 mb-2">
                                {section.title}
                            </h3>

                            <ul className="text-sm space-y-1">

                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a
                                            href={link.url}
                                            target={link.target}
                                            rel={
                                                link.target === "_blank"
                                                    ? "noopener noreferrer"
                                                    : undefined
                                            }
                                            className="hover:underline transition"
                                        >
                                            {link.text}
                                        </a>
                                    </li>
                                ))}

                            </ul>

                        </div>
                    ))}

                </div>
            </div>

            {/* Copyright */}
            <p className="py-4 text-center text-sm md:text-base text-gray-600/80">
                Copyright {new Date().getFullYear()} © Stylic All Right Reserved.
            </p>

        </div>
    );
};

export default Footer;