const myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    if(read){
        this.read = true;
    }
    else{
        this.read = false;
    }
    this.info = function() {
        return(`The ${title} by ${author}, ${pages} pages, `);
    }
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

function showBooksInLibrary() {
    for (const book of myLibrary) {
        createCard(book);
    }
}

function createCard(book) {
    const divElement = document.createElement("div");
    divElement.dataset.index = myLibrary.length - 1;
    divElement.classList.add('card');

    const h = document.createElement("p");
    h.textContent = `Title: ${book.title}`;
    divElement.appendChild(h);

    const p1 = document.createElement("p");
    p1.textContent = `Author: ${book.author}`;
    divElement.appendChild(p1);

    const p2 = document.createElement("p");
    p2.textContent = `Pages: ${book.pages}`;
    divElement.appendChild(p2);

    const bookReadButton = document.createElement('button');
    if(book.read){
        bookReadButton.textContent = "Read";
        bookReadButton.style.backgroundColor = '#4ade80';
    }
    else{
        bookReadButton.textContent = "Unread";
        bookReadButton.style.backgroundColor = '#f87171';
    }
    divElement.appendChild(bookReadButton);
    bookReadButton.addEventListener('click', (e) => {
        if(!book.read){
            bookReadButton.textContent = 'Read';
            bookReadButton.style.backgroundColor = '#4ade80';
            book.read = true;
        }
        else{
            bookReadButton.textContent = 'Unread';
            bookReadButton.style.backgroundColor = '#f87171';
            book.read = false;
        }
    });

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    divElement.appendChild(removeButton);
    removeButton.addEventListener('click', (e) => {
        const cardElement = e.target.closest('.card');
        if(cardElement){
            const index = cardElement.dataset.index;
            removeCard(index);
            myLibrary.splice(index, 1);
        }
    });

    const existingContainer = document.querySelector('.content-container');
    existingContainer.appendChild(divElement);
}

function removeCard(arrayIndex) {
    const cardToRemove = document.querySelector(`div[data-index="${arrayIndex}"]`);
    if(cardToRemove) {
        cardToRemove.parentNode.removeChild(cardToRemove);
    }
}

function checkError(titleValue, authorValue, pagesValue){
    if(titleValue.length < 1){
        showError("title-error", "You have to add a title");
        return false;
    }
    if(authorValue.length < 1){
        showError("author-error", "You have to add an author");
        return false;
    }
    if(isNaN(pagesValue)){
        showError("pages-error", "You have to add a page amount");
        return false;
    }
    return true;
}


function showError(errorElement, errorMessage) {
    let element = document.querySelector("."+errorElement);
    element.classList.add("error");
    element.style.display = 'block';
    element.textContent = errorMessage;
}

function removeErrors(){
    let errors = document.querySelectorAll('.error');
    for(let error of errors){
        error.style.display = 'none';
        error.classList.remove("error");
    }
}

    const modal = document.querySelector('.modal');
    const addBookButton = document.querySelector('.new-book-button');
    const bookForm = document.querySelector('form');
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const read = document.getElementById('read');

    addBookButton.addEventListener('click', () => {
        modal.showModal()
    });

    const closeModalButton = document.querySelector('.close-modal');
    closeModalButton.addEventListener('click', () => {
            modal.close();
    });

    bookForm.addEventListener('submit', (event) => {
        event.preventDefault();
        removeErrors();
        const titleValue = title.value;
        const authorValue = author.value;
        const pagesValue = parseInt(pages.value, 10);
        const readChecked = read.checked;
        const newBook = new Book(titleValue, authorValue, pagesValue, readChecked);
        if(checkError(titleValue, authorValue, pagesValue)){
            addBookToLibrary(newBook);
            createCard(newBook);
            bookForm.reset();
            modal.close();
        }
    });