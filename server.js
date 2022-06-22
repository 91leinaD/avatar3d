const express = require('express'),
  path = require('path'),
  mongo = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser');

const app = express();

mongo.Promise = global.Promise;
mongo.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log('Sikeres adatbázis-kapcsolat.')
  },
  error => {
    console.log('Hiba: ' + error)
  }
)

const Schema = mongo.Schema;

const bookRoute = express.Router();
let Book = new Schema({
  bookTitle: {
    type: String
  },
  author: {
    type: String
  },
  year: {
    type: Number
  },
  publisher: {
    type: String
  }
}, {
  collection: 'books'
});

var bookModel = mongo.model('books', Book, 'books');

bookRoute.route('/addBook').post((req, res, next) => {
  bookModel.create(req.body, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      res.json(data)
    }
  })
});

bookRoute.route('/getBook').get((req, res) => {
  bookModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

const userRoute = express.Router();
let User = new Schema({
  userName: {
    type: String
  },
  password: {
    type: String
  }
}, {
  collection: 'users'
})

var userModel = mongo.model('users', User, 'users');

userRoute.route('/addUser').post((req, res, next) => {
  userModel.create(req.body, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      res.json(data)
    }
  })
});

userRoute.route('/getAllUser').get((req, res) => {
  userModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

userRoute.route('/getUser/:id').get((req, res) => {
  userModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/avatar3d')));
app.use('/', express.static(path.join(__dirname, 'dist/avatar3d')));

app.use('', userRoute)
app.use('', bookRoute)

app.listen(8080);
console.log('8080 porton az adatbázisszerver elindult.');
