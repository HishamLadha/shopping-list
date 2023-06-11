// Variables 
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clear = document.getElementById('clear');
const filter = document.getElementById('filter');

function displayItems(){
    const itemStorageArray = getItemFromStorage();

    itemStorageArray.forEach(item => {
        addToDOM(item);
    });

   checkUI();
}

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

function addToDOM(item){
// Create list item
const li = document.createElement('li');

li.appendChild(document.createTextNode(item));

const button = createButtom('remove-item btn-link text-red');
li.appendChild(button);

itemList.appendChild(li);
}

function addToStorage(item){
    
    const itemStorageArray = getItemFromStorage();
    // Now that we have the array, push the item to the local storage
    itemStorageArray.push(item);

    // Then set the local storage element 'items' to the value of the array now.
    localStorage.setItem('items', JSON.stringify(itemStorageArray));

}

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







// Create button function
const createButtom = (classes) => {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

const createIcon = (classes) => {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}


function clearAll(){
    if (confirm('Are you sure?')) {
    while(itemList.firstChild){
    itemList.removeChild(itemList.firstChild);
   }
}
   checkUI();
}

function removeItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){ 
      e.target.parentElement.parentElement.remove();
    }
    
    checkUI();
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

function init(){

// Event Listeners
itemForm.addEventListener('submit', addItemOnSubmit);
itemList.addEventListener('click', removeItem);
clear.addEventListener('click', clearAll);
filter.addEventListener('input', filterFunctionality);
document.addEventListener('DOMContentLoaded', displayItems);

}

init();


