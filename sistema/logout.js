document.getElementById('logout').addEventListener('click', function() {
    localStorage.removeItem('login');
    localStorage.removeItem('senha');
});