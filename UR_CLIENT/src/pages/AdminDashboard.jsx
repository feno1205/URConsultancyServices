import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import {
    FaBuilding,
    FaUsers,
    FaEnvelope,
    FaRupeeSign,
    FaMapMarkerAlt,
    FaPlus,
    FaPlayCircle,
} from "react-icons/fa";

import AddProjectModal from "../components/AddProjectModal";
import EditProjectModal from "../components/EditProjectModal";

import {
    getProjects,
    createProject,
    updateProject,
    deleteProject
} from "../services/projectApi";

import { projects } from "../data/projects";

const stats = [
    {
        title: "Projects",
        value: projects.length,
        icon: <FaBuilding />,
    },
    {
        title: "Users",
        value: 1,
        icon: <FaUsers />,
    },
    {
        title: "Inquiries",
        value: 58,
        icon: <FaEnvelope />,
    },
    {
        title: "Revenue",
        value: "₹12.5L",
        icon: <FaRupeeSign />,
    },
];

export default function AdminDashboard() {
    const [showModal, setShowModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editModal, setEditModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

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

    const handleProjectSave = async (projectData) => {
        try {
            const data = new FormData();

            data.append("title", projectData.title);
            data.append("description", projectData.description);
            data.append("location", projectData.location);
            data.append("price", projectData.price);
            data.append("area", projectData.area);
            data.append("rooms", projectData.rooms);
            data.append("bathrooms", projectData.bathrooms);

            data.append(
                "amenities",
                JSON.stringify(projectData.amenities || [])
            );

            data.append(
                "locationAdvantages",
                JSON.stringify(projectData.locationAdvantages || [])
            );

            projectData.images.forEach((img) => {
                data.append("images", img);
            });

            projectData.videos.forEach(
                (video) => {
                    data.append(
                        "videos",
                        video
                    );
                }
            );

            await createProject(data);

            alert("Project Added Successfully");

            setShowModal(false);

            // 🔥 refresh list after add
            fetchProjects();
        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to Add Project"
            );
        }
    };

    const handleUpdate = async (data) => {
        try {
            const formData = new FormData();

            formData.append("title", data.title);
            formData.append(
                "description",
                data.description
            );
            formData.append(
                "location",
                data.location
            );
            formData.append("price", data.price);
            formData.append("area", data.area);
            formData.append("rooms", data.rooms);
            formData.append(
                "bathrooms",
                data.bathrooms
            );

            formData.append(
                "amenities",
                JSON.stringify(data.amenities)
            );

            formData.append(
                "locationAdvantages",
                JSON.stringify(
                    data.locationAdvantages
                )
            );

            if (data.images?.length) {
                data.images.forEach((img) => {
                    formData.append("images", img);
                });
            }

            await updateProject(
                selectedProject._id,
                formData
            );

            alert("Project Updated Successfully");

            setEditModal(false);

            fetchProjects();
        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to update project"
            );
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete =
            window.confirm(
                "Delete this project?"
            );

        if (!confirmDelete) return;

        try {
            await deleteProject(id);

            alert("Project Deleted");

            fetchProjects();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100">

            {/* HERO */}
            <section className="relative h-[320px] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1460317442991-0ec209397118"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-sky-950/95 via-sky-950/80 to-sky-900/60" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            Admin Dashboard
                        </h1>

                        <p className="text-white/80 mt-4 text-lg">
                            Manage projects, users and inquiries.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-[#FFD700] text-black px-6 py-4 rounded-2xl font-semibold flex items-center gap-3 hover:scale-105 transition"
                    >
                        <FaPlus />
                        Add Project
                    </button>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">

                {/* STATS */}
                <div className="grid md:grid-cols-4 gap-6">
                    {stats.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -6 }}
                            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-slate-500">{item.title}</p>
                                    <h2 className="text-4xl font-bold mt-2 text-sky-950">
                                        {item.value}
                                    </h2>
                                </div>

                                <div className="w-14 h-14 rounded-2xl bg-[#FFD700] flex items-center justify-center text-2xl">
                                    {item.icon}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* PROJECTS */}
                <div className="mt-16">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-4xl font-bold text-sky-950">
                            Recent Projects
                        </h2>

                        <button
                            onClick={fetchProjects}
                            className="text-sky-950 font-semibold"
                        >
                            Refresh →
                        </button>
                    </div>

                    {loading ? (
                        <p className="text-center text-gray-500">
                            Loading projects...
                        </p>
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-8">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project._id}
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.15 }}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    viewport={{ once: true }}
                                    className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl group"
                                >
                                    <img
                                        src={project.images?.[0]}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-sky-950/95 via-sky-950/40 to-transparent" />

                                    <div className="absolute bottom-0 p-8 text-white w-full">
                                        <h3 className="text-3xl font-bold">
                                            {project.title}
                                        </h3>

                                        <div className="flex items-center gap-2 mt-3">
                                            <FaMapMarkerAlt className="text-[#FFD700]" />
                                            <span>{project.location}</span>
                                        </div>

                                        {/* BUTTONS */}
                                        <div className="flex gap-3 mt-6">
                                            <button
                                                onClick={() => {
                                                    setSelectedProject(project);
                                                    setEditModal(true);
                                                }}
                                                className="flex-1 bg-[#FFD700] text-black py-3 rounded-2xl font-semibold"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(project._id)
                                                }
                                                className="
    flex-1
    bg-red-600
    py-3
    rounded-2xl
    text-white
    font-semibold
  "
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* USERS */}
            <div className="mt-20 mb-20">
                <div
                    className="
      bg-white
      rounded-3xl
      shadow-xl
      overflow-hidden
    "
                >
                    <div className="p-8 border-b flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-sky-950">
                                Registered Users
                            </h2>

                            <p className="text-gray-500 mt-1">
                                Manage all registered users
                            </p>
                        </div>

                        <div className="bg-sky-950 text-white px-4 py-2 rounded-xl">
                            Total Users: {users.length}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="text-left p-5">
                                        Name
                                    </th>

                                    <th className="text-left p-5">
                                        Email
                                    </th>

                                    <th className="text-left p-5">
                                        Phone
                                    </th>

                                    <th className="text-left p-5">
                                        Joined
                                    </th>

                                    <th className="text-center p-5">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <tr
                                            key={user._id}
                                            className="
                  border-t
                  hover:bg-slate-50
                  transition
                "
                                        >
                                            <td className="p-5 font-medium">
                                                {user.name}
                                            </td>

                                            <td className="p-5">
                                                {user.email}
                                            </td>

                                            <td className="p-5">
                                                {user.phone}
                                            </td>

                                            <td className="p-5">
                                                {new Date(
                                                    user.createdAt
                                                ).toLocaleDateString()}
                                            </td>

                                            <td className="p-5 text-center">
                                                <button
                                                    onClick={() =>
                                                        handleDeleteUser(
                                                            user._id
                                                        )
                                                    }
                                                    className="
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      px-4
                      py-2
                      rounded-xl
                      transition
                    "
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="
                  text-center
                  py-10
                  text-gray-500
                "
                                        >
                                            No users found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            <AddProjectModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleProjectSave}
            />

            <EditProjectModal
                isOpen={editModal}
                onClose={() => setEditModal(false)}
                onSubmit={handleUpdate}
                project={selectedProject}
            />
        </div>
    );
}