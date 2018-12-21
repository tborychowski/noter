import { Store } from 'svelte/store.js';
import marked from 'marked';
import highlight from 'highlight.js';

const store = new Store({
	notes: [],
	folder: '',
	note: null,
	mode: 'view',
	paletteVisible: false,
});


marked.setOptions({
	gfm: true,
	smartLists: true,
	breaks: true,
	highlight: code => highlight.highlightAuto(code).value,
});

store.compute('markedNote', ['note'], (note) => {
	if (note && note.text && !note.markedText) {
		note.markedText = new Promise(resolve => {
			setTimeout(() => resolve(marked(note.text)));
		});
	}
	return note;
});

store.compute('notesInFolder', ['folder', 'notes'], (folder, notes) => {
	if (folder) {
		if (folder === 'Bin') notes = notes.filter(n => n.deleted_at);
		else notes = notes.filter(n => n.folder === folder && !n.deleted_at);
	}
	else notes = notes.filter(n => !n.deleted_at);
	// return notes.sort((a, b) => a.title.localeCompare(b.title));
	return notes.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
});


export default store;
