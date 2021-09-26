/*
1. Book object constructor
2. Add function to add book objects to array
3. Add array to store all book objects
4. Add a function that loops through the array and displays each book on the page
5. Add New Book button with a form
6. Add a remove button
7. Add button to change read status
8. use web storage API for persistance to refreshing
*/

//--------------------------------------------------------------------------
//--------------------------------------------------------------------------



function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
}

Book.prototype.readingStatus = function () {
    if(this.read === 'true') {
        this.read = 'false';
    }
    else {
        this.read = 'true';
    }
}

const bookOne = new Book('The history of Western Philosophy','Bernadr', 'true');
const bookTwo = new Book('The Hobbit', 'J.R.R Tolkien', 'false');
const bookThree = new Book('Morometii', 'Mircea Bravo', 'true');



let library = JSON.parse(localStorage.getItem('library')) || [];


if(library !== []) {
    for (let i = 0; i < library.length; i++) {
        library[i] = new Book(library[i].title,
                              library[i].author,  
                              library[i].read);
    }   
}


localStorage.setItem('library', JSON.stringify(library));

function displayLibrary(lib) {
    for(let i = 0; i < lib.length; i++) {
        addBookToUI (lib[i]);
    }
}

const libraryBody = document.querySelector('.libraryBody');
const bookName = document.querySelector('#bookName');
const bookAuthor = document.querySelector('#bookAuthor');
const isBookRead = document.querySelector('#isBookRead');
const submitBookButton = document.querySelector('.submitBookButton');

submitBookButton.addEventListener('click', function(){
    const book = new Book(bookName.value,
                          bookAuthor.value,
                          isBookRead.value);
    addBookToLibrary(book);
})

function addBookToLibrary(book) {
    library.push(book);
    localStorage.setItem('library', JSON.stringify(library));
    addBookToUI(book);
}

function addBookToUI (book) {
    let bookNode = document.createElement('div');
    bookNode.style.border = '1px solid black';
    let title = document.createElement('h2');
    let author = document.createElement('h3');
    let read = document.createElement('h3');
    let remove = document.createElement('button');
    
    title.textContent = book.title;
    author.textContent = book.author;
    if(book.read === 'true'){
        read.textContent = "Book read";
    }
    else {
        read.textContent = "Book not read";
    }
    remove.textContent = 'remove book';

    libraryBody.appendChild(bookNode);
    bookNode.appendChild(title);
    bookNode.appendChild(author);
    bookNode.appendChild(read);
    bookNode.appendChild(remove);
    
    read.addEventListener('click', function(){
        if(read.textContent === 'Book read') {
            read.textContent = 'Book not read';
        }
        else {
            read.textContent = 'Book read';
        }
        book.readingStatus();
        localStorage.setItem('library', JSON.stringify(library));
    })

    remove.addEventListener('click', function(){
        bookNode.remove();
        library.splice(bookNode, 1);
        localStorage.setItem('library', JSON.stringify(library));
    })
}

displayLibrary(library);