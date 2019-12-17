const express = require('express');
const multer = require('multer');
const router = express.Router();
const recipesController = require('../controllers/recipe');

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + '-' + Date.now());
  },
  rename: (fieldname, filename) => {
    return filename;
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  }
  else {
    cb(null, false);
  }
};

const upload = multer({ storage: storageConfig, fileFilter: fileFilter });

// GET /recipes
router.get('/', recipesController.getRecipes);

// GET /recipes/:id
router.get('/:idDrink', recipesController.getRecipeById);

// GET /recipes/:userId
router.get('/ofuser/:userId', recipesController.getRecipesByUserId);

// POST /recipes
router.post('/', upload.single('userFile'), recipesController.createRecipe);

// PATCH /tasks/:id
// router.patch('/:id', tasksController.editTask);

// DELETE /recipes/:idDrink
router.delete('/:idDrink', recipesController.deleteRecipe);

module.exports = router;
