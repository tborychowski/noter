const express = require('express');
const api = express.Router();
const DB = require('../db/notes');


function getOne (req, res) {
	return DB.getOne(req.params.id)
		.then(item => res.status(200).json(item))
		.catch(e => res.status(500).json(e));
}

function get (req, res) {
	if (req.params.id) return getOne(req, res);
	return DB.get(req.query)
		.then(items => res.status(200).json(items))
		.catch(e => res.status(500).json(e));
}

// add new
function post (req, res) {
	return DB.post(req.body)
		.then(item => res.status(200).json(item))
		.catch(e => res.status(500).json(e));
}

// update
function put (req, res) {
	return DB.put(req.params.id, req.body)
		.then(result => res.status(200).json(result))
		.catch(e => res.status(500).json(e));
}

// delete
function del (req, res) {
	return DB.del(req.body.id || req.params.id, req.body)
		.then(count => res.status(200).json({ deleted: count }))
		.catch(e => res.status(500).json(e));
}

api.route('/:id*?')
	.get(get)
	.post(post)
	.put(put)
	.delete(del);

module.exports = api;
