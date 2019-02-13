import {on, off, fire} from './pubsub';

export default {
	on,
	off,
	fire,

	notes: {
		load: 'notes-load',
		new: 'note-create',
		del: 'note-delete',
		undelete: 'note-undelete',
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
		updown: 'focus-note-up-down',
	},

	toast: {
		show: 'info-toast',
		error: 'error-toast',
		warning: 'warning-toast',
	}

};
