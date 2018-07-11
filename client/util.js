function formatNumber (num) {
	num = Math.round(0 + num * 100) / 100;
	return num.toLocaleString('en-GB', { minimumFractionDigits: 2 });
}


function slugify (text) {
	return text.toString().toLowerCase().trim()
		.replace(/&/g, '-and-')         // Replace & with 'and'
		.replace(/[\s\W-]+/g, '-')
		.replace(/-{2,}/g, '-')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '');            // Trim - from end of text
}


function setUrl ({ folder, note }) {
	const chunks = [];
	if (folder) chunks.push(folder.id);
	if (note) chunks.push(note.id);
	const path = '/' + chunks.join('/');

	location.hash = path;
}

function getStateFromUrl () {
	let [folder, note] = location.hash.substr(2).split('/');
	if (folder) folder = { id: +folder };
	if (note) note = { id: +note };
	return { folder, note };
}


export {
	formatNumber,
	slugify,
	setUrl,
	getStateFromUrl,
};
