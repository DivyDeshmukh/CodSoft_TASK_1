const input = document.querySelector ('#input-field input');
const add = document.querySelector ('#input-field button');
const list = document.querySelector ('#tasks #list');

add.addEventListener ('click', function () {
    // list.innerHTML = `<li class="item"><input type="checkbox"><span>${input.value}</span><button>delete</button></li>`

    if (input.value === '') {
        alert ('Please enter a valid task');
    }else {
        addItem();
    }
});

function addItem () {
    let newItem = document.createElement('li');
    newItem.classList.add('item')

    newItem.innerHTML = `<input type="checkbox"><span>${input.  value}</span><button class='button'>delete</button>`
    list.appendChild(newItem);

    deleteItem();

    input.value = '';
}

function saveList () {
    const items = [];
    document.querySelectorAll("#list li").forEach ( (val) => {
        items.push(val.innerHTML);
    });

    localStorage.setItem('listItems', JSON.stringify(items));
}

window.addEventListener ('load', function () {
    const storedItems = JSON.parse(localStorage.getItem('listItems'));
    createListItems(storedItems)
    
})

function createListItems (liItemsContent) {
    for (let i = 0; i < liItemsContent.length; i++) {
        let newItem = document.createElement('li');
        newItem.classList.add('item');
        list.appendChild(newItem);
    }

    document.querySelectorAll("#list li").forEach ( (item, index) => {
        // console.log(item, index);
        liItemsContent.forEach ( (item2, index2) => {
            if (index === index2) {
                item.innerHTML = `${item2}`;
                console.log(document.querySelector("#list li input").value);
            }
        });
    });

    deleteItem();

}


function deleteItem() {
    let removeItem = document.querySelectorAll ('.item .button');

    removeItem.forEach ( (value) => {
        value.addEventListener('click', function () {
            value.parentElement.remove();
            saveList();
        })
    } );
}// Function to add item to the list
function addItem() {
    if (input.value === '') {
        alert('Please enter a valid task');
    } else {
        let newItem = document.createElement('li');
        newItem.classList.add('item');
        newItem.innerHTML = `<input type="checkbox"><span>${input.value}</span><button class='button'>delete</button>`;
        list.appendChild(newItem);
        saveList(); // Save the updated list to localStorage
        input.value = '';
        attachDeleteListeners(); // Attach delete listeners after adding a new item
    }
}

// Function to load items from localStorage and create list items
window.addEventListener('load', function () {
    const storedItems = JSON.parse(localStorage.getItem('listItems'));
    if (storedItems) {
        createListItems(storedItems);
        attachDeleteListeners(); // Attach delete listeners after loading items
    }
});

// Function to create list items from stored content
function createListItems(liItemsContent) {
    list.innerHTML = liItemsContent.join('');
}

// Function to attach delete listeners to the buttons
function attachDeleteListeners() {
    let removeItem = document.querySelectorAll('.item .button');
    removeItem.forEach((value) => {
        value.addEventListener('click', function () {
            value.parentElement.remove();
            saveList();
        });
    });
}

// Function to save the list to localStorage
function saveList() {
    const items = [];
    document.querySelectorAll("#list li").forEach((val) => {
        items.push(val.outerHTML);
    });
    localStorage.setItem('listItems', JSON.stringify(items));
}



