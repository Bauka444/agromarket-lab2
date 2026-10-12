const API_URL = 'http://localhost:3001/products';

let cartCount = 0;

// Получаем товары с сервера (json-server) и рисуем их
async function loadProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Ошибка сервера: ' + response.status);
    }
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    showError('Не удалось загрузить товары. Проверьте, что json-server запущен (порт 3001).');
    console.error(error);
  }
}

// Строим карточки товаров через DOM
function renderProducts(products) {
  const catalog = document.querySelector('.catalog');
  const cartCountEl = document.querySelector('#cart-count');

  products.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price} тг</p>
      <button>В корзину</button>
    `;

    // Счётчик корзины: обработчик вешаем сразу при создании карточки
    card.querySelector('button').addEventListener('click', () => {
      cartCount++;
      cartCountEl.textContent = cartCount;
    });

    catalog.appendChild(card);
  });
}

// Сообщение об ошибке вместо белого экрана
function showError(message) {
  const catalog = document.querySelector('.catalog');
  const error = document.createElement('p');
  error.className = 'error';
  error.textContent = message;
  catalog.appendChild(error);
}

loadProducts();
