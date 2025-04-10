let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'PPF- Paint Protection Film',
        image: 'ppf.png',
        price: 12000
    },
    {
        id: 2,
        name: '3M Car Rubbing & Polishing',
        image: '3m.PNG',
        price: 13000
    },
    {
        id: 3,
        name: 'Ceramic Coating',
        image: 'cera.PNG',
        price: 15000
    },
    {
        id: 4,
        name: "Meguiar's Ceramic Coating",
        image: 'megce.PNG',
        price: 17000
    },
    {
        id: 5,
        name: '3M Tefon Coating',
        image: 'tef.PNG',
        price: 22000
    },
    {
        id: 6,
        name: "Meguiar's Teflon Coating",
        image: 'megtef.PNG',
        price: 16000
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
    
    // Make total price clickable
    if (count > 0) {
        total.style.cursor = 'pointer';
        total.title = 'Click to proceed to checkout';
        total.addEventListener('click', function() {
            // Save cart data to localStorage
            localStorage.setItem('cartItems', JSON.stringify(listCards));
            localStorage.setItem('cartTotal', totalPrice);
            // Navigate to checkout page
            window.location.href = 'checkout.html';
        });
    } else {
        total.style.cursor = 'default';
        total.title = '';
        // Remove event listener when cart is empty
        total.replaceWith(total.cloneNode(true));
        total = document.querySelector('.total'); // Reselect the element
    }
    
    // Add checkout button if items in cart
    let checkoutBtn = document.querySelector('.checkoutBtn');
    if (count > 0) {
        if (!checkoutBtn) {
            checkoutBtn = document.createElement('div');
            checkoutBtn.classList.add('checkoutBtn');
            checkoutBtn.innerText = 'Proceed to Checkout';
            checkoutBtn.addEventListener('click', () => {
                // Save cart data to localStorage
                localStorage.setItem('cartItems', JSON.stringify(listCards));
                localStorage.setItem('cartTotal', totalPrice);
                // Navigate to checkout page
                window.location.href = 'checkout.html';
            });
            document.querySelector('.checkOut').appendChild(checkoutBtn);
        }
    } else if (checkoutBtn) {
        checkoutBtn.remove();
    }
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}