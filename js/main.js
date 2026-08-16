// --- ДАННЫЕ МЕНЮ: 9 карточек ---
const products = [
    {
        id: 1,
        title: "Тартин на закваске",
        category: "bread",
        price: 450,
        desc: "Классический французский хлеб с хрустящей корочкой и крупными порами.",
        allergens: "Глютен",
        freshTime: "Выпечка в 08:00",
        img: "https://images.unsplash.com/photo-1585476263060-b55d77188d1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Багет традиционный",
        category: "bread",
        price: 180,
        desc: "Хрустящая корочка, воздушный мякиш. Идеален с маслом и солью.",
        allergens: "Глютен",
        freshTime: "Выпечка в 07:30",
        img: "https://images.unsplash.com/photo-1597079910443-60c43fc4f729?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Фокачча с розмарином",
        category: "bread",
        price: 320,
        desc: "Итальянская лепёшка с оливковым маслом, розмарином и морской солью.",
        allergens: "Глютен",
        freshTime: "Выпечка в 09:00",
        img: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        title: "Ржаной с семечками",
        category: "bread",
        price: 390,
        desc: "Плотный, влажный мякиш, обсыпка из подсолнечника и льна.",
        allergens: "Глютен, Семечки",
        freshTime: "Выпечка в 09:30",
        img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        title: "Круассан классический",
        category: "pastry",
        price: 190,
        desc: "Масляное слоёное тесто, 27 слоёв, золотистая корочка.",
        allergens: "Глютен, Молоко, Яйца",
        freshTime: "Выпечка в 07:00",
        img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        title: "Синнамон-ролл",
        category: "pastry",
        price: 240,
        desc: "Мягкая булочка с корицей, глазурью сливочного сыра и орехами пекан.",
        allergens: "Глютен, Молоко, Яйца, Орехи",
        freshTime: "Выпечка в 08:30",
        img: "https://images.unsplash.com/photo-1509365390695-33aee754301f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7,
        title: "Галета с ягодами",
        category: "pastry",
        price: 380,
        desc: "Открытый пирог с сезонными ягодами и миндальным кремом на песочном тесте.",
        allergens: "Глютен, Молоко, Яйца, Орехи",
        freshTime: "Выпечка в 10:00",
        img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        title: "Флэт Уайт",
        category: "coffee",
        price: 290,
        desc: "Двойной эспрессо и немного вспененного молока. Эфиопия Иргачефф.",
        allergens: "Молоко (можно заменить на овсяное)",
        freshTime: "Всегда свежий",
        img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 9,
        title: "Капучино",
        category: "coffee",
        price: 270,
        desc: "Классический баланс кофе и молочной пены. Бразилия Сантос.",
        allergens: "Молоко",
        freshTime: "Всегда свежий",
        img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
];

// --- СОСТОЯНИЕ КОРЗИНЫ ---
let cart = [];

// --- ИНИЦИАЛИЗАЦИЯ ---
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupDatepicker();
    setupScrollHeader();
    setupFadeInObserver();
});

// --- РЕНДЕР МЕНЮ ---
function renderProducts(items) {
    const container = document.getElementById('products-container');
    if (!container) return;
    container.innerHTML = '';

    items.forEach(product => {
        const catLabel = { bread: 'Хлеб', pastry: 'Выпечка', coffee: 'Кофе' }[product.category] || product.category;
        const card = document.createElement('div');
        card.className = 'product-card fade-in';
        card.innerHTML = `
            <div class="product-img-wrap">
                <img src="${product.img}" alt="${product.title}" class="product-img" loading="lazy">
            </div>
            <div class="product-info">
                <div class="product-category">${catLabel}</div>
                <div class="product-header">
                    <span class="product-title">${product.title}</span>
                    <span class="product-price">${product.price} ₽</span>
                </div>
                <div class="fresh-timer">🕒 ${product.freshTime}</div>
                <p class="product-desc">${product.desc}</p>
                <p class="allergens">⚠️ Аллергены: ${product.allergens}</p>
                <button class="add-btn" onclick="addToCart(${product.id})">В корзину</button>
            </div>
        `;
        container.appendChild(card);
    });
    // Перезапускаем observer для новых карточек
    setupFadeInObserver();
}

// --- ФИЛЬТРАЦИЯ ---
function filterMenu(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// --- ЛОГИКА КОРЗИНЫ ---
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCartUI();
    showToast(`«${product.title}» добавлен`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) removeFromCart(id);
        else updateCartUI();
    }
}

function updateCartUI() {
    const countEl = document.getElementById('cart-count');
    const itemsContainer = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total');

    if (!countEl || !itemsContainer || !totalEl) return;

    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    countEl.textContent = totalCount;

    if (cart.length === 0) {
        itemsContainer.innerHTML = '<p style="text-align: center; color: #999; margin-top: 50px;">Корзина пуста 😔</p>';
        totalEl.textContent = '0 ₽';
        return;
    }

    itemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        const el = document.createElement('div');
        el.className = 'cart-item';
        el.innerHTML = `
            <div class="cart-item-info">
                <h5>${item.title}</h5>
                <p>${item.price} ₽ × ${item.qty}</p>
            </div>
            <div class="cart-controls">
                <button onclick="changeQty(${item.id}, -1)">−</button>
                <span style="font-weight: bold; min-width: 20px; text-align: center;">${item.qty}</span>
                <button onclick="changeQty(${item.id}, 1)">+</button>
            </div>
        `;
        itemsContainer.appendChild(el);
    });

    totalEl.textContent = `${total.toLocaleString('ru-RU')} ₽`;
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (!modal) return;
    modal.classList.toggle('open');
    document.body.style.overflow = modal.classList.contains('open') ? 'hidden' : '';
}

// Корзина → предзаказ: скролл + вставка состава
function scrollToOrder() {
    toggleCart();
    const orderSection = document.getElementById('order');
    if (!orderSection) return;
    orderSection.scrollIntoView({ behavior: 'smooth' });

    const orderItems = document.getElementById('order-items');
    if (cart.length > 0 && orderItems) {
        const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
        const text = cart.map(i => `• ${i.title} — ${i.qty} шт. × ${i.price} ₽`).join('\n');
        orderItems.value = text + `\n\nИтого: ${total.toLocaleString('ru-RU')} ₽`;
    } else if (orderItems) {
        orderItems.value = '';
    }
}

// --- УВЕДОМЛЕНИЯ ---
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
}

// --- ДАТАПИКЕР ---
function setupDatepicker() {
    const input = document.getElementById('pickup-time');
    if (!input) return;
    const now = new Date();
    // Устанавливаем минимальную дату - текущее время с округлением до ближайших 30 минут
    const minutes = now.getMinutes();
    const roundedMinutes = Math.ceil(minutes / 30) * 30;
    now.setMinutes(roundedMinutes);
    if (roundedMinutes >= 60) {
        now.setHours(now.getHours() + 1);
        now.setMinutes(0);
    }
    // Форматируем для datetime-local (YYYY-MM-DDTHH:MM)
    const localTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    input.min = localTime.toISOString().slice(0, 16);
}

// --- ОФОРМЛЕНИЕ ЗАКАЗА ---
function handleCheckout(e) {
    e.preventDefault();
    if (cart.length === 0) {
        alert('Сначала добавьте товары в корзину!');
        return;
    }

    const name = document.getElementById('order-name');
    const phone = document.getElementById('order-phone');
    const time = document.getElementById('pickup-time');
    const method = document.getElementById('order-method');
    const itemsText = document.getElementById('order-items');

    if (!name || !phone || !time || !method || !itemsText) {
        alert('Ошибка формы. Обновите страницу и попробуйте снова.');
        return;
    }

    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Отправка…';
    btn.disabled = true;

    // Сборка сообщения
    const message = `Предзаказ Hearth & Crumb\n\nИмя: ${name.value.trim()}\nТелефон: ${phone.value.trim()}\nВремя: ${time.value}\nСпособ: ${method.value}\n\nСостав:\n${itemsText.value}`;

    // TODO: заменить на реальный Telegram-бот или WhatsApp Business API
    setTimeout(() => {
        alert('Спасибо! Ваш заказ принят. Мы свяжемся с вами для подтверждения.\n\n' + message);
        // window.open(`https://t.me/share/url?text=${encodeURIComponent(message)}`, '_blank');
        cart = [];
        updateCartUI();
        itemsText.value = '';
        e.target.reset();
        btn.textContent = originalText;
        btn.disabled = false;
    }, 1200);
}

// --- HEADER SCROLL ---
function setupScrollHeader() {
    const header = document.getElementById('main-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });
}

// --- FADE-IN OBSERVER ---
function setupFadeInObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}