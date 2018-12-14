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

function processFile(files) {
	const file = files[0];
	const reader = new FileReader();
	reader.onload = e => {
		const data = e.target.result;
		OUT.innerText = JSON.stringify(X.read(data, {type: 'binary'}));
	};
	reader.readAsBinaryString(file);
}

function handleFile(e) {
	processFile(e.target.files);
}

function handleDrop(e) {
	e.stopPropagation();
	e.preventDefault();
	processFile(e.dataTransfer.files);
}

function handleDragover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.dataTransfer.dropEffect = 'copy';
}

// drop handler - not working
fileDrop.addEventListener('dragenter', handleDragover);
fileDrop.addEventListener('dragover', handleDragover);
fileDrop.addEventListener('drop', handleDrop);

fileInput.addEventListener('change', handleFile);
