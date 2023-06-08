// Variables 
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

const addItem = (e) => {
    e.preventDefault(); // So form doesnt actually submit to file

    const newItem = itemInput.value
    // Validate Input
    if(newItem === ''){
        alert('Please add an item');
        return;
    }

    // Create list item
    const li = document.createElement('li');

    li.appendChild(document.createTextNode(newItem));
    
    const button = createButtom('remove-item btn-link text-red');
    li.appendChild(button);
    
    itemList.appendChild(li);

    itemInput.value = '';
    
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

// Event Listeners
itemForm.addEventListener('submit', addItem);