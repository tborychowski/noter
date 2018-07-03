const {Folder} = require('./db');


function getOne (id) {
	return Folder.findById(id);
}

function get () {
	return Folder.findAll({ order: ['name'] });
}

// new category
function post (data) {
	return Folder.create(data);
}

// update
function put (id, data) {
	return Folder.update(data, { where: { id } });
}

function del (id) {
	return Folder.destroy({ where: { id } });
}

module.exports = {
	getOne,
	get,
	post,
	put,
	del
};
