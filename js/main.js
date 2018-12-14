/*global Uint8Array, Uint16Array, ArrayBuffer */
/*global XLSX */
const X = XLSX;
const XW = {
	/* worker message */
	msg: 'xlsx',
	/* worker scripts */
	worker: './js/xlsxworker.js'
};

const fileDrop = document.getElementById('file-drop');
const fileInput = document.getElementById('file-input');

// drop handler - not working
fileDrop.addEventListener('drop', e => {
	e.stopPropagation();
	e.preventDefault();
	e.dataTransfer.files;
});

fileInput.addEventListener('change', e => {
	console.log(e.target.files[0].name);
});