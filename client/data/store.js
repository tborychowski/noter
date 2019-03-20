import { Store } from 'svelte/store.js';
import marked from 'marked';
import highlight from 'highlight.js';

const store = new Store({
	notes: [],
	folder: '',
	note: null,
	selectedNotes: [],
	mode: 'view',
	paletteVisible: false,
	sort: {
		by: 'recent',
		order: 'ASC',
	},
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


const sortFn = {
	alpha: (a, b) => a.title.localeCompare(b.title),
	recent: (a, b) => b.updated_at.localeCompare(a.updated_at),
};

store.compute('notesInFolder', ['folder', 'notes', 'sort'], (folder, notes, sort) => {
	if (folder) {
		if (folder === 'Bin') notes = notes.filter(n => n.deleted_at);
		else notes = notes.filter(n => n.folder === folder && !n.deleted_at);
	}
	else notes = notes.filter(n => !n.deleted_at);
	return notes.sort(sortFn[sort.by]);
});


export default store;
