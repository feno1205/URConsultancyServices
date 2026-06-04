import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaTimes,
    FaMapMarkerAlt,
    FaBed,
    FaBath,
    FaRulerCombined,
    FaImage,
    FaPlus,
    FaTrash,
} from "react-icons/fa";

export default function EditProjectModal({
    isOpen,
    onClose,
    onSubmit,
    project,
}) {
    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        location: "",
        area: "",
        rooms: "",
        bathrooms: "",
        price: "",
        amenities: [""],
        locationAdvantages: [""],
        images: [],
        videos: [],
    });

    useEffect(() => {
        if (project) {
            setProjectData({
                title: project.title || "",
                description: project.description || "",
                location: project.location || "",
                area: project.area || "",
                rooms: project.rooms || "",
                bathrooms: project.bathrooms || "",
                price: project.price || "",
                amenities:
                    project.amenities?.length > 0
                        ? project.amenities
                        : [""],
                locationAdvantages:
                    project.locationAdvantages?.length > 0
                        ? project.locationAdvantages
                        : [""],
                images: [],
                video: [],
            });
        }
    }, [project]);

    const handleChange = (e) => {
        setProjectData({
            ...projectData,
            [e.target.name]: e.target.value,
        });
    };

    const addAmenity = () => {
        setProjectData({
            ...projectData,
            amenities: [
                ...projectData.amenities,
                "",
            ],
        });
    };

    const updateAmenity = (
        index,
        value
    ) => {
        const updated = [
            ...projectData.amenities,
        ];

        updated[index] = value;

        setProjectData({
            ...projectData,
            amenities: updated,
        });
    };

    const removeAmenity = (index) => {
        const updated =
            projectData.amenities.filter(
                (_, i) => i !== index
            );

        setProjectData({
            ...projectData,
            amenities:
                updated.length > 0
                    ? updated
                    : [""],
        });
    };

    const addLocationAdvantage =
        () => {
            setProjectData({
                ...projectData,
                locationAdvantages: [
                    ...projectData.locationAdvantages,
                    "",
                ],
            });
        };

    const updateLocationAdvantage = (
        index,
        value
    ) => {
        const updated = [
            ...projectData.locationAdvantages,
        ];

        updated[index] = value;

        setProjectData({
            ...projectData,
            locationAdvantages: updated,
        });
    };

    const removeLocationAdvantage = (
        index
    ) => {
        const updated =
            projectData.locationAdvantages.filter(
                (_, i) => i !== index
            );

        setProjectData({
            ...projectData,
            locationAdvantages:
                updated.length > 0
                    ? updated
                    : [""],
        });
    };

    const handleSubmit = () => {
        onSubmit(projectData);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="
          fixed
          inset-0
          z-50
          bg-black/60
          backdrop-blur-sm
          flex
          items-center
          justify-center
          p-4
        "
            >
                <motion.div
                    initial={{
                        scale: 0.95,
                        opacity: 0,
                    }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                    }}
                    exit={{
                        scale: 0.95,
                        opacity: 0,
                    }}
                    className="
            w-full
            max-w-4xl
            bg-white
            rounded-3xl
            overflow-hidden
            shadow-2xl
            max-h-[90vh]
            overflow-y-auto
          "
                >
                    {/* Header */}

                    <div
                        className="
              bg-gradient-to-r
              from-sky-950
              via-[#234C6A]
              to-sky-800
              px-6
              py-5
              flex
              items-center
              justify-between
            "
                    >
                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                Edit Project
                            </h2>

                            <p className="text-white/70 text-sm">
                                Update project details
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="
                w-10
                h-10
                rounded-full
                bg-white/10
                text-white
                flex
                items-center
                justify-center
              "
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Body */}

                    <div className="p-6">

                        {/* Title */}

                        <div className="mb-4">
                            <label className="font-semibold text-sm">
                                Project Name
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={projectData.title}
                                onChange={handleChange}
                                className="w-full mt-2 p-3 border rounded-xl"
                            />
                        </div>

                        {/* Description */}

                        <div className="mb-4">
                            <label className="font-semibold text-sm">
                                Description
                            </label>

                            <textarea
                                rows="4"
                                name="description"
                                value={projectData.description}
                                onChange={handleChange}
                                className="w-full mt-2 p-3 border rounded-xl"
                            />
                        </div>

                        {/* Details */}

                        <div className="grid md:grid-cols-2 gap-4">

                            <div>
                                <label className="font-semibold text-sm">
                                    Location
                                </label>

                                <div className="relative mt-2">
                                    <FaMapMarkerAlt className="absolute left-3 top-4 text-[#FFD700]" />

                                    <input
                                        type="text"
                                        name="location"
                                        value={projectData.location}
                                        onChange={handleChange}
                                        className="w-full pl-10 p-3 border rounded-xl"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="font-semibold text-sm">
                                    Price
                                </label>

                                <input
                                    type="text"
                                    name="price"
                                    value={projectData.price}
                                    onChange={handleChange}
                                    className="w-full mt-2 p-3 border rounded-xl"
                                />
                            </div>

                            <div>
                                <label className="font-semibold text-sm">
                                    Area
                                </label>

                                <div className="relative mt-2">
                                    <FaRulerCombined className="absolute left-3 top-4 text-[#FFD700]" />

                                    <input
                                        type="text"
                                        name="area"
                                        value={projectData.area}
                                        onChange={handleChange}
                                        className="w-full pl-10 p-3 border rounded-xl"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="font-semibold text-sm">
                                    Rooms
                                </label>

                                <div className="relative mt-2">
                                    <FaBed className="absolute left-3 top-4 text-[#FFD700]" />

                                    <input
                                        type="number"
                                        name="rooms"
                                        value={projectData.rooms}
                                        onChange={handleChange}
                                        className="w-full pl-10 p-3 border rounded-xl"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="font-semibold text-sm">
                                    Bathrooms
                                </label>

                                <div className="relative mt-2">
                                    <FaBath className="absolute left-3 top-4 text-[#FFD700]" />

                                    <input
                                        type="number"
                                        name="bathrooms"
                                        value={projectData.bathrooms}
                                        onChange={handleChange}
                                        className="w-full pl-10 p-3 border rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}

                        <div className="mt-6">
                            <div className="flex justify-between mb-3">
                                <h3 className="font-semibold">
                                    Amenities
                                </h3>

                                <button
                                    type="button"
                                    onClick={addAmenity}
                                    className="text-[#FFD700]"
                                >
                                    <FaPlus />
                                </button>
                            </div>

                            {projectData.amenities.map(
                                (item, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-2 mb-2"
                                    >
                                        <input
                                            value={item}
                                            onChange={(e) =>
                                                updateAmenity(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            className="flex-1 p-3 border rounded-xl"
                                        />

                                        <button
                                            onClick={() =>
                                                removeAmenity(index)
                                            }
                                            className="text-red-500"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                )
                            )}
                        </div>

                        {/* Location Advantages */}

                        <div className="mt-6">
                            <div className="flex justify-between mb-3">
                                <h3 className="font-semibold">
                                    Location Advantages
                                </h3>

                                <button
                                    type="button"
                                    onClick={addLocationAdvantage}
                                    className="text-[#FFD700]"
                                >
                                    <FaPlus />
                                </button>
                            </div>

                            {projectData.locationAdvantages.map(
                                (item, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-2 mb-2"
                                    >
                                        <input
                                            value={item}
                                            onChange={(e) =>
                                                updateLocationAdvantage(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            className="flex-1 p-3 border rounded-xl"
                                        />

                                        <button
                                            onClick={() =>
                                                removeLocationAdvantage(
                                                    index
                                                )
                                            }
                                            className="text-red-500"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                )
                            )}
                        </div>

                        {/* Existing Images */}

                        {project?.images?.length > 0 && (
                            <div className="mt-6">
                                <h3 className="font-semibold mb-3">
                                    Current Images
                                </h3>

                                <div className="grid grid-cols-4 gap-3">
                                    {project.images.map(
                                        (img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                alt=""
                                                className="
                          h-24
                          w-full
                          object-cover
                          rounded-xl
                        "
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Upload New Images */}

                        <div className="mt-6">
                            <label className="font-semibold">
                                Upload New Images
                            </label>

                            <label
                                className="
                  mt-3
                  h-28
                  border-2
                  border-dashed
                  border-[#FFD700]
                  rounded-2xl
                  flex
                  flex-col
                  items-center
                  justify-center
                  cursor-pointer
                "
                            >
                                <FaImage className="text-2xl text-[#FFD700]" />

                                <span className="text-sm mt-2">
                                    Select Images
                                </span>

                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    hidden
                                    onChange={(e) =>
                                        setProjectData({
                                            ...projectData,
                                            images: Array.from(
                                                e.target.files
                                            ),
                                        })
                                    }
                                />
                                <input
                                    type="file"
                                    multiple
                                    accept="video/*"
                                    onChange={(e) =>
                                        setVideos(
                                            Array.from(e.target.files)
                                        )
                                    }
                                />
                            </label>

                            {projectData.images.length >
                                0 && (
                                    <div className="grid grid-cols-4 gap-3 mt-4">
                                        {projectData.images.map(
                                            (img, index) => (
                                                <img
                                                    key={index}
                                                    src={URL.createObjectURL(
                                                        img
                                                    )}
                                                    alt=""
                                                    className="
                          h-24
                          w-full
                          object-cover
                          rounded-xl
                        "
                                                />
                                            )
                                        )}
                                    </div>
                                )}
                        </div>

                        {/* Footer */}

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={onClose}
                                className="
                  px-5
                  py-3
                  border
                  rounded-xl
                "
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSubmit}
                                className="
                  bg-[#FFD700]
                  text-black
                  px-6
                  py-3
                  rounded-xl
                  font-semibold
                "
                            >
                                Update Project
                            </button>
                        </div>

                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}