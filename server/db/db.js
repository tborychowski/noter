const Sequelize = require('sequelize');
const config = require('config');
const logger = require('../lib/logger');

const dbname = config.get('dbname');
const sequelize = new Sequelize(`sqlite:${dbname}`, {
	define: { timestamps: false, underscored: true },
	operatorsAliases: false,
	logging: s => logger.debug(`DB: ${s}\n`)
});

sequelize.authenticate()
	.then(() => logger.info('Connected to the database: ' + dbname))
	.catch(err => logger.error('Unable to connect to the database:', err));


const Folder = sequelize.define('folder', {
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	name: { type: Sequelize.TEXT, allowNull: false, unique: true },
});

const Note = sequelize.define('note', {
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	title: { type: Sequelize.TEXT, allowNull: false, defaultValue: 'New note' },
	url: { type: Sequelize.TEXT, defaultValue: '' },
	text: { type: Sequelize.TEXT, defaultValue: '' },
}, { timestamps: true, paranoid: true });

Folder.hasMany(Note);
Note.belongsTo(Folder);


const init = () => sequelize.sync();

init();


module.exports = {
	init,
	Folder,
	Note,
	Op: Sequelize.Op,
	sequelize,
};
