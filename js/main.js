const worksheet = document.getElementById('worksheet');
function handleFile(e) {
    console.log(e.target.files[0].name);
}
worksheet.addEventListener('change', handleFile);