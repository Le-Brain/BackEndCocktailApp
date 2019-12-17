const express = require('express');

const router = express.Router();
const usersController = require('../controllers/users');

// GET /users
router.get('/', usersController.getUsers);

// GET /users/:userId
router.get('/getById/:userId', usersController.getUserByUserId);

// GET /users/:username
router.get('/getByUserName/:username', usersController.getUserByUsername);

// GET /users/favoriterecipes/:userId
router.get('/favoriterecipes/:userId', usersController.getFavoriteRecipesByUserId);

// POST /users/favoriterecipes/add/:userId
router.post('/favoriterecipes/add', usersController.addToFavoriteRecipesByUserId);

// POST /users/favoriterecipes/delete/:userId
router.post('/favoriterecipes/delete', usersController.deleteFromFavoriteRecipesByUserId);


router.get('/favoriterecipes/deleteall/:idDrink', usersController.deleteFromFavoriteRecipesByRecipeId);
// PATCH /users/:id
// router.patch('/:id', tasksController.editTask);

// DELETE /users/:id
// router.delete('/:idDrink', recipesController.deleteRecipe);

module.exports = router;
