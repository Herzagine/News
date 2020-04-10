const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const passport = require('passport');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');


const newsRouter = require('./routes/news');
const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');

const app = express();

const internalServerErrorCode = 500;
const notFoundErrorCode = 404;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, UPDATE, HEAD, OPTIONS, GET, POST');
  next();
});

passport.use(new GoogleStrategy(
  {
    callbackURL: '/users/auth/google/callback',
    clientID: '914707686761-7or3rgf062622uao901caplenut3t1s5.apps.googleusercontent.com',
    clientSecret: 'odoLBX1A-jhQzVq24y35YF0I',
    passReqToCallback: true,
  },
  (req, accessToken, refreshToken, profile, done) => {
    const { id, name, emails, photos } = profile;
    const { familyName: userName, givenName: userSurname } = name;
    const [userEmailObj] = emails;
    const [userPhotoObj] = photos;
    const { value: userEmail } = userEmailObj;
    const { value: userPhoto } = userPhotoObj;

    done(null, {
      id,
      userName,
      userSurname,
      userEmail,
      userPhoto,
    });
  }
));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});

app.use('/images', indexRouter);
app.use('/news', newsRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
  next(createError(notFoundErrorCode));
});

app.use((err, req, res) => {
  const { message } = err;

  res.locals.message = message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || internalServerErrorCode);
});

module.exports = app;
