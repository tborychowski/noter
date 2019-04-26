import marked from 'marked';
import highlight from 'highlight.js';
import { writable, derived } from 'svelte/store';


marked.setOptions({
	gfm: true,
	smartLists: true,
	breaks: true,
	highlight: code => highlight.highlightAuto(code).value,
});


const sortFn = {
	alpha: (a, b) => a.title.localeCompare(b.title),
	recent: (a, b) => b.updated_at.localeCompare(a.updated_at),
};


export const notes = writable([]);
export const folder = writable('');
export const note = writable(null);
export const selectedNotes = writable([]);
export const mode = writable('view');
export const paletteVisible = writable(false);
export const sort = writable({ by: 'recent', order: 'ASC' });


export const markedNote = derived(note, $note => {
	if ($note && $note.text && !$note.markedText) {
		$note.markedText = new Promise(resolve => {
			setTimeout(() => resolve(marked($note.text)));
		});
	}
	return $note;
});


export const notesInFolder = derived([folder, notes, sort], ([$folder, $notes, $sort]) => {
	if (!$notes.length) return;
	let _notes = [];
	if ($folder) {
		if ($folder === 'Bin') _notes = $notes.filter(n => n.deleted_at);
		else _notes = $notes.filter(n => n.folder === $folder && !n.deleted_at);
	}
	else _notes = $notes.filter(n => !n.deleted_at);
	_notes.sort(sortFn[$sort.by]);
	return _notes;
}, []);


export const folders = derived(notes, $notes => {
	const map = {};
	const _folders = [];
	const binned = $notes.filter(n => n.deleted_at);
	const all = $notes.filter(n => !n.deleted_at);

	for (let _note of all) {
		if (_note.folder) map[_note.folder] = (map[_note.folder] || 0) + 1;
	}
	for (let name in map) _folders.push({ name, count: map[name] });
	_folders.sort((a, b) => a.name.localeCompare(b.name));
	_folders.unshift({ name: '', count: $notes.length - binned.length });
	if (binned.length) _folders.push({ name: 'Bin', count: binned.length, cls: 'folder-bin' });
	return _folders;
}, []);
