import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

import {
  FaBed,
  FaBath,
  FaCar,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaWhatsapp,
} from "react-icons/fa";

import { getProjects } from "../services/projectApi";

const slides = [
  {
    id: 1,
    title: "Find Your Dream Home",
    subtitle:
      "Explore premium villas & apartments in prime locations.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    button: "Explore Now",
    link: "/properties",
  },
  {
    id: 2,
    title: "Smart Property Investments",
    subtitle:
      "High-return properties carefully selected for you.",
    image:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
    button: "View Projects",
    link: "/projects",
  },
  {
    id: 3,
    title: "Your Journey Starts Here",
    subtitle:
      "Buy, sell, or rent with complete ease and trust.",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    button: "Get Started",
    link: "/contact",
  },
];

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [index, setIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const res = await getProjects();

      setProjects(res.data?.projects || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#E3E3E3]">
      <Navbar />

      {/* HERO SLIDER */}
      <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index].id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={slides[index].image}
              alt={slides[index].title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-sky-950/80 flex items-center justify-center px-4">
              <div className="text-center text-white max-w-2xl">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  {slides[index].title}
                </h1>

                <p className="text-lg mb-6">
                  {slides[index].subtitle}
                </p>

                <button
                  onClick={() =>
                    navigate(slides[index].link)
                  }
                  className="border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#1B3C53] px-6 py-3 rounded-lg font-semibold transition"
                >
                  {slides[index].button}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* DOTS */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition ${index === i ? "bg-white" : "bg-gray-400"
                }`}
            />
          ))}
        </div>
      </div>

      {/* PROJECTS SECTION */}
      <section className="bg-[#F8FAFC] py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <p className="uppercase tracking-[4px] text-[#234C6A] font-semibold mb-4">
            Luxury Living
          </p>

          <h2 className="text-5xl font-bold text-[#1B3C53] mb-6">
            Our Premium Projects
          </h2>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Explore our exclusive collection of premium apartments and luxury villas in Kerala.
          </p>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="text-center text-gray-500">
            Loading projects...
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid gap-10">
            {projects.map((project, index) => (
              <Link
                key={project._id}
                to={`/project/${project._id}`}
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                  }}
                  whileHover={{ y: -10, scale: 1.01 }}
                  viewport={{ once: true }}
                  className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
                >
                  <img
                    src={project.images?.[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-sky-950/90 via-sky-950/30 to-transparent" />

                  <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                    <h3 className="text-3xl font-bold mb-3">
                      {project.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-6">
                      <FaMapMarkerAlt className="text-[#FFD700]" />
                      <span>{project.location}</span>
                    </div>

                    {/* INFO GRID */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
                        <FaRulerCombined className="mx-auto text-[#FFD700] text-2xl mb-2" />
                        <p className="text-xs">Area</p>
                        <h4 className="font-semibold mt-2">
                          {project.area}
                        </h4>
                      </div>

                      <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
                        <FaBed className="mx-auto text-[#FFD700] text-2xl mb-2" />
                        <p className="text-xs">Rooms</p>
                        <h4 className="font-semibold mt-2">
                          {project.rooms}
                        </h4>
                      </div>

                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between mt-6">
                      <span className="text-[#FFD700] font-semibold">
                        View Project →
                      </span>

                      <button
                        href={`https://wa.me/919847232890?text=${encodeURIComponent(
                          `Hello UR Consultancy Services, I am interested in:\n\nProject: ${project.title}\nLocation: ${project.location}`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#25d36574] px-4 py-2 rounded-xl flex items-center gap-2 text-white font-semibold"
                      >
                        <FaWhatsapp />
                        Enquire
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

/* Small reusable component */
function Info({ icon, label, value }) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
      <div className="text-[#FFD700] text-2xl mb-2 mx-auto">
        {icon}
      </div>
      <p className="text-xs">{label}</p>
      <h4 className="font-semibold">{value}</h4>
    </div>
  );
}

export default Home;