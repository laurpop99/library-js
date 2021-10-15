const myTable = document.querySelector("table");
const add = document.querySelector(".add");
let buttonArray = [];
let statusArray = [];
let myLibrary = [];

if(localStorage.myLibrary.length === 2){
localStorage.setItem("myLibrary", "[]");
}

//JSON localStorage *-----
function getLibrary(){
    myLibrary = [];
    let getLibrary = localStorage.getItem("myLibrary");
    myLibrary = JSON.parse(getLibrary);
    console.log("retrievedObject: ", JSON.parse(getLibrary));
}



function saveLibrary(){
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}


add.addEventListener("click", addBook);
//EXECUTE
getLibrary();
myLibrary.forEach(function(book){
    displayBook(book);
})

function Book(title, author, pages, didRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.didRead = didRead;
}

Book.prototype.isRead = function(){
    if(this.isRead) return true;
    else return false;
}

function displayBook(book){
    let newRow = myTable.insertRow(myTable.rows.length);
    let bookTitle = newRow.insertCell(0);
    let bookAuthor = newRow.insertCell(1);
    let bookPages = newRow.insertCell(2);
    let bookRead = newRow.insertCell(3);
    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages;
    if (book.didRead) bookRead.textContent = "READ";
    else bookRead.textContent = "NOT READ";
    createDeleteButton(book, bookTitle);
    createReadButton(book, bookRead);
}

function createDeleteButton(book, bookTitle){
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("fas", "fa-trash-alt");
    bookTitle.appendChild(deleteButton);
    buttonArray.push(deleteButton);
    deleteButton.addEventListener("click", deleteBook);
}

function createReadButton(book, bookRead){
    const statusButton = document.createElement("button");
    statusButton.classList.add("fas", "fa-exchange-alt");
    bookRead.appendChild(statusButton);
    statusArray.push(statusButton);
    statusButton.addEventListener("click", changeStatus); 
}

function changeStatus(){
    let statusIndex = statusArray.indexOf(this);
    // console.log(statusArray.indexOf(this));
    myLibrary[statusIndex].didRead = !myLibrary[statusIndex].didRead;
    clearTable();
    myLibrary.forEach(function(book){
        displayBook(book);
        saveLibrary();
    })
}

function deleteBook(){
    let buttonIndex = buttonArray.indexOf(this);
    myLibrary.splice(buttonIndex, 1);
    // console.log(buttonArray.indexOf(this));
    buttonArray.splice(buttonIndex,1);
    clearTable();
    saveLibrary();
    myLibrary.forEach(function(book){
        displayBook(book);
    })    
}

function clearTable(){
    let counter = myTable.rows.length;
    while(myTable.rows.length > 1){
        myTable.deleteRow(1);
    }
    buttonArray = [];
    statusArray = [];
}

function addBook(book){
    title = prompt("Title of the book");
    author = prompt("Author of the book");
    pages = prompt("How many pages?");
    didRead = prompt("Did you read it?");
    if(didRead.toLowerCase() === "no") didRead = false;
    else didRead = true;
    if(title === null || author === null || pages === null || didRead === null){
        alert("One of the fields was not completed! Try again");
        return;
    }
    else{
    book = new Book(title,author,pages,didRead);
    myLibrary.push(book);
    displayBook(book);
    saveLibrary();
    }
}


