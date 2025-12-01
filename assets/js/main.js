/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu');
    });
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () =>{
    navMenu.classList.remove('show-menu');
};
navLink.forEach(n => n.addEventListener('click', linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header');
    window.scrollY >= 50 
        ? header.classList.add('scroll-header') 
        : header.classList.remove('scroll-header');
};
window.addEventListener('scroll', scrollHeader);

/*=============== TESTIMONIAL SWIPER ===============*/
let testimonialSwiper = new Swiper(".testimonial-swiper", {
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

/*=============== NEW SWIPER ===============*/
let newSwiper = new Swiper(".new-swiper", {
    spaceBetween: 24,
    loop: true,
    breakpoints: {
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
    },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () =>{
    const scrollDown = window.scrollY;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link');
        }else{
            sectionsClass.classList.remove('active-link');
        }
    });
};
window.addEventListener('scroll', scrollActive);

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () =>{
    const scrollUpBtn = document.getElementById('scroll-up');
    if(scrollUpBtn){
        window.scrollY >= 350 
            ? scrollUpBtn.classList.add('show-scroll') 
            : scrollUpBtn.classList.remove('show-scroll');
    }
};
window.addEventListener('scroll', scrollUp);

/*=============== SHOW CART ===============*/
const cart = document.getElementById('cart');
const cartShop = document.getElementById('cart-shop');
const cartClose = document.getElementById('cart-close');

if(cartShop){
    cartShop.addEventListener('click', () =>{
        cart.classList.add('show-cart');
    });
}
if(cartClose){
    cartClose.addEventListener('click', () =>{
        cart.classList.remove('show-cart');
    });
}

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun';

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

/*=============== CART LOGIC ===============*/
const cartContainer = document.querySelector(".cart__container");
const cartPricesItem = document.querySelector(".cart__prices-item");
const cartPricesTotal = document.querySelector(".cart__prices-total");
const cartBuyAll = document.getElementById("cart-buy-all");

let cartItems = [];

// Update tampilan keranjang
function updateCart() {
    cartContainer.innerHTML = "";
    let totalPrice = 0;
    let totalItems = 0;

    cartItems.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
        totalItems += item.quantity;

        const article = document.createElement("article");
        article.classList.add("cart__card");
        article.innerHTML = `
            <div class="cart__box">
                <img src="${item.img}" alt="${item.title}" class="cart__img">
            </div>
            <div class="cart__details">
                <h3 class="cart__title">${item.title}</h3>
                <span class="cart__price">$${item.price}</span>
                <div class="cart__amount">
                    <div class="cart__amount-content">
                        <span class="cart__amount-box" onclick="changeQuantity(${index}, -1)">
                            <i class='bx bx-minus'></i>
                        </span>
                        <span class="cart__amount-number">${item.quantity}</span>
                        <span class="cart__amount-box" onclick="changeQuantity(${index}, 1)">
                            <i class='bx bx-plus'></i>
                        </span>
                    </div>
                    <i class='bx bx-trash-alt cart__amount-trash' onclick="removeItem(${index})"></i>
                </div>
            </div>
        `;
        cartContainer.appendChild(article);
    });

    cartPricesItem.textContent = `${totalItems} item`;
    cartPricesTotal.textContent = `$${totalPrice}`;
}

// Tambah ke keranjang
function addToCart(title, price, img) {
    const existingItem = cartItems.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ title, price, img, quantity: 1 });
    }
    updateCart();
    cart.style.display = "block"; // otomatis buka keranjang
}

// Ubah jumlah item
function changeQuantity(index, amount) {
    cartItems[index].quantity += amount;
    if (cartItems[index].quantity <= 0) {
        cartItems.splice(index, 1);
    }
    updateCart();
}

// Hapus item
function removeItem(index) {
    cartItems.splice(index, 1);
    updateCart();
}

// Tombol beli semua
cartBuyAll.addEventListener("click", () => {
    if (cartItems.length === 0) {
        alert("Keranjang kosong!");
    } else {
        let total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        alert(`Terima kasih sudah membeli semua barang!\nTotal: $${total}`);
        cartItems = [];
        updateCart();
    }
});

// Tutup keranjang
cartClose.addEventListener("click", () => {
    cart.style.display = "none";
});

// ==================== FEATURED PRODUCTS ==================== //
document.querySelectorAll(".featured__card").forEach(card => {
    const title = card.querySelector(".featured__title").textContent;
    const price = parseFloat(card.querySelector(".featured__price").textContent.replace("$", ""));
    const img = card.querySelector(".featured__img").src;

    card.querySelector(".featured__button").addEventListener("click", () => {
        addToCart(title, price, img);
    });

    card.querySelector(".buy__button").addEventListener("click", () => {
        alert(`Anda membeli ${title} seharga $${price}`);
    });
});

// ==================== HOME SECTION ==================== //
document.querySelector(".home__button").addEventListener("click", () => {
    const title = document.querySelector(".home__title").textContent;
    const price = parseFloat(document.querySelector(".home__price").textContent.replace("$", ""));
    const img = document.querySelector(".home__img").src;

    addToCart(title, price, img);
});

// ==================== PRODUCTS SECTION ==================== //
document.querySelectorAll(".products__card").forEach(card => {
    const title = card.querySelector(".products__title").textContent;
    const price = parseFloat(card.querySelector(".products__price").textContent.replace("$", ""));
    const img = card.querySelector(".products__img").src;

    card.querySelector(".buy__button").addEventListener("click", () => {
        alert(`Anda membeli ${title} seharga $${price}`);
    });

    card.querySelector(".products__button").addEventListener("click", () => {
        addToCart(title, price, img);
    });
});

// ==================== NEW SECTION ==================== //
document.querySelectorAll(".new__card").forEach(card => {
    const title = card.querySelector(".new__title").textContent;
    const price = parseFloat(card.querySelector(".new__price").textContent.replace("$", ""));
    const img = card.querySelector(".new__img").src;

    const buyBtn = card.querySelector(".buy__button");
    if (buyBtn) {
        buyBtn.addEventListener("click", () => {
            alert(`Anda membeli ${title} seharga $${price}`);
        });
    }

    const cartBtn = card.querySelector(".new__button");
    if (cartBtn) {
        cartBtn.addEventListener("click", () => {
            addToCart(title, price, img);
        });
    }
});

function addToCart(title, price, img) {
    const existingItem = cartItems.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ title, price, img, quantity: 1 });
    }
    updateCart();
    cart.style.display = "block"; // otomatis buka keranjang

    // Notifikasi sederhana
    alert(`${title} berhasil ditambahkan ke keranjang!`);
}

document.querySelector('.newsletter__subscribe').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = document.querySelector('.newsletter__subscribe');

    // Ambil data dari input
    const email = form.querySelector('input[type="email"]').value.trim();
    const name = form.querySelector('input[type="name"]').value.trim();
    const message = form.querySelector('input[type="text"]').value.trim();

    // Validasi: cek apakah ada yang kosong
    if (!email || !name || !message) {
        alert("Harap isi semua field (Nama, Email, dan Pesan) sebelum mengirim.");
        return; // hentikan proses
    }

    // Format pesan ke Telegram
    const text = `📩 Pesan Baru dari Website NDANATHAR\n\n👤 Nama: ${name}\n📧 Email: ${email}\n📝 Pesan: ${message}`;

    // Token & Chat ID (ganti dengan milikmu)
    const token = "8258338893:AAFTdYJ00vX-zUcdP6yfGNFi90xZz7VW7wM";
    const chatId = "8063917939";

    // Kirim ke Telegram
    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: "HTML"
        })
    })
    .then(res => res.json())
    .then(data => {
        alert("Pesan berhasil dikirim ke admin!");
        // Reset form setelah sukses
        form.reset();
    })
    .catch(err => {
        alert("Gagal mengirim pesan.");
        console.error(err);
    });
});