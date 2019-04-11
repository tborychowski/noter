const Sequelize = require('sequelize');
const config = require('config');
const logger = require('../lib/logger');

const dbname = config.get('dbname');
const sequelize = new Sequelize(`sqlite:${dbname}`, {
	define: { timestamps: true, underscored: true },
	logging: s => logger.debug(`DB: ${s}\n`)
});

sequelize.authenticate()
	.then(() => logger.info('Connected to the database: ' + dbname))
	.catch(err => logger.error('Unable to connect to the database:', err));

const Note = sequelize.define('note', {
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	folder: { type: Sequelize.TEXT, defaultValue: '' },
	title: { type: Sequelize.TEXT, allowNull: false, defaultValue: 'New note' },
	url: { type: Sequelize.TEXT, defaultValue: '' },
	text: { type: Sequelize.TEXT, defaultValue: '' },
}, {
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	deletedAt: 'deleted_at',
	paranoid: true
});


const init = () => sequelize.sync();

init();


module.exports = {
	init,
	Note,
	Op: Sequelize.Op,
	sequelize,
};
