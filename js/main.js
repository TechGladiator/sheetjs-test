const submit = document.getElementById('submit');

submit.addEventListener("click", () => {
    const worksheet = document.getElementById('worksheet').files;
    console.log(worksheet);
    const workbook = XLSX.utils.sheet_to_html(worksheet);
    console.log(workbook);
});
