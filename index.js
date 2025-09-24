let cakesData = [];
let cart = [];

// Load cakes data and categories
fetch('cakes.json')
  .then(res => res.json())
  .then(data => {
    cakesData = data.cakes;
    displayCategories(data.categories);
    displayCakes(cakesData);
  });

// Display categories
function displayCategories(categories) {
  const categoriesEl = document.getElementById('categories');
  categories.forEach(cat => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `<button class="btn w-100 text-start" onclick="filterCategory('${cat.category_name}')">${cat.category_name}</button>`;
    categoriesEl.appendChild(li);
  });
}

// Filter cakes by categore
function filterCategory(category) {
  const filtered = cakesData.filter(c => c.category === category);
  displayCakes(filtered);
}

// Display cakes in grids
function displayCakes(cakes) {
  const cakesEl = document.getElementById('cakes');
  cakesEl.innerHTML = '';
  cakes.forEach(cake => {
    const div = document.createElement('div');
    div.className = 'col-md-6 col-lg-4';
    div.innerHTML = `
      <div class="card h-100 shadow-sm position-relative">
        <img src="${cake.image}" class="card-img-top" alt="${cake.name}">
        <div class="card-body">
          <h5 class="card-title" onmouseover="showTooltip(event, ${cake.id})" onmouseout="hideTooltip()">${cake.name}</h5>
          <p class="card-text"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${cake.price}</p>
          <button class="btn btn-success w-100" onclick="addToCart(${cake.id})">Add to Cart</button>
        </div>
      </div>
    `;
    cakesEl.appendChild(div);
  });
}

// Tooltip fur hover
const tooltip = document.createElement('div');
tooltip.style.position = 'absolute';
tooltip.style.background = 'white';
tooltip.style.padding = '10px';
tooltip.style.border = '1px solid #ccc';
tooltip.style.borderRadius = '5px';
tooltip.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
tooltip.style.display = 'none';
tooltip.style.zIndex = '9999';
document.body.appendChild(tooltip);

function showTooltip(e, id) {
  const cake = cakesData.find(c => c.id === id);
  tooltip.innerHTML = `
    <img src="${cake.image}" style="width:100px; height:100px; object-fit:cover; display:block; margin-bottom:5px;">
    <strong>${cake.name}</strong><br>
    <i class="fa-solid fa-bangladeshi-taka-sign"></i>${cake.price}<br>
    ${cake.description}
  `;
  tooltip.style.left = e.pageX + 10 + 'px';
  tooltip.style.top = e.pageY + 10 + 'px';
  tooltip.style.display = 'block';
}

function hideTooltip() {
  tooltip.style.display = 'none';
}

// Add cake to cart
function addToCart(id) {
  const cake = cakesData.find(c => c.id === id);
  cart.push(cake);
  updateCart();
  alert(`${cake.name} added to cart!`);
}

// Update cart 
function updateCart() {
  const cartList = document.getElementById('cartList');
  cartList.innerHTML = '';
  let total = 0;
  cart.forEach((c, index) => {
    total += c.price;
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      ${c.name} <i class="fa-solid fa-bangladeshi-taka-sign"></i>${c.price}
      <button class="btn btn-sm  " onclick="removeFromCart(${index})"><i class="fa-solid fa-xmark"></i></button>
    `;
    cartList.appendChild(li);
  });
  document.getElementById('cartTotal').innerHTML = `<i class="fa-solid fa-bangladeshi-taka-sign"></i>${total}`;
}

// Display gallery (only for gallery page)
function displayGallery(cakes) {
  const galleryEl = document.getElementById('gallery');
  if (!galleryEl) return; // If gallery div doesn't exist, skip
  galleryEl.innerHTML = '';
  cakes.forEach(cake => {
    const div = document.createElement('div');
    div.className = 'col-md-4 col-lg-3';
    div.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${cake.image}" class="card-img-top" alt="${cake.name}" style="height:200px; object-fit:cover;">
        <div class="card-body text-center">
          <h6 class="card-title">${cake.name}</h6>
        </div>
      </div>
    `;
    galleryEl.appendChild(div);
  });
}

// Fetch cakes data and populate gallery
fetch('cakes.json')
  .then(res => res.json())
  .then(data => {
    displayGallery(data.cakes);
  });


// Remove from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}
