// Global variables
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clear = document.getElementById('clear');
const filter = document.getElementById('filter');

// Display items from local storage onto the DOM
function displayItems(){
    const itemStorageArray = getItemFromStorage();

    itemStorageArray.forEach(item => {
        addToDOM(item);
    });

   checkUI();
}

// Add an item to the DOM and to local storage once the submit button is pressed.
const addItemOnSubmit = (e) => {
    e.preventDefault(); // So form doesnt actually submit to file

    const newItem = itemInput.value;
    // Validate Input
    if(newItem === ''){
    alert('Please add an item');
    return;
    }
    
    addToDOM(newItem);
    addToStorage(newItem);

    checkUI();

    itemInput.value = '';
    
}

// Add an item to the DOM
function addToDOM(item){
// Create list item
const li = document.createElement('li');

li.appendChild(document.createTextNode(item));

const button = createButtom('remove-item btn-link text-red');
li.appendChild(button);

itemList.appendChild(li);
}

// Add an item to local storage
function addToStorage(item){
    
    const itemStorageArray = getItemFromStorage();
    // Now that we have the array, push the item to the local storage
    itemStorageArray.push(item);

    // Then set the local storage element 'items' to the value of the array now.
    localStorage.setItem('items', JSON.stringify(itemStorageArray));

}

// Get an item from local storage
function getItemFromStorage(){
    // Declare a variable to work with which will hold everything in local storage
    let itemStorageArray;

    // If local storage element 'items' is empty
    // Make itemStorageArray an array
    if(localStorage.getItem('items') === null){
        itemStorageArray = [];
    }
    // Otherwise, it already exists and we need to store it in the array declared above
    else{
        // Parse it with JSON.parse because it is stored as an array of strings 
        itemStorageArray = JSON.parse(localStorage.getItem('items'));
    }
    return itemStorageArray;
}

// Handles the removal of an item
function onItemClick(e){
    if(e.target.parentElement.classList.contains('remove-item')){ 
        // Remove from DOM
        removeItem(e.target.parentElement.parentElement);
        
        // Now remove from local storage
        removeFromStorage(e.target.parentElement.parentElement.textContent);

      }
}

// Remove a list item from local storage
function removeFromStorage(item){
    let itemFromStorage = getItemFromStorage();

    // Use the filter function which requires a callback function that checks to see if the item is not equal to an element in the array
    // Return everything except the element selected basically.
    // Store that back in the same array which will be stored again in local storage below.
    itemFromStorage = itemFromStorage.filter((i) =>i !== item);
    localStorage.setItem('items', JSON.stringify(itemFromStorage));
    
}

// Remove an item from the DOM
function removeItem(item){
    item.remove();
    
    checkUI();
}

// Clears all items from the DOM and from local storage
function clearAll(){
    if (confirm('Are you sure?')) {
    while(itemList.firstChild){
    itemList.removeChild(itemList.firstChild);
   }
   // Clear items from local storage
   localStorage.removeItem('items');
}
   checkUI();
}

// Create button function for a list item (the X mark)
const createButtom = (classes) => {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

// Create an icon for a list item
const createIcon = (classes) => {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

// Dynamically remove the clearAll and the Filter components when there are no items
function checkUI(){
    const items = itemList.querySelectorAll('li');
    if(items.length === 0){
        filter.style.display = 'none';
        clear.style.display = 'none';
    }
    else{
        filter.style.display = 'block';
        clear.style.display = 'block';
    }
}

// Implementing the filter functionality
// If a list item contains a letter inputted by the user, then display it
// Else hide it from the DOM using the css style display = 'none';
function filterFunctionality(e){
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    
    items.forEach((item) =>{
        const itemText = item.firstChild.textContent.toLowerCase(); // first child is text node
        
        if(itemText.indexOf(text) != -1){
            item.style.display = 'flex';
        }else{
            item.style.display = 'none';
        }
    });

}

// Initializes all the event listeners on the page
function init(){
// Event Listeners
itemForm.addEventListener('submit', addItemOnSubmit);
itemList.addEventListener('click', onItemClick);
clear.addEventListener('click', clearAll);
filter.addEventListener('input', filterFunctionality);
document.addEventListener('DOMContentLoaded', displayItems);

}

init();


