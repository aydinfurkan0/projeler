// script.js
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Varsayılan yönlendirmeyi durdur
        const url = button.getAttribute('href');
        console.log(`Yönlendirme yapılıyor: ${url}`);
        window.location.href = url; // Yönlendirmeyi manuel yap
    });
});