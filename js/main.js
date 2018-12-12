const submit = document.getElementById('submit');
const worksheet = document.getElementById('worksheet').files;

submit.addEventListener("click", () => {
    console.log(document.getElementById('worksheet').files);
    const workbook = XLSX.readFile(worksheet);
});
