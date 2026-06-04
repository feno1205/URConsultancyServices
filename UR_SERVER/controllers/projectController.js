const Project = require("../models/Project");

/*
|--------------------------------------------------------------------------
| Create Project
|--------------------------------------------------------------------------
*/

const createProject = async (req, res) => {
  try {
    const count =
      await Project.countDocuments();

    const productId = `URID-${String(
      count + 1
    ).padStart(4, "0")}`;

    const imageUrls =
      req.files?.images?.map(
        (file) => file.path
      ) || [];

    const videoUrls =
      req.files?.videos?.map(
        (file) => file.path
      ) || [];

    const project =
      await Project.create({
        productId,

        title: req.body.title,
        description:
          req.body.description,
        location: req.body.location,
        price: req.body.price,
        area: req.body.area,
        rooms: req.body.rooms,
        bathrooms:
          req.body.bathrooms,

        amenities:
          req.body.amenities
            ? JSON.parse(
                req.body.amenities
              )
            : [],

        locationAdvantages:
          req.body
            .locationAdvantages
            ? JSON.parse(
                req.body
                  .locationAdvantages
              )
            : [],

        images: imageUrls,
        videos: videoUrls,
      });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get All Projects
|--------------------------------------------------------------------------
*/

const getProjects = async (
  req,
  res
) => {
  try {
    const projects =
      await Project.find().sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get Single Project
|--------------------------------------------------------------------------
*/

const getProjectById = async (
  req,
  res
) => {
  try {
    const project =
      await Project.findById(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Update Project
|--------------------------------------------------------------------------
*/

const updateProject = async (
  req,
  res
) => {
  try {
    const project =
      await Project.findById(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Project not found",
      });
    }

    const imageUrls =
      req.files?.images?.map(
        (file) => file.path
      ) || project.images;

    const videoUrls =
      req.files?.videos?.map(
        (file) => file.path
      ) || project.videos;

    project.title =
      req.body.title ||
      project.title;

    project.description =
      req.body.description ||
      project.description;

    project.location =
      req.body.location ||
      project.location;

    project.price =
      req.body.price ||
      project.price;

    project.area =
      req.body.area ||
      project.area;

    project.rooms =
      req.body.rooms ||
      project.rooms;

    project.bathrooms =
      req.body.bathrooms ||
      project.bathrooms;

    project.amenities =
      req.body.amenities
        ? JSON.parse(
            req.body.amenities
          )
        : project.amenities;

    project.locationAdvantages =
      req.body
        .locationAdvantages
        ? JSON.parse(
            req.body
              .locationAdvantages
          )
        : project.locationAdvantages;

    project.images = imageUrls;
    project.videos = videoUrls;

    await project.save();

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Delete Project
|--------------------------------------------------------------------------
*/

const deleteProject = async (
  req,
  res
) => {
  try {
    const project =
      await Project.findByIdAndDelete(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};