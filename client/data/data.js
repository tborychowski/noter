function req (url, method = 'GET', params) {
	const opts = {
		method: method,
		headers: { 'Content-type': 'application/json' },
		credentials: 'include',
	};
	if (params) {
		opts.body = JSON.stringify(params);
		if (params.id && typeof params.id !== 'undefined') url += `/${params.id}`;
	}
	return fetch(`api/${url}`, opts).then(res => res.json());
}

const get = url => req(url);
const post = (url, params) => req(url, 'POST', params);
const put = (url, params) => req(url, 'PUT', params);
const del = (url, params) => req(url, 'DELETE', params);
const save = (url, data) => {
	if (data.length === 1 && data[0].id) data = data[0];
	if (data.id) return put(url, data);
	return post(url, data);
};


const Notes = {
	base: 'notes',
	get () {
		return get(this.base);
	},
	getOne (id) {
		return get(this.base, { id });
	},
	save (data) {
		return save(this.base, data);
	},
	bin (id) {
		return del(this.base, { id });
	},
	del (id = '') {
		return del(this.base, { id, force: true });
	},
	undelete (id) {
		return del(this.base, { id, restore: true });
	},
};


export default {
	Notes,
};
