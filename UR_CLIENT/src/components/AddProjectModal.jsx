import { useState } from "react";
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

export default function AddProjectModal({
    isOpen,
    onClose,
    onSubmit,
}) {
    const [projectData, setProjectData] =
        useState({
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

    const handleChange = (e) => {
        setProjectData({
            ...projectData,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleImages = (e) => {
        const files = Array.from(
            e.target.files
        );

        setProjectData({
            ...projectData,
            images: files,
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

    const removeAmenity = (
        index
    ) => {
        const updated =
            projectData.amenities.filter(
                (_, i) => i !== index
            );

        setProjectData({
            ...projectData,
            amenities:
                updated.length
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

    const updateLocationAdvantage =
        (index, value) => {
            const updated = [
                ...projectData.locationAdvantages,
            ];

            updated[index] = value;

            setProjectData({
                ...projectData,
                locationAdvantages:
                    updated,
            });
        };

    const removeLocationAdvantage =
        (index) => {
            const updated =
                projectData.locationAdvantages.filter(
                    (_, i) => i !== index
                );

            setProjectData({
                ...projectData,
                locationAdvantages:
                    updated.length
                        ? updated
                        : [""],
            });
        };

    const handleSubmit = () => {
        onSubmit(projectData);

        setProjectData({
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
        });

        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
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
              max-w-3xl
              bg-white
              rounded-3xl
              overflow-hidden
              shadow-[0_25px_80px_rgba(0,0,0,0.25)]
              max-h-[90vh]
              overflow-y-auto
            "
                    >
                        {/* Header */}

                        <div
                            className="
                bg-linear-to-r
                from-sky-950
                via-[#234C6A]
                to-sky-800
                px-5
                py-4
                flex
                items-center
                justify-between
              "
                        >
                            <div>
                                <h2
                                    className="
                    text-xl
                    font-bold
                    text-white
                  "
                                >
                                    Add New Project
                                </h2>

                                <p
                                    className="
                    text-white/70
                    text-xs
                  "
                                >
                                    Create a premium
                                    project listing
                                </p>
                            </div>

                            <button
                                onClick={onClose}
                                className="
                  w-8
                  h-8
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

                        <div className="p-5">

                            {/* Title */}

                            <div className="mb-3">
                                <label
                                    className="
                    text-xs
                    font-semibold
                    text-slate-700
                  "
                                >
                                    Project Name
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={
                                        projectData.title
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="
                    w-full
                    mt-1
                    px-3
                    py-2
                    text-sm
                    border
                    rounded-xl
                    focus:ring-1
                    outline-none
                  "
                                />
                            </div>

                            {/* Description */}

                            <div className="mb-3">
                                <label
                                    className="
                    text-xs
                    font-semibold
                    text-slate-700
                  "
                                >
                                    Description
                                </label>

                                <textarea
                                    rows="3"
                                    name="description"
                                    value={
                                        projectData.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="
                    w-full
                    mt-1
                    px-3
                    py-2
                    text-sm
                    border
                    rounded-xl
                    resize-none
                  "
                                />
                            </div>

                            {/* Details */}

                            <div
                                className="
                  grid
                  grid-cols-2
                  gap-3
                "
                            >
                                <div>
                                    <label
                                        className="
                      text-xs
                      font-semibold
                    "
                                    >
                                        Location
                                    </label>

                                    <div className="relative mt-1">
                                        <FaMapMarkerAlt
                                            className="
                        absolute
                        left-3
                        top-3
                        text-[#FFD700]
                        text-xs
                      "
                                        />

                                        <input
                                            type="text"
                                            name="location"
                                            value={
                                                projectData.location
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            className="
                        w-full
                        pl-8
                        py-2
                        text-sm
                        border
                        rounded-xl
                      "
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        className="
                      text-xs
                      font-semibold
                    "
                                    >
                                        Price
                                    </label>

                                    <input
                                        type="text"
                                        name="price"
                                        value={
                                            projectData.price
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="
                      w-full
                      mt-1
                      px-3
                      py-2
                      text-sm
                      border
                      rounded-xl
                    "
                                    />
                                </div>

                                <div>
                                    <label
                                        className="
                      text-xs
                      font-semibold
                    "
                                    >
                                        Area
                                    </label>

                                    <div className="relative mt-1">
                                        <FaRulerCombined
                                            className="
                        absolute
                        left-3
                        top-3
                        text-[#FFD700]
                        text-xs
                      "
                                        />

                                        <input
                                            type="text"
                                            name="area"
                                            value={
                                                projectData.area
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            className="
                        w-full
                        pl-8
                        py-2
                        text-sm
                        border
                        rounded-xl
                      "
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        className="
                      text-xs
                      font-semibold
                    "
                                    >
                                        Rooms
                                    </label>

                                    <div className="relative mt-1">
                                        <FaBed
                                            className="
                        absolute
                        left-3
                        top-3
                        text-[#FFD700]
                        text-xs
                      "
                                        />

                                        <input
                                            type="text"
                                            name="rooms"
                                            value={
                                                projectData.rooms
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            className="
                        w-full
                        pl-8
                        py-2
                        text-sm
                        border
                        rounded-xl
                      "
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        className="
                      text-xs
                      font-semibold
                    "
                                    >
                                        Bathrooms
                                    </label>

                                    <div className="relative mt-1">
                                        <FaBath
                                            className="
                        absolute
                        left-3
                        top-3
                        text-[#FFD700]
                        text-xs
                      "
                                        />

                                        <input
                                            type="text"
                                            name="bathrooms"
                                            value={
                                                projectData.bathrooms
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            className="
                        w-full
                        pl-8
                        py-2
                        text-sm
                        border
                        rounded-xl
                      "
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Amenities */}

                            <div className="mt-5">
                                <div
                                    className="
                    flex
                    justify-between
                    items-center
                    mb-2
                  "
                                >
                                    <h3
                                        className="
                      text-sm
                      font-semibold
                    "
                                    >
                                        Amenities
                                    </h3>

                                    <button
                                        type="button"
                                        onClick={
                                            addAmenity
                                        }
                                        className="
                      text-[#ffd900]
                      border border-[#ffd900]
                      px-3
                      py-1
                      rounded-lg
                      text-xs
                      flex
                      items-center
                      gap-1
                    "
                                    >
                                        <FaPlus />
                                        Add
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    {projectData.amenities.map(
                                        (
                                            amenity,
                                            index
                                        ) => (
                                            <div
                                                key={index}
                                                className="
                          flex
                          gap-2
                        "
                                            >
                                                <input
                                                    type="text"
                                                    placeholder="Swimming Pool"
                                                    value={
                                                        amenity
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        updateAmenity(
                                                            index,
                                                            e.target
                                                                .value
                                                        )
                                                    }
                                                    className="
                            flex-1
                            px-3
                            py-2
                            text-sm
                            border
                            rounded-xl
                          "
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeAmenity(
                                                            index
                                                        )
                                                    }
                                                    className="
                            w-10
                            rounded-xl
                            text-red-500
                          "
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Location Advantages */}

                            <div className="mt-5">
                                <div
                                    className="
                    flex
                    justify-between
                    items-center
                    mb-2
                  "
                                >
                                    <h3
                                        className="
                      text-sm
                      font-semibold
                    "
                                    >
                                        Location
                                        Advantages
                                    </h3>

                                    <button
                                        type="button"
                                        onClick={
                                            addLocationAdvantage
                                        }
                                        className="
                      text-[#ffd900]
                      border border-[#ffd900]
                      px-3
                      py-1
                      rounded-lg
                      text-xs
                      flex
                      items-center
                      gap-1
                    "
                                    >
                                        <FaPlus />
                                        Add
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    {projectData.locationAdvantages.map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <div
                                                key={index}
                                                className="
                          flex
                          gap-2
                        "
                                            >
                                                <input
                                                    type="text"
                                                    placeholder="Airport - 10 km"
                                                    value={item}
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        updateLocationAdvantage(
                                                            index,
                                                            e.target
                                                                .value
                                                        )
                                                    }
                                                    className="
                            flex-1
                            px-3
                            py-2
                            text-sm
                            border
                            rounded-xl
                          "
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeLocationAdvantage(
                                                            index
                                                        )
                                                    }
                                                    className="
                            w-10
                            rounded-xl
                            text-red-500
                          "
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Images */}

                            <div className="mt-5">
                                <label
                                    className="
                    text-sm
                    font-semibold
                  "
                                >
                                    Project Images
                                </label>

                                <label
                                    className="
                    mt-2
                    h-20
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
                                    <FaImage
                                        className="
                      text-xl
                      text-[#FFD700]
                    "
                                    />

                                    <span
                                        className="
                      text-xs
                      mt-1
                    "
                                    >
                                        Upload Images
                                    </span>

                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) =>
                                            setProjectData({
                                                ...projectData,

                                                images:
                                                    Array.from(
                                                        e.target.files
                                                    ),
                                            })
                                        }
                                    />
                                </label>

                                {projectData.images
                                    .length > 0 && (
                                        <div
                                            className="
                      grid
                      grid-cols-4
                      gap-2
                      mt-3
                    "
                                        >
                                            {projectData.images.map(
                                                (
                                                    image,
                                                    index
                                                ) => (
                                                    <img
                                                        key={index}
                                                        src={URL.createObjectURL(
                                                            image
                                                        )}
                                                        alt=""
                                                        className="
                            h-16
                            w-full
                            object-cover
                            rounded-lg
                          "
                                                    />
                                                )
                                            )}
                                        </div>
                                    )}
                            </div>

                            <div className="mt-5">
                                <label className="text-sm font-semibold">
                                    Project Videos
                                </label>

                                <input
                                    type="file"
                                    multiple
                                    accept="video/*"
                                    onChange={(e) =>
                                        setProjectData({
                                            ...projectData,
                                            videos: Array.from(
                                                e.target.files
                                            ),
                                        })
                                    }
                                    className="w-full mt-2"
                                />
                            </div>

                            {/* Footer */}

                            <div
                                className="
                  flex
                  justify-end
                  gap-2
                  mt-6
                "
                            >
                                <button
                                    onClick={onClose}
                                    className="
                    px-4
                    py-2
                    text-sm
                    border
                    rounded-xl
                  "
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={
                                        handleSubmit
                                    }
                                    className="
                    bg-[#FFD700]
                    text-black
                    px-5
                    py-2
                    text-sm
                    font-semibold
                    rounded-xl
                    hover:scale-105
                    transition
                  "
                                >
                                    Save Project
                                </button>
                            </div>

                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}