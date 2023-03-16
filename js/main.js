var form = document.querySelector('#form');
var btn = document.querySelector('.btn');
var inputBox = document.getElementById('input-box');
var items = document.getElementById('items');
let alertError = document.querySelector('.alert-error');
let alertSuccess = document.querySelector('.alert-success');
let editedItem = null;

/* 
    This function is responsible for creating 
    new element and also for formatting the
    newly created element
*/
function createNewElement(tagName, style = null, text = null) {
    var date = new Date();
    var formatDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    var element = document.createElement(tagName);
    element.setAttribute('class', style);
    element.setAttribute('id', style);
    if (text !== null) {
    element.innerHTML = 
        `<div class='list-content'>
        <p class='content' title="Double click to mark/unmark an item">${text}</p>
        <div class='action'>
            <a id='delete' class="delete"><i class='fa fa-trash'></i></a>
            <a id='edit' class="edit"><i class='fa fa-edit'></i></a>
        </div>
        </div>
        <div class='time'>
        <small id='created_at'>Created at: <span>${formatDate}</span></small>
        </div>`;
    }

    return element;
}

// function for adding new item
function addItem(e) {
    e.preventDefault();
    // console.log(e);
    if (inputBox.value == '') {
    // set error message 
    alertError.innerHTML = '<span class="fa fa-times-circle"></span> <span>Please enter a todo-item<span>';

    // display error message
    alertError.style.display = 'block';

    // dismiss error message in 2sec
    setTimeout(function() {
        alertError.style.display = 'none';
    }, 3000)
    } else {
    if (btn.value == 'submit') {
        var outputGroup = createNewElement('div', 'output-group', inputBox.value);

        // set success message
        alertSuccess.innerHTML = '<span class="fa fa-check-circle"></span> <span>New item added</span>';

        // add to item list
        items.append(outputGroup);

        // display success message
        alertSuccess.style.display = 'block';

        // dismiss success message in 2sec
        setTimeout(function() {
        alertSuccess.style.display = 'none';
        }, 3000);

        // clear input box when new item is added for next item
        inputBox.value = '';

        // checking if todo-list is empty
        emptyList();
        } else {
            // updating an existing item
            updateItem();
        }
    }
}

// function for updating item
function updateItem() {
    editedItem.target.parentNode.parentNode.parentNode.childNodes[1].textContent = inputBox.value;
    // set success message
    alertSuccess.innerHTML = '<span class="fa fa-check-circle"></span> <span>Text item updated</span>';

    // display success message
    alertSuccess.style.display = 'block';

    // reset button icon
    btn.innerHTML = "<i class='fa fa-plus'></i>";

    // reset button value to 'submit'
    btn.value = 'submit';

    // dismiss success message in 2sec
    setTimeout(function() {
        alertSuccess.style.display = 'none';
    }, 3000);

    inputBox.value = '';

    emptyList();
}

// function for editing item
function editItem(e) {
    e.preventDefault();
    let target = e.target;
    if (target.classList.contains('fa-edit') || target.classList.contains('edit')) {
        edit = target.parentNode.parentNode.parentNode.childNodes[1].textContent;
        btn.innerHTML = "<i class='fa fa-save'></i>";
        btn.value = 'edit';
        inputBox.value = edit;
        editedItem = e;
    }
}

// function for removing an item
function removeItem(e) {
    e.preventDefault();
    let target = e.target;
    if (target.classList.contains('fa-trash') || target.classList.contains('delete')) {
        let item = target.parentNode.parentNode.parentNode.parentNode;
        items.removeChild(item);
        emptyList();

        // set success message 
        alertSuccess.innerHTML = '<span class="fa fa-check-circle"></span> <span>Item Deleted!<span>';

        // display success message
        alertSuccess.style.display = 'block';

        // dismiss success message in 2sec
        setTimeout(function() {
            alertSuccess.style.display = 'none';
        }, 9000)
    }
}

// function for checking an empty list
function emptyList() {
    var empty = createNewElement('div', 'center');

    if (items.childElementCount == 0) {
        empty.appendChild(document.createTextNode('No list'));
        items.append(empty);
    } else {
        if (items.firstChild.classList.contains('center')) {
            items.firstChild.remove();
        }
    }
}

// function for marking items that have been executed
function markItem(e) {
    var target = e.target;
    var markedItem = target.parentNode.parentNode.classList.contains('output-group');
    if (markedItem) {
        target.parentNode.parentNode.classList.toggle('mark');
    }
}

window.onload = ()=> {
    form.addEventListener('submit', addItem);
    items.addEventListener('click', removeItem);
    items.addEventListener('click', editItem);
    items.addEventListener('dblclick', markItem);
    emptyList();
};