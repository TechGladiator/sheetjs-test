/*global Uint8Array, Uint16Array, ArrayBuffer */
/*global XLSX */
const X = XLSX;
const XW = {
	/* worker message */
	msg: 'xlsx',
	/* worker scripts */
	worker: './js/xlsxworker.js'
};

const worksheet = document.getElementById('worksheet');
function handleFile(e) {
	const f = e.target.files[0];
	console.log(f.name);
	const reader = new FileReader();
}
worksheet.addEventListener('change', handleFile);