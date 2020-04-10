const dbController = require('../database/dbController');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const sha = require('sha1');
const multiparty = require('multiparty');
const path = require('path');
const configHost = require('../config');
const combineTags = require('./utils');
const secret = 'herzagine';

const okCode = 200;
const forbiddenCode = 403;
const internalServerErrorCode = 500;
const accessTokenLifetime = 604800;
const lifetimeSecMultiplier = 1000;

const authUser = async(req, res) => {
  const userFromDB = await dbController.authorizeUser(req, res);
  const { login, pass_hash: passHash } = userFromDB;
  const lifetime = new Date().getTime() + (accessTokenLifetime * lifetimeSecMultiplier);
  const accessToken = jwt.sign({ lifetime, login, passHash }, secret);

  res.status(okCode).send(JSON.stringify({ accessToken, login }));
};

const usersMethods = {
  authUser,
  createGoogleUser: async(req, res) => {
    const { user } = req;
    const { id: googlePassHash, userEmail, userName, userSurname, userPhoto } = user;

    const userInDB = await dbController.findUser(userEmail);
    const userObject = userInDB;
    const { pass_hash: passHash, login } = userObject ? userObject : {};

    if (!passHash && !login) {
      try {
        await dbController.createGoogleUser(googlePassHash, userEmail, userName, userSurname, userPhoto);
        const lifetime = new Date().getTime() + (accessTokenLifetime * lifetimeSecMultiplier);
        const accessToken = jwt.sign({ lifetime, login: userEmail, passHash: googlePassHash }, secret);

        res.redirect(`${configHost}google/auth/${userEmail}/${accessToken}`);
      } catch (e) {
        if (e.detail.indexOf('Key (login)') + 1
        && e.detail.indexOf('already exists.') + 1 && passHash !== googlePassHash) {
          res.redirect(`${configHost}google/auth/?error=This user already registered by another password!/`);
        }
      }
    } else if (login === userEmail) {
      const lifetime = new Date().getTime() + (accessTokenLifetime * lifetimeSecMultiplier);
      const accessToken = jwt.sign({ lifetime, login: userEmail, passHash: googlePassHash }, secret);

      res.redirect(`${configHost}google/auth/${userEmail}/${accessToken}`);
    } else {
      res.redirect(`${configHost}google/auth/error/This user already registered by another password!/`);
    }
  },
  createUser: async(req, res) => {
    await dbController.createUser(req, res);
    await authUser(req, res);
  },
  changeUser: async(req, res) => {
    const { headers, params } = req;
    const { 'content-type': type, 'authorization': token } = headers;
    const { login } = params;
    const decodedToken = await jwt.decode(token, secret);

    if (type && type.indexOf('multipart') === 0) {
      const formUser = new multiparty.Form();

      formUser.uploadDir = `${__dirname}/../images/users/tmp`;

      if (decodedToken.login === login) {
        const key = sha(login);

        await formUser.parse(req, async(err, fields, files) => {
          if (err) {
            throw err;
          } else {
            try {
              if (fields.name) {
                if (fields.name[0]) {
                  const { name, surname } = fields;

                  await dbController.changeUser(name, surname, login, null);
                }
              }
              if (files.picture) {
                fs.copyFile(files.picture[0].path, `${__dirname}/../images/users/${key}`, error => {
                  if (error) throw error;
                });

                const picpath = `${__dirname}/../images/users/${key}`;

                await dbController.changeUser(null, null, login, picpath);

                fs.readdir(`${__dirname}/../images/users/tmp`, (err, files) => {
                  if (err) throw err;

                  for (const file of files) {
                    fs.unlink(path.join(`${__dirname}/../images/users/tmp`, file), err => {
                      if (err) throw err;
                    });
                  }
                });
              }

              res.sendStatus(okCode);
            } catch (e) {
              console.log(e);
              res.status(internalServerErrorCode).send('Error');
            }
          }
        });
      } else {
        res.status(forbiddenCode).send('You have not permissions to do this action!');
      }
    }
  },
  getUser: async(req, res) => {
    const { params, headers } = req;
    const { login } = params;
    const { authorization } = headers;
    const authInf = authorization ? jwt.decode(authorization, secret) : null;
    const { login: loginFromToken } = authInf ? authInf : {};
    const isItHisPage = loginFromToken === login;
    const [
      userInfo,
      userNews,
      tags,
    ] = await dbController.getUser(login);
    const [{ name, surname, photo_path: photoPass }] = userInfo;

    res.status(okCode).send(JSON.stringify({
      isItHisPage,
      name,
      photoPass,
      surname,
      userNews: combineTags(userNews, tags),
    }));
  },
  getUserPhoto: (req, res) => {
    res.sendFile(path.join(__dirname, '/../images/users/', sha(req.params.login)));
  },
};

module.exports = usersMethods;
