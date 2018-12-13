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
    console.log(e.target.files[0].name);
}
worksheet.addEventListener('change', handleFile);