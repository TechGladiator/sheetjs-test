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
let global_wb;

function processWB(wb) {
	const OUT = document.getElementById('out');
	const HTMLOUT = document.getElementById('htmlout');

	function getFormat() {
		const formats = document.getElementsByName('format');
		for (let i = 0; i < formats.length; i++) {
			if (formats[i].checked || formats.length === 1) {
				return formats[i].value;
			}
		}
	}

	function to_csv(workbook) {
		const result = [];
		workbook.SheetNames.forEach(sheetName => {
			const csv = X.utils.sheet_to_csv(workbook.Sheets[sheetName]);
			if(csv.length){
				result.push(`SHEET: ${sheetName}`);
				result.push("");
				result.push(csv);
			}
		});
		return result.join("\n");
	}

	function to_json(workbook) {
		const result = {};
		workbook.SheetNames.forEach(sheetName => {
			const roa = X.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
			if (roa.length) {
				result[sheetName] = roa;
			}
		});
		return JSON.stringify(result, 2, 2);
	}

	function to_fmla(workbook) {
		const result = [];
		workbook.SheetNames.forEach(sheetName => {
			const formulae = X.utils.get_formulae(workbook.Sheets[sheetName]);
			if (formulae.length) {
				result.push(`SHEET: ${sheetName}`);
				result.push("");
				result.push(formulae.join("\n"));
			}
		});
		return result.join("\n");
	}

	function to_html(workbook) {
		workbook.SheetNames.forEach(sheetName => {
			const htmlstr = X.write(workbook, {sheet:sheetName, type:'string', bookType:'html'});
			HTMLOUT.innerHTML += htmlstr;
		});
		return "";
	}

	HTMLOUT.innerHTML = "";
	global_wb = wb;
	let output = "";
	switch(getFormat()) {
		case "form": output = to_fmla(wb); break;
		case "html": output = to_html(wb); break;
		case "json": output = to_json(wb); break;
		default: output = to_csv(wb);
	}
	if (OUT.innerText === undefined) {
		OUT.textContent = output;
	} else {
		OUT.innerText = output;
	}
}

const setfmt = window.setfmt = function setfmt() {
	if (global_wb) {
		processWB(global_wb);
	}
};

function processFile(files) {
	const file = files[0];
	const reader = new FileReader();
	reader.onload = e => {
		const data = e.target.result;
		processWB(X.read(data, {type: 'binary'}));
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
