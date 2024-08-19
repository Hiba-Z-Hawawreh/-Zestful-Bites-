const products = [
    { name: 'Cherry', price: 10.00, quantity: 0, productId: '1', image: 'https://www.albayan.ae/polopoly_fs/1.4143307.1618604654!/image/image.jpg' },
    { name: 'Strawberry', price: 18.00, quantity: 0, productId: '2', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHmAwqeExHxw9dQmPGaIcEgEXjIlaHO44Uxg&s' },
    { name: 'Orange Fruit', price: 20.00, quantity: 0, productId: '3', image: 'https://sc02.alicdn.com/kf/H7bc10ec7d8db4a9fbf590624e6042619k/Fresh-orange-fruit-green.jpg' },
    { name: 'Kiwi', price: 15.00, quantity: 0, productId: '4', image: 'https://img.youm7.com/ArticleImgs/2019/8/25/2436845-%D9%83%D9%8A%D9%88%D9%89.jpg' },
    { name: 'Apricot', price: 13.00, quantity: 0, productId: '5', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ62ZaqfOxkSvNwYKGbdNk2o_U2arUFBt3U-Q&s' },
    { name: 'Pomegranate', price: 19.00, quantity: 0, productId: '6', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBpuABzImmcTweDOhe4tFyscRD9WuzfpNsfg&s' }
];

let cart = [];

let totalPaid = 0;



function addProductToCart(productId) {
    const product = products.find(p => p.productId === productId);
    if (!product) return;

    if (!cart[productId]) {
        cart[productId] = { ...product, quantity: 1 };
    } else {
        cart[productId].quantity++;
    }
    updateCart();
}

function increaseQuantity(productId) {
    if (cart[productId]) {
        cart[productId].quantity++;
        updateCart();
    }
}

function decreaseQuantity(productId) {
    if (cart[productId]) {
        cart[productId].quantity--;
        if (cart[productId].quantity <= 0) {
            removeProductFromCart(productId);
        } else {
            updateCart();
        }
    }
}


function removeProductFromCart(productId) {
    delete cart[productId];
    updateCart();
}


function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    let total = 0;

    for (const id in cart) {
        const item = cart[id];
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <p>${item.name}</p>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-controls">
                <button onclick="decreaseQuantity(${item.productId})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${item.productId})">+</button>
                <button onclick="removeProductFromCart(${item.productId})">Remove</button>
            </div>
            <p>$${itemTotal.toFixed(2)}</p>
        `;
        cartItems.appendChild(cartItem);
    }

    document.getElementById('total-amount').innerText = total.toFixed(2);
}


function Pay() {
    const totalAmount = parseFloat(document.getElementById('total-amount').textContent);
    const amountReceived = parseFloat(document.getElementById('amount-received').value) || 0;
    const receiptDiv = document.getElementById('receipt');
    
    if (amountReceived < totalAmount) {
        receiptDiv.innerHTML = `
            <p id="cash-received">Cash Received: $${amountReceived.toFixed(2)}</p>
            <p id="remaining-balance">Remaining Balance: $${(totalAmount - amountReceived).toFixed(2)}</p>
            <p id="cash-returned">Cash Returned: $0.00</p>
            <p id="thank-you"></p>
        `;
    } else {
        const cashReturned = amountReceived - totalAmount;
        receiptDiv.innerHTML = `
            <p id="cash-received">Cash Received: $${amountReceived.toFixed(2)}</p>
            <p id="remaining-balance">Remaining Balance: $0.00</p>
            <p id="cash-returned">Cash Returned: $${cashReturned.toFixed(2)}</p>
            <p id="thank-you">Thank you!</p>
        `;
    }
 }
    function cartTotal() {
        return cart.reduce((total, item) => total + (item.quantity * item.price), 0);
      }
  
      