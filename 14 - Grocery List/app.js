// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// Edit value
let editElement;
let editFlag = false;
let editId = "";

// ****** EVENT LISTENERS **********
// Listen for submit button input
form.addEventListener("submit", addItem);
// Listen for clear items button input
clearBtn.addEventListener('click', clearItems);
// Listen for window load to retrieve list from local storage
window.addEventListener('DOMContentLoaded', setupItems);

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault();
  const value = grocery.value
  const id = new Date().getTime().toString();
  // This condition adds the input the the list IF the value of the input is defined
  if(value && !editFlag){
//    console.log('add item to the list');
    createListItem(id,value);
            // Display success alert - Item added to the list
            displayAlert("Item added to the list", "success");
            // Show the container
            container.classList.add("show-container");
            // This saves the input data to local storage
            addToLocalStorage(id, value);
            // Reset to default
            setBackToDefault();
  }
  // This condition specifies that the input should either be editted or not depending on there being a value present as well as the editFlag variable being set to TRUE
  else if(value && editFlag){
//    console.log('editing');
    editElement.innerHTML = value;
    displayAlert('your item has been editted', 'success');
    // Edit local storage
    editLocalStorage(editId, value);
    setBackToDefault();
  }
  // This condition specifies what to do when the value of the input is empty or nothing was entered
  else{
    displayAlert("please enter an item", "danger");
//    console.log('empty value');
  }
}
// Display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  // Remove the alert message after a few seconds
  setTimeout(function(){
    alert.textContent = '';
    alert.classList.remove(`alert-${action}`);
  },1500);
}

// Clear the list of all items(values)
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");

  if(items.length > 0) {
    items.forEach(function(item) {
      list.removeChild(item);
    })
  }
  // This removes the container holding the clear list button after the items have all been removed
  container.classList.remove("show-container");
  displayAlert('your list has been cleared', "success");
  localStorage.removeItem('list');
  setBackToDefault();
}

// Edit button functionality
function editItem(e){
  const element = e.currentTarget.parentElement.parentElement;
  // Set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // Set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editId = element.dataset.id;
  submitBtn.textContent = "edit";
}

// Delete button functionality
function deleteItem(e){
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if(list.children.length === 0 ) {
    container.classList.remove("show-container");
  }
  displayAlert('item removed from list', 'success');
  setBackToDefault();
  // Remove the item from local storage
  removeFromLocalStorage(id);
}

// Reset to default
function setBackToDefault(){
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "submit";
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id,value){
//  console.log('added to local storage');
  const grocery = { id, value };
  // The following line looks for a value stored in localStorage with .getItem
  // If the value is found, then add it to the array
  //
  // The ?:[] means is as follows:
  // ?: means If null or undefined value is returned
  // [] means to set the variable to and empty array
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}
function removeFromLocalStorage(id){
  let items = getLocalStorage();

  items = items.filter(function(item) {
    if (item.id != id){
      return item
    }
  })
  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map(function(item){
    if ( item.id === id ){
      item.value = value;
    }
    return item;
  })
  localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage(){
  return localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")) : [];
}
// localStorage API
// setItem
// getItem
// removeItem
// Save as a string

// Alternate method using JSON library functions

// localStorage.setItem("orange", JSON.stringify(["item", "item-2"]));
// const oranges = JSON.parse(localStorage.getItem("orange"));
// console.log(oranges);
// localStorage.removeItem("orange");

// ****** SETUP ITEMS **********
function setupItems(){
  let items = getLocalStorage();
  if(items.length > 0 ){
    items.forEach(function(item){
      createListItem(item.id,item.value)
    })
    container.classList.add("show-container");
  }
}

function createListItem(id,value){
  const element = document.createElement('article');
    // Add a class to the element for document controls
    element.classList.add('grocery-item');
    // Add an id to the element for dataset controls
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    // This specifies what HTML code to use to create the individual item
    element.innerHTML = `<p class="title">${value}</p>
            <!-- Edit/Delete item buttons -->
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>`;
    // This initialises the edit and delete buttons now that they have been created via the above HTML insert
    const editBtn = element.querySelector('.edit-btn');
    const deleteBtn = element.querySelector('.delete-btn');
    // These event listeners can now listen for the click on edit and delete buttons
    editBtn.addEventListener('click', editItem);
    deleteBtn.addEventListener('click', deleteItem);
            // Append child element(s)
            list.appendChild(element);
}