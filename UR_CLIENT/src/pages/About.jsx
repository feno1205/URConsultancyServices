import {
    motion,
} from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  FaBuilding,
  FaHandshake,
  FaHome,
  FaSearchLocation,
  FaChartLine,
  FaTags,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function About() {

    const services = [

        {
            icon:<FaBuilding/>,
            title: "Consulting",
            description: "Provide clients with assistance throughout the purchasing or selling process in order to help them achieve their goals.",
        },

        {
            icon:<FaHandshake/>,
            title: "Real Estate Sales",
            description: "Legally binding agreement between two parties concerning the terms of purchase or transfer of real property.",
        },

        {
            icon:<FaHome/>,
            title: "Renting",
            description: "Becomes an alternate revenue pool for idle inventory vs. overly depending on a slowing retailing business environment.",
        },

        {
            icon:<FaSearchLocation/>,
            title: "Home Inspection",
            description: "Identify any type of safety risk associated with the building and offer confirmation regarding their livability status.",
        },

        {
            icon:<FaChartLine/>,
            title: "Evaluation",
            description: "Determine the value of a particular property through professional market analysis and valuation methods.",
        },

        {
            icon:<FaTags/>,
            title: "Price Consulting",
            description: "Assist buyers and sellers in negotiations, transactions, and getting the best property deals.",
        },

    ];


    return (
        <>
            <Navbar />  
            <div className="bg-[#F8FAFC] min-h-screen">


                {/* HERO SECTION */}
                <section className="relative h-100 flex items-center justify-center bg-[#1B3C53] overflow-hidden">

                    <div className="absolute inset-0 bg-[#1B3C53]/40"></div>

                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 text-center px-6"
                    >

                        <p className="uppercase tracking-[5px] text-[#FFD700] mb-4">
                            About us
                        </p>

                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            What We Do
                        </h1>

                        <p className="text-gray-200 max-w-3xl mx-auto text-lg leading-8">
                            Your trusted real estate partner in Kottayam property management services.
                        </p>

                    </motion.div>

                </section>



                {/* WHO WE ARE */}
                <section className="max-w-7xl mx-auto px-6 py-24">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* LEFT */}
                        <motion.div
                            initial={{ opacity: 0, x: -80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >

                            <p className="uppercase tracking-[4px] text-[#234C6A] font-semibold mb-3">
                                Who We Are
                            </p>

                            <h2 className="text-4xl font-bold text-[#1B3C53] mb-8">
                                UR Consultancy Services
                            </h2>

                            <p className="text-gray-600 leading-8 text-lg mb-6">
                                UR Consultancy Services in Changanacherry, Kottayam is one of the leading businesses in the Estate Agents.
                             </p>

                            <p className="text-gray-600 leading-8 text-lg mb-6">
                                One of the leading Real Estate Agent and Property Dealer in Kottayam for buying, selling, and renting all types of properties.
                            </p>

                            <p className="text-gray-600 leading-8 text-lg mb-6">
                                We deal with residential and commercial land, buildings, office spaces, houses, villas, and agricultural lands.
                            </p>

                            <p className="text-gray-600 leading-8 text-lg mb-6">
                                Our services are available across Kottayam, Changanacherry and nearby areas.
                            </p>

                            <p className="text-gray-600 leading-8 text-lg mb-6">
                                The real estate market of Changanacherry shows positivity with increasing demand from buyers and supply from developers.
                            </p>

                            <p className="text-gray-600 leading-8 text-lg">
                                Our company has earned a reputation as a quality builder that completes projects within the promised time schedule.
                            </p>

                        </motion.div>



                        {/* RIGHT */}
                        <motion.div
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >

                            <img
                                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop"
                                alt="About"
                                className="rounded-3xl shadow-2xl h-150 object-cover"
                            />

                            {/* <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl">

                                <h3 className="text-5xl font-bold text-[#1B3C53]">
                                    10+
                                </h3>

                                <p className="text-gray-500 mt-2">
                                    Years Experience
                                </p>

                            </div> */}

                        </motion.div>

                    </div>

                </section>



                {/* SERVICES */}
                <section className="bg-white py-24">

                    <div className="max-w-7xl mx-auto px-6">

                        <div className="text-center mb-20">

                            <h2 className="text-4xl font-bold text-[#1B3C53] mb-6">
                                Our Services
                            </h2>

                            <p className="text-gray-600 max-w-3xl mx-auto leading-8">
                                We provide premium real estate services designed to help clients buy, sell, rent, and manage properties with complete confidence.
                            </p>

                        </div>



                        {/* SERVICE CARDS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                            {
                                services.map((service, index) => (

                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 60 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ y: -10 }}
                                        className="bg-[#F8FAFC] p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                                    >

                                        <div className="w-16 h-16 rounded-2xl bg-[#1B3C53] text-white flex items-center justify-center text-2xl mb-6">
                                            {service.icon}
                                        </div>

                                        <h3 className="text-2xl font-bold text-[#1B3C53] mb-4">
                                            {service.title}
                                        </h3>

                                        <p className="text-gray-600 leading-8">
                                            {service.description}
                                        </p>

                                    </motion.div>
                                ))
                            }

                        </div>

                    </div>

                </section>



                {/* CTA */}
                <section className="py-24 bg-[#1B3C53]">

                    <div className="max-w-5xl mx-auto text-center px-6">

                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="text-4xl font-bold text-white mb-8"
                        >
                            Looking For Your Dream Property?
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-gray-300 text-lg leading-8 mb-10"
                        >
                            Contact UR Consultancy Services today and let us help you find the perfect property in Kottayam and surrounding areas.
                        </motion.p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="bg-[#FFD700] hover:bg-yellow-400 text-[#1B3C53] px-10 py-4 rounded-2xl font-bold text-lg transition"
                        >
                            <Link to="/contact">Contact Us</Link>
                        </motion.button>

                    </div>

                </section>


                <Footer />

            </div>

        </>


    );
}

export default About;