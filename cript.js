document.addEventListener("DOMContentLoaded", function() {
    // Função para detectar dispositivo móvel
    function isMobileDevice() {
      return /Mobi|Android/i.test(navigator.userAgent);
    }
  
    if (isMobileDevice()) {
      // Adicionar uma classe específica ao body para customização de CSS
      document.body.classList.add("mobile");
    }
  
    // Código adicional para ajustar comportamentos específicos
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    if (menuToggle) {
      menuToggle.addEventListener("click", function() {
        const menu = document.querySelector(".mobile-menu");
        if (menu) {
          menu.classList.toggle("open");
        }
      });
    }
  });
  