import { Button } from "antd";
import {
    FaFacebookF,
    FaGithub,
    FaInstagram,
    FaLocationDot,
    FaPhone,
    FaRegEnvelope,
    FaTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "/Logo.png";

const Footer = () => {
    return (
        <div className="bg-gradient-to-r from-[#090913]  to-[#0d0d15] text-white border-t border-white/10">
            <div className="max-w-[1240px] xl:w-full flex flex-wrap justify-between items-start mx-5 xl:mx-auto py-8 gap-2">
                <div className="mb-5">
                    <div className="w-14 mb-3">
                        <img src={logo} alt="" className="w-full" />
                    </div>
                    <p className="max-w-[480px] md:w-full text-sm leading-5 mb-3">
                        Lite Edu is a trusted and reliable institution for
                        job aspirants including BCS, Bank & Non cadre
                        candidates. One of our goals is to ensure proper
                        syllabus-based guidance and quality teaching for the
                        preparation of exams for millions of highly educated job
                        seekers in the country through online and offline
                        platform.
                    </p>
                    <div className="flex items-center gap-2">
                        <a
                            href={"https://www.facebook.com/oditicareer.bcs"}
                            target="_blank"
                        >
                            <Button
                                shape="circle"
                                icon={<FaFacebookF className="text-white" />}
                                className="bg-transparent border border-white"
                            />
                        </a>
                        <Link to={"/"}>
                            <Button
                                shape="circle"
                                icon={<FaInstagram className="text-white" />}
                                className="bg-transparent border border-white"
                            />
                        </Link>
                        <Link to={"/"}>
                            <Button
                                shape="circle"
                                icon={<FaTwitter className="text-white" />}
                                className="bg-transparent border border-white"
                            />
                        </Link>
                        <Link to={"/"}>
                            <Button
                                shape="circle"
                                icon={<FaGithub className="text-white" />}
                                className="bg-transparent border border-white"
                            />
                        </Link>
                    </div>
                </div>

                <div className="mb-5">
                    <h3 className="font-semibold underline mb-3">About us</h3>
                    <ul className="text-sm leading-7">
                        <li className="hover:underline">
                            <Link to={"/about-us"}>About us</Link>
                        </li>
                        <li className="hover:underline">
                            <Link to={"/terms-conditions"}>
                                Terms & Conditions
                            </Link>
                        </li>
                        <li className="hover:underline">
                            <Link to={"/privacy-policy"}>Privacy Policy</Link>
                        </li>
                        <li className="hover:underline">
                            <Link to={"/refund-policy"}>Refund Policy</Link>
                        </li>
                    </ul>
                </div>

                <div className="mb-5">
                    <h3 className="font-semibold underline mb-3">Quick Links</h3>
                    <ul className="text-sm leading-7">
                        <li className="hover:underline">
                            <Link to={"/courses"}>Our Course</Link>
                        </li>
                        <li className="hover:underline">
                            <Link to={"/shop"}>Book Shop</Link>
                        </li>
                        <li className="hover:underline">
                            <Link to={"/free-courses"}>Free Class</Link>
                        </li>
                        <li className="hover:underline">
                            <Link to={"/branches"}>Our Branches</Link>
                        </li>
                    </ul>
                </div>

                <div className="mb-5">
                    <h3 className="font-semibold underline mb-3">Contact</h3>
                    <ul className="text-sm leading-7">
                        <li className="flex items-center gap-2">
                            <FaPhone />
                            <a href="tel:+8801904433500">
                                +8801799-056414, +8801799-056414
                            </a>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaRegEnvelope />
                            <a href="mailto:oditicareer.bcs@gmail.com">
                                liteedu@gmail.com
                            </a>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaLocationDot />
                            <a href="https://maps.app.goo.gl/w5T28R1ZBv8Ubbcy7">
                                Address : 5/8, Block#D
                                Lalmatia, Dhaka-1207
                                Bangladesh
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="max-w-[1240px] xl:w-full border-b border-white flex flex-wrap justify-center items-center text-sm text-center mx-5 2xl:mx-auto py-8 gap-2">
                <img src={"/SSL.webp"} alt="" />
            </div>
            <div className="max-w-7xl 2xl:w-full flex flex-wrap justify-center items-center text-sm text-center mx-5 2xl:mx-auto py-8 gap-2">
                <p>
                    &copy; Copyright {new Date().getFullYear()}, All Rights
                    Reserved by{" "}
                    <a
                        href={"https://www.facebook.com/oditicareer.bcs"}
                        target="_blank"
                        className="text-primary"
                    >
                        Lite edu
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Footer;
