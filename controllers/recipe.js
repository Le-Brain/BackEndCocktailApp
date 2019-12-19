const shortid = require('shortid');
const { validate } = require('jsonschema');
const db = require('../db/db');

const getRecipes = (req, res, next) => {
  setTimeout(() => {
    let dataRecipes = [];
    try {
      dataRecipes = db.get('recipes');
    } catch (error) {
      throw new Error(error);
    }
    res.json({ status: 'OK', data: dataRecipes });
  }, 1000);
};

const getRecipeById = (req, res, next) => {
  setTimeout(() => {
    const { idDrink } = req.params;
    const recipe = db.get('recipes').find({ idDrink }).value();
    if (!recipe) {
      throw new Error('RECIPE_NOT_FOUND');
    }
    res.json({ status: 'OK', data: recipe });
  }, 1000);
};

const getRecipesByUserId = (req, res, next) => {
  setTimeout(() => {
    const { userId } = req.params;
    let dataRecipes = [];
    dataRecipes = db.get('recipes').filter({ userId }).value();
    if (!dataRecipes) {
      throw new Error('RECIPES_OF_USER_NOT_FOUND');
    }
    res.json({ status: 'OK', data: dataRecipes });
  }, 1000);
};

const createRecipe = (req, res, next) => {
  setTimeout(() => {
    console.log(req.file);
    const taskSchema = {
      type: 'object',
      properties: {
        userId: { type: ['string', 'null'] },
        strDrink: { type: 'string' },
        strCategory: { type: ['string', 'null'] },
        strAlcoholic: { type: ['string', 'null'] },
        strGlass: { type: ['string', 'null'] },
        strInstructions: { type: ['string', 'null'] },
        strDrinkThumb: { type: ['string', 'null'] },
        strIngredient1: { type: ['string', 'null'] },
        strIngredient2: { type: ['string', 'null'] },
        strIngredient3: { type: ['string', 'null'] },
        strIngredient4: { type: ['string', 'null'] },
        strIngredient5: { type: ['string', 'null'] },
        strIngredient6: { type: ['string', 'null'] },
        strIngredient7: { type: ['string', 'null'] },
        strMeasure1: { type: ['string', 'null'] },
        strMeasure2: { type: ['string', 'null'] },
        strMeasure3: { type: ['string', 'null'] },
        strMeasure4: { type: ['string', 'null'] },
        strMeasure5: { type: ['string', 'null'] },
        strMeasure6: { type: ['string', 'null'] },
        strMeasure7: { type: ['string', 'null'] },
        dateModified: { type: ['string', 'null'] }
      },
      required: [
        'userId',
        'strDrink',
        'strCategory',
        'strAlcoholic',
        'strGlass',
        'strInstructions',
        'strDrinkThumb',
        'strIngredient1',
        'strIngredient2',
        'strIngredient3',
        'strIngredient4',
        'strIngredient5',
        'strIngredient6',
        'strIngredient7',
        'strMeasure1',
        'strMeasure2',
        'strMeasure3',
        'strMeasure4',
        'strMeasure5',
        'strMeasure6',
        'strMeasure7',
        'dateModified'
      ],
      additionalProperties: false
    };
    const validationResult = validate(req.body, taskSchema);
    if (!validationResult.valid) {
      throw new Error('INVALID_JSON_OR_API_FORMAT');
    }
    const {
      userId,
      strDrink,
      strCategory,
      strAlcoholic,
      strGlass,
      strInstructions,
      strDrinkThumb,
      strIngredient1,
      strIngredient2,
      strIngredient3,
      strIngredient4,
      strIngredient5,
      strIngredient6,
      strIngredient7,
      strMeasure1,
      strMeasure2,
      strMeasure3,
      strMeasure4,
      strMeasure5,
      strMeasure6,
      strMeasure7,
      dateModified
    } = req.body;
    const recipe = {
      idDrink: shortid.generate(),
      userId,
      strDrink,
      strCategory,
      strAlcoholic,
      strGlass,
      strInstructions,
      strDrinkThumb,
      strIngredient1,
      strIngredient2,
      strIngredient3,
      strIngredient4,
      strIngredient5,
      strIngredient6,
      strIngredient7,
      strMeasure1,
      strMeasure2,
      strMeasure3,
      strMeasure4,
      strMeasure5,
      strMeasure6,
      strMeasure7,
      dateModified
    };
    try {
      db.get('recipes').push(recipe).write();
    } catch (error) {
      throw new Error(error);
    }
    res.json({ status: 'OK', data: recipe });
  }, 1000);
};

const editRecipe = (req, res, next) => {
  setTimeout(() => {
    const { idDrink } = req.params;
    const editedRecipe = db.get('recipes').find({ idDrink }).assign(req.body).value();
    db.write();
    res.json({ status: 'OK', data: editedRecipe });
  }, 1000);
};

const deleteRecipe = (req, res, next) => {
  setTimeout(() => {
    db.get('recipes').remove({ idDrink: req.params.idDrink }).write();
    res.json({ status: 'OK' });
  }, 1000);
};

module.exports = {
  getRecipes,
  getRecipeById,
  getRecipesByUserId,
  createRecipe,
  editRecipe,
  deleteRecipe
};
