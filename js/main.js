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
const OUT = document.getElementById('out');
const HTMLOUT = document.getElementById('htmlout');

// drop handler - not working
fileDrop.addEventListener('drop', e => {
	e.stopPropagation();
	e.preventDefault();
	e.dataTransfer.files;
});

fileInput.addEventListener('change', e => {
	const file = e.target.files[0];
	const reader = new FileReader();
	reader.onload = g => {
		const data = g.target.result;
		OUT.innerText = data;
	}
	reader.readAsBinaryString(file);
});