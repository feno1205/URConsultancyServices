import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const socialLinks = [
  {
    icon: FaInstagram,
    url: "https://instagram.com",
  },
  {
    icon: FaFacebookF,
    url: "https://facebook.com",
  },
  {
    icon: MdEmail,
    url: "mailto:info@urconsultancyservices.com",
  },
  {
    icon: FaWhatsapp,
    url: "https://wa.me/919847232890?text=Hello%20UR%20Consultancy%20Services",
  },
];

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Listings", path: "/listings" },
  { name: "Featured", path: "/featured" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1B3C53] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
          }}
          className="flex flex-col items-center text-center"
        >
          {/* Logo */}

          <img
            src="/src/assets/img/UR_Logo_Transparent.png"
            alt="UR Consultancy Services"
            className="h-16 mb-8"
          />

          {/* Address */}

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">
              Connect With Us
            </h3>

            <div className="flex items-center justify-center gap-2 mb-3">
              <FaMapMarkerAlt className="text-[#FFD700]" />
              <span>Location</span>
            </div>

            <p className="text-sm text-white/80 leading-7">
              Chethipuzha
              <br />
              Changanacherry
              <br />
              Kottayam, Kerala, India
            </p>
          </div>

          {/* Social Links */}

          <div className="flex gap-4 mb-8">
            {socialLinks.map(
              (
                {
                  icon: Icon,
                  url,
                },
                index
              ) => (
                <motion.a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.15,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="bg-white text-[#1B3C53] p-3 rounded-full shadow-md"
                >
                  <Icon size={18} />
                </motion.a>
              )
            )}
          </div>

          {/* Navigation */}

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Useful Links
            </h3>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {navLinks.map(
                (link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="transition duration-300 hover:text-[#FFD700]"
                  >
                    {link.name}
                  </Link>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}

      <div className="border-t border-white/10 py-4 text-center text-sm text-white/70">
        © {new Date().getFullYear()} UR Consultancy Services®. All Rights Reserved.
      </div>
    </footer>
  );
}