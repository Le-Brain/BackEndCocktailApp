const db = require('../db/db');

const getUsers = (req, res, next) => {
  let dataUsers = [];
  try {
    dataUsers = db.get('users');
  } catch (error) {
    throw new Error(error);
  }
  res.json({ status: 'OK', data: dataUsers });
};

const getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  const user = db.get('users').find({ username }).value();
  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }
  res.json({ status: 'OK', data: user });
};

const getUserByUserId = (req, res, next) => {
  const { userId } = req.params;
  const user = db.get('users').find({ userId }).value();
  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }
  res.json({ status: 'OK', data: user });
};

const getFavoriteRecipesByUserId = (req, res, next) => {
  setTimeout(() => {
    var Favoriterecipes = [];
    const { userId } = req.params;
    const user = db.get('users').find({ userId }).value();
    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }
    for (let i = 0; i < user.favoriteRecipesOfUser.length; i++) {
      Favoriterecipes.push(
        db.get('recipes').find((element) => {
          if (element.idDrink === user.favoriteRecipesOfUser[i]) return element;
        })
      );
    }
    res.json({ status: 'OK', data: Favoriterecipes });
  }, 1000);
};

const addToFavoriteRecipesByUserId = (req, res, next) => {
  setTimeout(() => {
    const { userId, recipeId } = req.body;
    const user = db.get('users').find({ userId }).value();
    let founded = false;
    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }
    user.favoriteRecipesOfUser.forEach((elem) => {
      if (elem === recipeId) founded = true;
    });
    if (founded === false) {
      user.favoriteRecipesOfUser.push(recipeId);
      db.write();
      res.json({ status: 'OK', data: user, message: '' });
    } else {
      res.json({ status: 'OK', data: user, message: 'USER_ALREADY_HAVE_RECIPE' });
    }
  }, 1000);
};

const deleteFromFavoriteRecipesByUserId = (req, res, next) => {
  setTimeout(() => {
    const { userId, recipeId } = req.body;
    const user = db.get('users').find({ userId }).value();
    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }
    const index = user.favoriteRecipesOfUser.indexOf(recipeId);
    user.favoriteRecipesOfUser.splice(index, 1);
    db.write();
    res.json({ status: 'OK', data: user });
  }, 1000);
};

const deleteFromFavoriteRecipesByRecipeId = (req, res, next) => {
  setTimeout(() => {
    const { idDrink } = req.params;
    const users = db.get('users');
    (function (idDrink, users) {
      users.value().map((item) => {
        for (let i = 0; i < item.favoriteRecipesOfUser.length; i++) {
          if (item.favoriteRecipesOfUser[i] === idDrink) {
            item.favoriteRecipesOfUser.splice(i, 1);
            db.write();
          }
        }
      });
    }(idDrink, users));
    res.json({ status: 'OK' });
  }, 1000);
};

module.exports = {
  getUsers,
  getUserByUsername,
  getUserByUserId,
  getFavoriteRecipesByUserId,
  addToFavoriteRecipesByUserId,
  deleteFromFavoriteRecipesByUserId,
  deleteFromFavoriteRecipesByRecipeId
};