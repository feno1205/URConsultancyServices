import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaWhatsapp,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getProject } from "../services/projectApi";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80";

function ProjectDetail() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);

        const res = await getProject(id);

        setProject(res.data?.project);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading Project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Project Not Found
      </div>
    );
  }

  const heroImage =
    project.images?.[0] || FALLBACK_IMAGE;

  const whatsappMessage = encodeURIComponent(
    `Hello UR Consultancy Services, I am interested in ${project.title}`
  );

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[85vh] overflow-hidden">
        <img
          src={heroImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-sky-950/90 via-sky-950/70 to-black/40" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-3xl text-white">
              <p className="uppercase tracking-[4px] text-[#FFD700] text-sm">
                Premium Property
              </p>

              <h1 className="text-5xl md:text-7xl font-bold mt-4 leading-tight">
                {project.title}
              </h1>

              <div className="flex items-center gap-2 mt-5 text-lg">
                <FaMapMarkerAlt className="text-[#FFD700]" />
                <span>{project.location}</span>
              </div>

              {project.price && (
                <h2 className="text-3xl md:text-4xl font-bold mt-6 text-[#FFD700]">
                  ₹ {project.price}
                </h2>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTY DETAILS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-3xl p-8 text-center shadow">
              <FaRulerCombined className="mx-auto text-4xl text-[#FFD700]" />

              <p className="mt-4 text-gray-500">
                Area
              </p>

              <h3 className="text-2xl font-bold text-sky-950">
                {project.area || "N/A"}
              </h3>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 text-center shadow">
              <FaBed className="mx-auto text-4xl text-[#FFD700]" />

              <p className="mt-4 text-gray-500">
                Bedrooms
              </p>

              <h3 className="text-2xl font-bold text-sky-950">
                {project.rooms || "N/A"}
              </h3>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 text-center shadow">
              <FaBath className="mx-auto text-4xl text-[#FFD700]" />

              <p className="mt-4 text-gray-500">
                Bathrooms
              </p>

              <h3 className="text-2xl font-bold text-sky-950">
                {project.bathrooms || "N/A"}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-sky-950">
            Project Overview
          </h2>

          <p className="mt-10 text-lg leading-9 text-gray-600">
            {project.description}
          </p>
        </div>
      </section>

      {/* IMAGE GALLERY */}
      {project.images?.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-sky-950 mb-14">
              Project Gallery
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {project.images.map(
                (image, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-3xl shadow-xl group"
                  >
                    <img
                      src={image}
                      alt={`${project.title} ${index + 1}`}
                      loading="lazy"
                      className="w-full h-[300px] object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* VIDEOS */}
      {project.videos?.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-sky-950 mb-14">
              Project Videos
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {project.videos.map(
                (video, index) => (
                  <div
                    key={index}
                    className="rounded-3xl overflow-hidden shadow-xl bg-black"
                  >
                    <video
                      controls
                      preload="metadata"
                      className="w-full h-[400px] object-cover"
                    >
                      <source
                        src={video}
                        type="video/mp4"
                      />

                      Your browser does not support
                      videos.
                    </video>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* AMENITIES */}
      {project.amenities?.length > 0 && (
        <section className="py-20 bg-sky-950 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">
              Amenities
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
              {project.amenities.map(
                (amenity, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl flex items-center gap-3"
                  >
                    <FaCheckCircle className="text-[#FFD700]" />
                    <span>{amenity}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* LOCATION ADVANTAGES */}
      {project.locationAdvantages?.length >
        0 && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-sky-950 mb-14">
              Location Advantages
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {project.locationAdvantages.map(
                (item, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 rounded-2xl p-6 flex items-center gap-3 shadow"
                  >
                    <FaCheckCircle className="text-[#FFD700]" />
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-sky-950 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            Interested in this Property?
          </h2>

          <p className="mt-6 text-lg text-gray-300">
            Contact our consultants for
            pricing details, site visits and
            booking assistance.
          </p>

          <a
            href={`https://wa.me/919847232890?text=${encodeURIComponent(
                          `Hello UR Consultancy Services, I am interested in:\n\nProject: ${project.title}\nLocation: ${project.location}`
                        )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-8 bg-[#25D366] text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition"
          >
            <FaWhatsapp size={22} />
            Enquire
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ProjectDetail;