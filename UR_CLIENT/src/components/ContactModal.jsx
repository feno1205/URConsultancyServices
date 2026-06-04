import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";
import API from "../services/api";

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const CONTACT_INFO = {
  phone: "+919847232890",
  whatsapp:
    "https://wa.me/919847232890?text=Hello%20UR%20Consultancy%20Services",
};

const inputClass =
  "w-full pl-10 p-3 text-sm bg-white border border-slate-200 rounded-2xl outline-none transition focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20";

function InputField({
  icon: Icon,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1B3C53]" />

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className={inputClass}
      />
    </div>
  );
}

export default function ContactModal({
  modalOpen,
  setModalOpen,
}) {
  const [formData, setFormData] =
    useState(INITIAL_FORM);

  const [loading, setLoading] =
    useState(false);

  const updateField = (
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const closeModal = () =>
    setModalOpen(false);

  const handleEnquiry = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } =
        await API.post(
          "/enquiry/create",
          formData
        );

      alert(
        data?.message ||
          "Enquiry submitted successfully"
      );

      setFormData(INITIAL_FORM);
      closeModal();
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1B3C53]/70 backdrop-blur-md px-4 py-6"
        >
          <motion.div
            initial={{
              scale: 0.9,
              opacity: 0,
              y: 40,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
              y: 40,
            }}
            transition={{
              duration: 0.3,
            }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
          >
            {/* Close Button */}

            <button
              onClick={closeModal}
              className="absolute top-5 right-5 z-20 text-white transition hover:rotate-90"
            >
              <FaTimes size={22} />
            </button>

            {/* Header */}

            <div className="relative overflow-hidden rounded-t-3xl">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B3C53] via-[#234C6A] to-[#1B3C53]" />

              <div className="relative p-6 text-center">
                <h2 className="text-2xl font-bold text-white">
                  Contact Property Expert
                </h2>

                <p className="mt-2 text-white/80 max-w-md mx-auto">
                  Premium apartments,
                  villas and investment
                  opportunities tailored
                  for you.
                </p>
              </div>
            </div>

            {/* Body */}

            <div className="p-4 md:p-6">
              {/* Quick Contact */}

              <div className="grid md:grid-cols-2 gap-4 mb-5">
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center justify-center gap-3 rounded-2xl bg-[#1B3C53] py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1"
                >
                  <FaPhoneAlt className="text-[#FFD700]" />
                  Call Now
                </a>

                <a
                  href={
                    CONTACT_INFO.whatsapp
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 rounded-2xl bg-[#1B3C53] py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1"
                >
                  <FaWhatsapp className="text-2xl text-green-500" />
                  WhatsApp
                </a>
              </div>

              {/* Form */}

              <div className="rounded-2xl border border-white/50 bg-white/70 p-4 backdrop-blur-md shadow-lg">
                <form
                  onSubmit={
                    handleEnquiry
                  }
                  className="space-y-4"
                >
                  <InputField
                    icon={FaUser}
                    name="name"
                    placeholder="Your Name"
                    value={
                      formData.name
                    }
                    onChange={(e) =>
                      updateField(
                        "name",
                        e.target.value
                      )
                    }
                  />

                  <InputField
                    icon={FaEnvelope}
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={
                      formData.email
                    }
                    onChange={(e) =>
                      updateField(
                        "email",
                        e.target.value
                      )
                    }
                  />

                  <InputField
                    icon={FaPhoneAlt}
                    name="phone"
                    placeholder="Phone Number"
                    value={
                      formData.phone
                    }
                    onChange={(e) =>
                      updateField(
                        "phone",
                        e.target.value
                      )
                    }
                  />

                  <textarea
                    rows={4}
                    name="message"
                    required
                    placeholder="Tell us about the property you are looking for..."
                    value={
                      formData.message
                    }
                    onChange={(e) =>
                      updateField(
                        "message",
                        e.target.value
                      )
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm outline-none resize-none transition focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20"
                  />

                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={
                        closeModal
                      }
                      className="rounded-2xl border-2 border-[#1B3C53] px-4 py-2.5 text-sm font-semibold text-[#1B3C53] transition hover:bg-[#1B3C53] hover:text-white"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={
                        loading
                      }
                      className="flex items-center justify-center gap-2 rounded-2xl bg-[#FFD700] px-5 py-2.5 text-sm font-bold text-[#1B3C53] transition hover:scale-105 disabled:opacity-50"
                    >
                      <FaPaperPlane />

                      {loading
                        ? "Submitting..."
                        : "Submit Enquiry"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}