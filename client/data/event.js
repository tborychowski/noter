import {on, off, fire} from './pubsub';

export default {
	on,
	off,
	fire,

	note: {
		new: 'note-create',
		del: 'note-delete',
	},

	edit: {
		start: 'edit-start',
		check: 'edit-mode-check'
	},

	palette: {
		show: 'palette-show',
	},

	focus: {
		firstNote: 'focus-first-note',
		selectedNote: 'focus-selected-note',
		selectedFolder: 'focus-selected-folder',
		editor: 'focus-editor',
		editorView: 'focus-editor-view',
	}

};
