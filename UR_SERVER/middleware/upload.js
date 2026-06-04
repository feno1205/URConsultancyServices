const multer = require("multer");
const {
  CloudinaryStorage,
} = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    const isVideo =
      file.mimetype.startsWith("video/");

    return {
      folder: isVideo
        ? "ur-projects/videos"
        : "ur-projects/images",

      resource_type: isVideo
        ? "video"
        : "image",

      ...(isVideo
        ? {}
        : {
            format: "webp",
            transformation: [
              {
                quality: "auto",
                fetch_format: "auto",
              },
            ],
          }),
    };
  },
});

const fileFilter = (
  req,
  file,
  cb
) => {
  const allowedImageTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const allowedVideoTypes = [
    "video/mp4",
    "video/webm",
    "video/quicktime",
  ];

  const allowedTypes = [
    ...allowedImageTypes,
    ...allowedVideoTypes,
  ];

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {
    return cb(null, true);
  }

  cb(
    new Error(
      "Only JPG, PNG, WEBP, MP4, WEBM and MOV files are allowed."
    ),
    false
  );
};

const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize:
      100 * 1024 * 1024, // 100MB
  },
});

module.exports = upload;