const Sequelize = require('sequelize');
const util = require('../util');

const dbName = (util.isTest ? 'database-test.db' : 'database.db');
const sequelize = new Sequelize(`sqlite:${dbName}`, {
	define: { timestamps: false, underscored: true },
	operatorsAliases: false,
	// logging: s => console.log(`${s}\n`)
	logging: false
});

// console.log('\n\n\n\n*************************** APP STARTING ***************************\n\n');
// sequelize.authenticate()
// 	.then(() => console.log('Connected to the database: ' + dbName))
// 	.catch(err => console.error('Unable to connect to the database:', err));


const Folder = sequelize.define('category', {
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	name: { type: Sequelize.TEXT, allowNull: false, unique: true },
});

const Note = sequelize.define('entry', {
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
