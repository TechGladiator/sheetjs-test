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
	let rABS = typeof FileReader !== "undefined" && (FileReader.prototype||{}).readAsBinaryString;
	let use_worker = typeof Worker !== 'undefined';
	const reader = new FileReader();
	reader.onload = g => {
		if(typeof console !== 'undefined') {
			console.log("onload", new Date(), rABS, use_worker);
		}
		const worker = new Worker(XW.worker);
		worker.onmessage = h => {
			console.log(h);
		}
	}
}
worksheet.addEventListener('change', handleFile);