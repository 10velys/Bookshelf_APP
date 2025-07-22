document.addEventListener("DOMContentLoaded", function () {
    const bookForm = document.getElementById("bookForm");
    const searchForm = document.getElementById("searchBook");
    const incompleteBookList = document.getElementById("incompleteBookList");
    const completeBookList = document.getElementById("completeBookList");
    
    const bookFormTitle = document.getElementById("bookFormTitle");
    const bookFormAuthor = document.getElementById("bookFormAuthor");
    const bookFormYear = document.getElementById("bookFormYear");
    const bookFormIsComplete = document.getElementById("bookFormIsComplete");
    const bookFormSubmit = document.getElementById("bookFormSubmit");

    const STORAGE_KEY = "BOOKSHELF_APPS";
    let editingBookId = null;

    function getBooks() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }

    function saveBooks(books) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    }

    function renderBooks() {
        incompleteBookList.innerHTML = "";
        completeBookList.innerHTML = "";
        
        getBooks().forEach(book => {
            const bookElement = createBookElement(book);
            if (book.isComplete) {
                completeBookList.appendChild(bookElement);
            } else {
                incompleteBookList.appendChild(bookElement);
            }
        });
    }

    function createBookElement(book) {
        const bookItem = document.createElement("div");
        bookItem.setAttribute("data-bookid", book.id);
        bookItem.setAttribute("data-testid", "bookItem");

        const title = document.createElement("h3");
        title.setAttribute("data-testid", "bookItemTitle");
        title.innerText = book.title;
        
        const author = document.createElement("p");
        author.setAttribute("data-testid", "bookItemAuthor");
        author.innerText = `Penulis: ${book.author}`;

        const year = document.createElement("p");
        year.setAttribute("data-testid", "bookItemYear");
        year.innerText = `Tahun: ${book.year}`;
        
        const buttonContainer = document.createElement("div");
        
        const toggleButton = document.createElement("button");
        toggleButton.setAttribute("data-testid", "bookItemIsCompleteButton");
        toggleButton.innerText = book.isComplete ? "Pindahkan ke Belum Selesai" : "Pindahkan ke Selesai";
        toggleButton.addEventListener("click", () => toggleBookStatus(book.id));
        
        const editButton = document.createElement("button");
        editButton.setAttribute("data-testid", "bookItemEditButton");
        editButton.innerText = "Edit Buku";
        editButton.addEventListener("click", () => populateEditForm(book));
        
        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("data-testid", "bookItemDeleteButton");
        deleteButton.innerText = "Hapus Buku";
        deleteButton.addEventListener("click", () => deleteBook(book.id));
        
        buttonContainer.appendChild(toggleButton);
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
        
        bookItem.appendChild(title);
        bookItem.appendChild(author);
        bookItem.appendChild(year);
        bookItem.appendChild(buttonContainer);
        
        return bookItem;
    }

    function addOrUpdateBook(event) {
        event.preventDefault();
        
        const title = bookFormTitle.value;
        const author = bookFormAuthor.value;
        const year = parseInt(bookFormYear.value);
        const isComplete = bookFormIsComplete.checked;
        
        let books = getBooks();
        
        if (editingBookId) {
            const bookIndex = books.findIndex(book => book.id === editingBookId);
            if (bookIndex !== -1) {
                books[bookIndex].title = title;
                books[bookIndex].author = author;
                books[bookIndex].year = year;
                books[bookIndex].isComplete = isComplete;
            }
            editingBookId = null;
            bookFormSubmit.innerText = "Masukkan Buku ke rak";
        } else {
            const newBook = {
                id: Number(new Date()),
                title,
                author,
                year,
                isComplete
            };
            books.push(newBook);
        }
        
        saveBooks(books);
        renderBooks();
        bookForm.reset();
    }

    function toggleBookStatus(bookId) {
        const books = getBooks();
        const bookIndex = books.findIndex(book => book.id === bookId);
        
        if (bookIndex !== -1) {
            books[bookIndex].isComplete = !books[bookIndex].isComplete;
            saveBooks(books);
            renderBooks();
        }
    }

    function deleteBook(bookId) {
        let books = getBooks();
        books = books.filter(book => book.id !== bookId);
        saveBooks(books);
        renderBooks();
    }

    function populateEditForm(book) {
        bookFormTitle.value = book.title;
        bookFormAuthor.value = book.author;
        bookFormYear.value = book.year;
        bookFormIsComplete.checked = book.isComplete;
        editingBookId = book.id;
        bookFormSubmit.innerText = "Simpan Perubahan";
    }

    function searchBook(event) {
        event.preventDefault();
        
        const searchQuery = document.getElementById("searchBookTitle").value.toLowerCase();
        
        incompleteBookList.innerHTML = "";
        completeBookList.innerHTML = "";
        
        getBooks().forEach(book => {
            if (book.title.toLowerCase().includes(searchQuery)) {
                const bookElement = createBookElement(book);
                if (book.isComplete) {
                    completeBookList.appendChild(bookElement);
                } else {
                    incompleteBookList.appendChild(bookElement);
                }
            }
        });
    }

    bookForm.addEventListener("submit", addOrUpdateBook);
    searchForm.addEventListener("submit", searchBook);

    renderBooks();
});
