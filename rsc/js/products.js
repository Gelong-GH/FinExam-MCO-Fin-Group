// JavaScript for Products Page - Cart Functionality and Animations

// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem('totoroCart')) || [];
updateCartCount();

// Add to Cart Functionality
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        const itemName = this.getAttribute('data-item');
        cart.push(itemName);
        localStorage.setItem('totoroCart', JSON.stringify(cart));
        updateCartCount();
        showToast();
    });
});

// Update Cart Count in Header
function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
}

// Show Cart Modal with Items
document.getElementById('cartModal').addEventListener('show.bs.modal', function() {
    const cartItemsList = document.getElementById('cartItems');
    const emptyCartMsg = document.getElementById('emptyCart');
    cartItemsList.innerHTML = '';
    
    if (cart.length === 0) {
        emptyCartMsg.style.display = 'block';
    } else {
        emptyCartMsg.style.display = 'none';
        const itemCounts = {};
        cart.forEach(item => {
            itemCounts[item] = (itemCounts[item] || 0) + 1;
        });
        
        for (const [item, count] of Object.entries(itemCounts)) {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `${item} <span class="badge bg-success rounded-pill">${count}</span> <button class="btn btn-sm btn-danger" onclick="removeItem('${item}')">Remove</button>`;
            cartItemsList.appendChild(li);
        }
    }
});

// Remove Item from Cart
function removeItem(itemName) {
    const index = cart.indexOf(itemName);
    if (index > -1) {
        cart.splice(index, 1);
        localStorage.setItem('totoroCart', JSON.stringify(cart));
        updateCartCount();
        // Re-show modal to update list
        const modal = new bootstrap.Modal(document.getElementById('cartModal'));
        modal.show();
    }
}

// Clear Entire Cart
function clearCart() {
    cart = [];
    localStorage.removeItem('totoroCart');
    updateCartCount();
    document.getElementById('cartItems').innerHTML = '';
    document.getElementById('emptyCart').style.display = 'block';
}

// Show Toast Notification
function showToast() {
    const toast = new bootstrap.Toast(document.getElementById('cartToast'));
    toast.show();
}

// Card Hover Animations
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
        this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
    });
});
