/*global Uint8Array, Uint16Array, ArrayBuffer */
/*global XLSX */
const X = XLSX;
const XW = {
	/* worker message */
	msg: 'xlsx',
	/* worker scripts */
	worker: './js/xlsxworker.js'
};

