const worksheet = document.getElementById('worksheet');
worksheet.addEventListener('change', () => {
    console.log(worksheet.files[0].name);
});