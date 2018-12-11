import { Store } from 'svelte/store.js';
import marked from 'marked';
import highlight from 'highlight.js';

const store = new Store({
	notes: [],
	folder: '',
	note: null,
	mode: 'view',
});


marked.setOptions({
	gfm: true,
	smartLists: true,
	breaks: true,
	highlight: code => highlight.highlightAuto(code).value,
});

store.compute('markedNote', ['note'], (note) => {
	if (note && note.text && !note.markedText) note.markedText = marked(note.text);
	return note;
});

store.compute('notesInFolder', ['folder', 'notes'], (folder, notes) => {
	if (folder) notes = notes.filter(n => n.folder === folder);
	return notes.sort((a, b) => a.title.localeCompare(b.title));
});


export default store;
