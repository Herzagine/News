const { Tag, User, New } = require('./models');
const { username, password, dbName, host } = require('./config');
const pgp = require('pg-promise')();
const db = pgp(`postgres://${username}:${password}@${host}:5432/${dbName}`);

const badReqCode = 400;

const databaseMethods = {
  authorizeUser: async(req, res) => {
    try {
      const { body } = req;
      const { email, password } = body;
      // const user = await db.one('SELECT * FROM users WHERE login=$1', email);
      const user = await User.findOne({ where: { 'login': email } });

      if (user.pass_hash.trim() !== password) {
        const error = { name: 'incorrect pass', message: 'incorrect password' };

        throw error;
      }

      return user;
    } catch (e) {
      if (e.message.indexOf('data returned from the') + 1) {
        res.status(badReqCode).send('This user does not exist!');
      } else if (e.message.indexOf('incorrect password') + 1) {
        res.status(badReqCode).send('Incorrect password!');
      }
    }

    return null;
  },
  createNews: async(login, text, title, tags, key, picpath) => {
    // await db.any(
    //   'INSERT INTO news (id, user_login, text, title, picpath) VALUES ($1, $2, $3, $4, $5)',
    //   [
    //     key,
    //     login,
    //     text,
    //     title,
    //     path,
    //   ]
    // );
    // if (tags.length) {
    //   tags.forEach(async item => {
    //     if (item) {
    //       await db.any('INSERT INTO tags (tag, news_id) VALUES ($1, $2)', [item, key]);
    //     }
    //   });
    // }
    await New.create({ 'id': key, 'user_login': login, text, title, picpath });
    await Promise.all(tags.length && tags.map(item => item && Tag.create({ 'tag': item, 'news_id': key })));
  },
  changeUser: async(name, surname, login, picpath) => {
    if (name && surname && !picpath) {
      // await db.any(
      //   'UPDATE users SET name = $1, surname = $2 WHERE login = $3',
      //   [
      //     name[0],
      //     surname[0],
      //     login,
      //   ]
      // );
      await User.update({ 'name': name[0], 'surname': surname[0] }, { where: { login } });
    } else if (!name && !surname && picpath) {
      // await db.any('UPDATE users SET photo_path = $1 WHERE login = $2', [picpath, login]);
      await User.update({ 'photo_path': picpath }, { where: { login } });
    }
  },
  createGoogleUser: async(id, email, name, surname, picpath) => {
    const nameToDB = name && surname ? name : null;
    const surnameToDB = name && surname ? surname : null;

    // await db.any(
    //   `INSERT INTO users (login, pass_hash, name, surname, photo_path)
    //    VALUES ($1, $2, $3, $4, $5)`,
    //   [
    //     email,
    //     id,
    //     nameToDB,
    //     surnameToDB,
    //     picpath,
    //   ]
    // );
    await User.create({
      'login': email,
      'pass_hash': null,
      'name': nameToDB,
      'surname': surnameToDB,
      'photo_path': picpath
    });
  },
  createUser: async(req, res) => {
    const { body } = req;
    const { email, password, passwordRepeat } = body;

    if (password === passwordRepeat) {
      try {
        // await db.any(
        //   `INSERT INTO users (login, pass_hash)
        //    VALUES ($1, $2)`,
        //   [email, password]
        // );
        await User.create({ 'login': email, 'pass_hash': password });
      } catch (error) {
        if (error.detail.indexOf('already exists.') + 1) {
          res.status(badReqCode).send('This user already exists!');
        }
      }
    } else {
      res.status(badReqCode).send('Pleace, check your data!');
    }
  },
  findUser: async login => {
    // const userInDB = await db.any(`SELECT * FROM users WHERE login=$1`, login);
    const userInDB = await User.findOne({ where: { login } });

    return userInDB;
  },
  getUser: async login => {
    // const user = await db.any('SELECT * FROM users WHERE login=$1', login);
    // const news = await db.any('SELECT * FROM news WHERE user_login=$1 ORDER BY "order" ASC', login);
    // const tags = await db.any('SELECT tags.tag, tags.news_id FROM tags');
    const user = await User.findAll({ where: { login } });
    const news = await New.findAll({ where: { 'user_login': login }, order: [['order', 'ASC']] });
    const tags = await Tag.findAll({ attributes: ['tag', 'news_id'] });

    return [
      user,
      news,
      tags,
    ];
  },
  listNews: async() => {
    // const news = await db.any('SELECT * FROM news ORDER BY "order" ASC');
    // const tags = await db.any('SELECT tags.tag, tags.news_id FROM tags');
    const news = await New.findAll({ order: [['order', 'ASC']]});
    const tags = await Tag.findAll({ attributes: ['tag', 'news_id'] });

    return [news, tags];
  },
};

module.exports = databaseMethods;
