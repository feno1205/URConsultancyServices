const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

/*
|--------------------------------------------------------------------------
| Upload Configuration
|--------------------------------------------------------------------------
*/

const projectUpload = upload.fields([
  {
    name: "images",
    maxCount: 20,
  },
  {
    name: "videos",
    maxCount: 5,
  },
]);

/*
|--------------------------------------------------------------------------
| Project Routes
|--------------------------------------------------------------------------
*/

// Create Project
router.post(
  "/create",
  projectUpload,
  createProject
);

// Get All Projects
router.get(
  "/all",
  getProjects
);

// Get Single Project
router.get(
  "/:id",
  getProjectById
);

// Update Project
router.put(
  "/:id",
  projectUpload,
  updateProject
);

// Delete Project
router.delete(
  "/:id",
  deleteProject
);

module.exports = router;