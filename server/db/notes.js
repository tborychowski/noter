const {Note, Folder} = require('./db');


function getOne (id) {
	return Note.findById(id);
}

function get (query) {
	const where = {};
	if (query.folder) where.folder_id = query.folder;
	return Note.findAll({
		order: [['title', 'ASC'], ['id', 'DESC']],
		where,
		// include: Folder
	});
}

// add new
function post (data) {
	const createFn = Array.isArray(data) ? 'bulkCreate' : 'create';
	return Note[createFn](data);
}

// update
function put (id, data) {
	return Note.update(data, { where: { id } });
}

// delete
function del (id) {
	return Note.destroy({ where: { id } });
}


module.exports = {
	getOne,
	get,
	post,
	put,
	del
};
