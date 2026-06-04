const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      unique: true,
      trim: true,
    },

    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },

    location: {
      type: String,
      required: [true, "Project location is required"],
      trim: true,
    },

    price: {
      type: String,
      default: "",
      trim: true,
    },

    area: {
      type: String,
      default: "",
      trim: true,
    },

    rooms: {
      type: String,
      default: "",
      trim: true,
    },

    bathrooms: {
      type: String,
      default: "",
      trim: true,
    },

    amenities: {
      type: [String],
      default: [],
    },

    locationAdvantages: {
      type: [String],
      default: [],
    },

    images: {
      type: [String],
      default: [],
    },

    videos: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/*
|--------------------------------------------------------------------------
| Virtual Fields
|--------------------------------------------------------------------------
*/

projectSchema.virtual("totalImages").get(function () {
  return this.images.length;
});

projectSchema.virtual("totalVideos").get(function () {
  return this.videos.length;
});

/*
|--------------------------------------------------------------------------
| JSON Response Settings
|--------------------------------------------------------------------------
*/

projectSchema.set("toJSON", {
  virtuals: true,
});

projectSchema.set("toObject", {
  virtuals: true,
});

module.exports = mongoose.model(
  "Project",
  projectSchema
);