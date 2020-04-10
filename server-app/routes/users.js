const express = require('express');
const passport = require('passport');
const router = new express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.post('/auth', userController.authUser);
router.get('/:login', userController.getUser);
router.put('/:login', userController.changeUser);
router.get('/images/:login', userController.getUserPhoto);
router.get(
  '/auth/google',
  passport.authenticate(
    'google',
    { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }
  )
);
router.get(
  '/auth/google/callback', passport.authenticate('google', { failureRedirect: '/users/auth/google/fail' }),
  userController.createGoogleUser
);
router.get('/auth/google/fail', (req, res) => {
  console.log(res);
});

module.exports = router;
