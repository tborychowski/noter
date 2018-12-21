const {Note} = require('./db');


function getOne (id) {
	return Note.findById(id);
}

function get (query) {
	const where = {};
	if (query.folder) where.folder = query.folder;
	return Note.findAll({ where, order: [['title', 'ASC'], ['id', 'DESC']], paranoid: false });
}

// add new
function post (data) {
	const createFn = Array.isArray(data) ? 'bulkCreate' : 'create';
	return Note[createFn](data);
}

// update
function put (id, data) {
	return Note.update(data, { where: { id } }).then(() => getOne(id));
}

// delete
function del (id, data = { force: false }) {
	console.log(data);
	return Note.destroy({ where: { id }, force: data.force });
}


module.exports = {
	getOne,
	get,
	post,
	put,
	del
};
