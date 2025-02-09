document.addEventListener("DOMContentLoaded", () => {
  const product = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.99 },
  ];

  const cart = JSON.parse(localStorage.getItem("store")) || [];

  
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCart = document.getElementById("empty-cart");
  const cartTotal = document.getElementById("cart-total");
  const totalPrice = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");
  
  displayProduct();
  if(cart.length>0) renderCart();
  addToCart();

  checkOutBtn.addEventListener("click" , () => {
    if (cart.length > 0) {
        cart.length = 0;
        alert("Checkout successful");
        renderCart();
    }
    })

  cartItems.addEventListener("click" , (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.classList.contains('removeBtn')) {
      const index = e.target.getAttribute("data-index"); // Get the index from the button
      cart.splice(index, 1); // Remove the item from the cart array
      storeCart(); // Update localStorage
      renderCart(); // Re-render the cart
    }
  })


  function displayProduct() {
    product.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
    <span>${product.name} - $${product.price}</span>
    <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
    });
  }

  function addToCart(){
    document.addEventListener('click' , (e) => {
        if(e.target.tagName === 'BUTTON' && e.target.getAttribute("data-id")){
            const id = parseInt(e.target.getAttribute("data-id"))
            const productget = product.find((p) => p.id === id)
            cart.push(productget);
            renderCart();
            storeCart();
        }
    })
  }

  function renderCart(){
    cartItems.innerText = "";
    let total = 0;
  
    if(cart.length > 0){
        console.log(cart);
        
        cart.forEach((c,index) => {
            if(c){
            const child = document.createElement("div");
            child.innerHTML = `
                                <span>${c.name} - $${c.price.toFixed(2)}</span>
                                <button class="removeBtn" data-index="${index}">Remove</button>
                              `;
            child.classList.add("removeBtn")
            cartItems.appendChild(child);
            total += c.price 
            }
        })
        totalPrice.textContent = `${total.toFixed(2)}`
        cartTotal.classList.remove("hidden")
        emptyCart.classList.add("hidden");
    }else{
        cartTotal.classList.add("hidden")
        emptyCart.classList.remove("hidden");
    }
  }

  function storeCart(){
      localStorage.setItem("store" , JSON.stringify(cart));
  }
    
  
});
