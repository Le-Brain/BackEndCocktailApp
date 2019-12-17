const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();
const userRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".png");
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

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  setTimeout(() => {
    next();
  }, 1000);
});

app.use(morgan('combined'));
app.use(multer({ storage: storageConfig, fileFilter: fileFilter }).single('file'));

app.post('/upload', upload.single('file'), (req, res, next) => {
  const filedata = req.file;
  console.log(req.file);
  if (!filedata) res.send('Ошибка при загрузке файла');
  else res.send(req.file);
});

app.use('/users', userRouter);
app.use('/recipes', recipesRouter);

app.use((err, req, res, next) => {
  const { message } = err;
  res.json({ status: 'ERROR', message });
});

app.listen(8080, () => console.log('listening on port 8080'));
