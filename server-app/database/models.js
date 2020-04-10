const { username, dbName, password, host } = require('./config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(username, dbName, password, {
    define: { timestamps: false },
    dialect: 'postgres',
    host: host,
    logging: false,
});

const New = sequelize.define('new', {
    'id': {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
    },
    'user_login': {
        allowNull: false,
        type: Sequelize.STRING,
    },
    'text': {
        allowNull: false,
        type: Sequelize.TEXT,
    },
    'title': {
        allowNull: false,
        type: Sequelize.TEXT,
    },
    'picpath': {
        allowNull: true,
        type: Sequelize.STRING,
    },
    'order': {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
    },
}, {
    modelName: 'new',
    sequelize,
});
const Tag = sequelize.define('tag', {
    'id': {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    'news_id': {
        allowNull: false,
        type: Sequelize.STRING,
    },
    'tag': {
        allowNull: false,
        type: Sequelize.STRING,
    }
}, {
    modelName: 'tag',
    sequelize,
});
const User = sequelize.define('user', {
    'login': {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
    },
    'pass_hash': {
        allowNull: true,
        type: Sequelize.STRING,
    },
    'name': {
        allowNull: true,
        type: Sequelize.STRING,
    },
    'surname': {
        allowNull: true,
        type: Sequelize.STRING,
    },
    'photo_path': {
        allowNull: true,
        type: Sequelize.STRING,
    },
}, {
    modelName: 'user',
    sequelize,
});

New.hasMany(Tag, { onDelete: 'cascade', foreignKey: 'news_id' });

sequelize.sync()
    .then(() => console.log('Success!'))
    .catch(err => console.log(err.message));

module.exports = {
    New,
    Tag,
    User,
};
