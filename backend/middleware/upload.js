const multer = require("multer");
const path = require("path");

// Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// Vérifier le type de fichier
const fileFilter = (req, file, cb) => {
  console.log("Nom :", file.originalname);
  console.log("Extension :", path.extname(file.originalname));
  console.log("Mime :", file.mimetype);

 
const types = /jpeg|jpg|png|webp|jfif/;
  const ext = types.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mime = types.test(file.mimetype);

  console.log("Extension valide :", ext);
  console.log("Mime valide :", mime);

  if (ext && mime) {
    return cb(null, true);
  }

  cb(new Error("Seules les images sont autorisées."));
};

module.exports = multer({
  storage,
  fileFilter,
});