import { X } from "lucide-react";
import Container from "../Container";
import logo from "/logo-2.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#F7F6F2]">
      <Container>
        <footer className="footer sm:footer-horizontal text-base-content py-10">
          <div className="">
            <div className="flex items-center">
              <img src={logo} alt="logo" width="40" height="80" />
              <h2 className="ml-2 font-semibold text-xl">
                Life<span className="text-[#F4A031]">Lessons</span>
              </h2>
            </div>
            <p className="w-75">
              Share and discover life's most valuable lessons. Learn from
              experiences, grow together, and inspire others on their journey.
            </p>

            {/* social icons */}
            <div className="">
              <nav className="flex gap-4 ">
                <a
                  href="https://www.facebook.com/sobus.jaman.56"
                  className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition"
                >
                  <FaFacebookF className="text-white" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition"
                >
                  <X className="text-white" size={14} />
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition"
                >
                  <FaInstagram className="text-white" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ohiduz-zaman"
                  className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition"
                >
                  <FaLinkedinIn className="text-white" />
                </a>
              </nav>
            </div>
          </div>
          <nav>
            <h6 className="footer-title">Platform</h6>
            <a className="link link-hover">Explore Lessons</a>
            <a className="link link-hover">Add a Lesson</a>
            <a className="link link-hover">Pricing</a>
            <a className="link link-hover">Premium</a>
          </nav>
          <nav>
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Blog</a>
            <a className="link link-hover">Careers</a>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Privacy Policy</a>
            <a className="link link-hover">Terms of Service</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </footer>
      </Container>
      <hr className="text-gray-300" />
      <Container>
        <div className=" text-gray-800 flex justify-between py-10">
          <div className="text-sm text-gray-400">
            © 2025 LifeLessons. All rights reserved.
          </div>
          <span className="text-sm text-gray-400">
            Made with ❤️ for lifelong learners
          </span>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
