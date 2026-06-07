import {
    motion,
} from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";

function Contact() {

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
                            Contact
                        </p>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Connect with Us
                        </h1>

                        <p className="text-gray-200 max-w-3xl mx-auto text-lg leading-8">
                            We are here to help you find the perfect property and answer all your real estate queries.
                        </p>

                    </motion.div>

                </section>



                {/* CONTACT SECTION */}
                <section className="max-w-7xl mx-auto px-6 py-24">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* LEFT SIDE */}
                        <motion.div
                            initial={{ opacity: 0, x: -80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >

                            <p className="uppercase tracking-[4px] text-[#234C6A] font-semibold mb-3">
                                The Best Deals
                            </p>

                            <h2 className="text-4xl font-bold text-[#1B3C53] mb-8">
                                UR Consultancy Services
                            </h2>

                            <p className="text-gray-600 leading-8 text-lg mb-10">
                                UR Consultancy Services in Changanacherry, Kottayam is one of the leading businesses in the Estate Agents. We provide premium services for buying, selling, leasing, renting, and managing residential and commercial properties across Kochi and nearby locations.
                            </p>



                            {/* CONTACT INFO */}
                            <div className="space-y-8">

                                {/* ADDRESS */}
                                <div className="flex items-start gap-5">

                                    <div className="md:w-14 md:h-14 w-10 h-10 rounded-2xl bg-[#234C6A] text-white flex items-center justify-center text-xl shadow-lg">
                                        <FaMapMarkerAlt />
                                    </div>

                                    <div>

                                        <h3 className="text-2xl font-semibold text-[#1B3C53] mb-2">
                                            Address
                                        </h3>

                                        <p className="text-gray-600 leading-7">
                                            Chethipuzha, Changanacherry,<br /> Kottayam, Kerala 686104
                                        </p>

                                    </div>

                                </div>



                                {/* PHONE */}
                                <div className="flex items-start gap-5">

                                    <div className="md:w-14 md:h-14 w-10 h-10 rounded-2xl bg-[#234C6A] text-white flex items-center justify-center text-xl shadow-lg">
                                        <FaPhoneAlt />
                                    </div>

                                    <div>

                                        <h3 className="text-2xl font-semibold text-[#1B3C53] mb-2">
                                            Phone
                                        </h3>

                                        <p className="text-gray-600 text-lg">
                                            +91 8848385127
                                        </p>

                                    </div>

                                </div>



                                {/* EMAIL */}
                                <div className="flex items-start gap-5">

                                    <div className="md:w-14 md:h-14 w-10 h-10 rounded-2xl bg-[#456882] text-white flex items-center justify-center text-xl shadow-lg">
                                        <FaEnvelope />
                                    </div>

                                    <div>

                                        <h3 className="text-2xl font-semibold text-[#1B3C53] mb-2">
                                            Email
                                        </h3>

                                        <p className="text-gray-600 text-lg">
                                            Propertyp422@gmail.com
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </motion.div>



                        {/* RIGHT SIDE */}
                        <motion.div
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="bg-white p-10 rounded-3xl shadow-2xl"
                        >

                            <p className="uppercase tracking-[4px] text-[#234C6A] font-semibold mb-4">
                                Send Message
                            </p>

                            <h2 className="text-3xl font-bold text-[#1B3C53] mb-8">
                                Contact Form
                            </h2>



                            {/* FORM */}
                            <form className="space-y-6">

                                {/* NAME */}
                                <div>

                                    <label className="block text-[#1B3C53] font-semibold mb-3">
                                        Your Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="w-full p-4 border border-gray-300 rounded-2xl outline-none focus:border-[#234C6A] transition"
                                    />

                                </div>



                                {/* EMAIL */}
                                <div>

                                    <label className="block text-[#1B3C53] font-semibold mb-3">
                                        Your E-mail
                                    </label>

                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full p-4 border border-gray-300 rounded-2xl outline-none focus:border-[#234C6A] transition"
                                    />

                                </div>



                                {/* SUBJECT */}
                                <div>

                                    <label className="block text-[#1B3C53] font-semibold mb-3">
                                        Subject
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter subject"
                                        className="w-full p-4 border border-gray-300 rounded-2xl outline-none focus:border-[#234C6A] transition"
                                    />

                                </div>



                                {/* MESSAGE */}
                                <div>

                                    <label className="block text-[#1B3C53] font-semibold mb-3">
                                        Message
                                    </label>

                                    <textarea
                                        rows="6"
                                        placeholder="Write your message"
                                        className="w-full p-4 border border-gray-300 rounded-2xl outline-none resize-none focus:border-[#234C6A] transition"
                                    ></textarea>

                                </div>



                                {/* BUTTON */}
                                <button
                                    className="w-full bg-[#1B3C53] hover:bg-[#234C6A] text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl"
                                >
                                    Send Message
                                </button>

                            </form>

                        </motion.div>

                    </div>

                </section>

            </div>
            <Footer />

        </>


    );
}

export default Contact;