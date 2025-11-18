// ============= MODERN HAMBURGER MENU =============
class MobileMenu {
    constructor() {
        this.hamburger = document.querySelector(".hamburger");
        this.mobileMenu = document.querySelector(".mobile-menu");
        this.isOpen = false;
        
        if (!this.hamburger || !this.mobileMenu) {
            console.error("Menu öðeleri bulunamadý!");
            return;
        }
        
        this.init();
    }
    
    init() {
        // Hamburger týklamasý
        this.hamburger.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggle();
        });
        
        // Menü linklerine týklamasý
        this.mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                this.close();
            });
        });
        
        // Body veya dýþarýya týklamasý
        document.addEventListener("click", (e) => {
            if (this.isOpen && 
                !this.hamburger.contains(e.target) && 
                !this.mobileMenu.contains(e.target)) {
                this.close();
            }
        });
        
        // Escape tuþu
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.isOpen) {
                this.close();
            }
        });
        
        // Scroll olduðunda kapat
        window.addEventListener("scroll", () => {
            if (this.isOpen) {
                this.close();
            }
        }, { passive: true });
    }
    
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    open() {
        this.isOpen = true;
        this.hamburger.classList.add("active");
        this.mobileMenu.classList.add("active");
        document.body.classList.add("menu-open");
        document.body.style.overflow = "hidden";
    }
    
    close() {
        this.isOpen = false;
        this.hamburger.classList.remove("active");
        this.mobileMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
        document.body.style.overflow = "";
    }
}

// Sayfasý yüklendikten sonra baþlat
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        new MobileMenu();
    });
} else {
    new MobileMenu();
}

// ============= ANIMASYON STÝLLERÝ =============
const menuStyles = document.createElement("style");
menuStyles.textContent = `
    * {
        -webkit-tap-highlight-color: transparent;
    }
    
    body.menu-open {
        overflow: hidden !important;
    }
    
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(10px); }
        20% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-10px); }
    }
    
    @keyframes slideDownFade {
        from {
            opacity: 0;
            transform: translateY(-100%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideUpFade {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-100%);
        }
    }
`;
document.head.appendChild(menuStyles);

// ============= HEADER SCROLL EFEKTÝ =============
const header = document.querySelector(".header");
if (header) {
    let lastScrollTop = 0;
    window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
        lastScrollTop = scrollTop;
    }, { passive: true });
}

// ============= WHATSAPP BUTON BÝLDÝRÝMÝ =============
const whatsappFloat = document.querySelector(".whatsapp-float");
if (whatsappFloat) {
    whatsappFloat.addEventListener("click", () => {
        const toast = document.createElement("div");
        toast.textContent = "WhatsApp açýlýyor...";
        toast.style.cssText = `
            position: fixed; bottom: 90px; right: 20px; background: #25d366; color: white; 
            padding: 12px 20px; border-radius: 50px; font-size: 14px; z-index: 9999;
            animation: fadeInOut 3s forwards;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    });
}

// ============= CONTACT FORM DOÐRULAMA =============
const contactForm = document.querySelector("form");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        const name = document.querySelector("#name")?.value.trim() || "";
        const email = document.querySelector("#email")?.value.trim() || "";
        const message = document.querySelector("#message")?.value.trim() || "";

        if (!name || !email || !message) {
            e.preventDefault();
            alert("Lütfen tüm alanlarý doldurunuz!");
            return false;
        }

        e.preventDefault();
        const text = `Merhaba,\nAdým: ${name}\nE-posta: ${email}\nMesaj: ${encodeURIComponent(message)}`;
        window.open(`https://wa.me/905555555555?text=${text}`, "_blank");
    });
}
