const worksheet = document.getElementById('worksheet');
function handleFile(e) {
    console.log(worksheet.files[0].name);
}
worksheet.addEventListener('change', handleFile);