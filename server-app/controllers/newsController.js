const dbController = require('../database/dbController');
const multiparty = require('multiparty');
const sha = require('sha1');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');
const combineTags = require('./utils');
const secret = 'herzagine';
const okCode = 200;
const createdCode = 201;
const internalServerErrorCode = 500;

const newsMethods = {
  createNews: async(req, res) => {
    const { headers } = req;
    const { 'content-type': type } = headers;

    if (type && type.indexOf('multipart') === 0) {
      const form = new multiparty.Form();

      form.uploadDir = `${__dirname}/../images/news/tmp`;
      await form.parse(req, async(err, fields, files) => {
        if (!err) {
          try {
            if (fields.login[0]) {
              const { login, text, title, userToken } = fields;

              let { tags } = fields;

              if (!tags) {
                tags = [''];
              }
              const [loginNormalized] = login;
              const [textNormalized] = text;
              const [titleNormalized] = title;
              const [tagsNormalized] = tags;
              const [tokenNormilized] = userToken;
              const tagsArray = tagsNormalized.split(' ').join('')
                .split(',');
              const key = sha(`${loginNormalized}${textNormalized}${titleNormalized}${tagsNormalized}`);

              let picpath = null;

              const decodedToken = jwt.decode(tokenNormilized, secret);

              if (loginNormalized === decodedToken.login) {
                if (files.picture) {
                  fs.copyFile(files.picture[0].path, `${__dirname}/../images/news/${key}`, error => {
                    if (error) throw error;
                  });
                  picpath = `${__dirname}/../images/news/${key}`;
                }
                await dbController.createNews(
                  loginNormalized,
                  textNormalized,
                  titleNormalized,
                  tagsArray,
                  key,
                  picpath
                );
                res.sendStatus(createdCode);
                fs.readdir(`${__dirname}/../images/news/tmp`, (err, files) => {
                  if (err) throw err;

                  for (const file of files) {
                    fs.unlink(path.join(`${__dirname}/../images/news/tmp`, file), err => {
                      if (err) throw err;
                    });
                  }
                });
              } else {
                const errorUnauth = {
                  message: 'You have not got rights to create news from this username!',
                  name: 'forbidden',
                };

                throw errorUnauth;
              }
            }
          } catch (e) {
            if (e.detail.indexOf('already exists.') + 1) {
              res.status(internalServerErrorCode).send('This news alreary exists!');
            } else {
              res.status(internalServerErrorCode).send(e.message);
            }
          }
        }
      });
    }
  },
  getImage: (req, res) => {
    res.sendFile(path.join(__dirname, '/../images/news/', req.params.id));
  },
  listNews: async(req, res) => {
    const [news, tags] = await dbController.listNews();

    res.status(okCode).send(JSON.stringify(combineTags(news, tags)));
  },
};

module.exports = newsMethods;
