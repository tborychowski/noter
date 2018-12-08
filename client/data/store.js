import { Store } from 'svelte/store.js';

const store = new Store({
	notes: [],
	folder: '',
	note: null,
	mode: 'view',
});


store.compute('notesInFolder', ['folder', 'notes'], (folder, notes) => {
	if (folder) notes = notes.filter(n => n.folder === folder);
	return notes.sort((a, b) => a.title.localeCompare(b.title));
});


export default store;
