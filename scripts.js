class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    changeRead() {
        this.read = !this.read;
    }
}


class Library {
    myLibrary = [];

    get myLibrary() {
        return myLibrary;
    }

    addBookToLibrary(title, author, pages, read) {
        const bookId = crypto.randomUUID();
        const book = new Book(title, author, pages, read);
        book["id"] = bookId;
        this.myLibrary.push(book);
    }

    removeBook(identifier) {
        const childToRemove = document.getElementById(identifier);

        for (let i = 0; i < this.myLibrary.length; i++) {
            if (this.myLibrary[i].id === identifier) {
                this.myLibrary.splice(i, 1);
            }
        }
    }

}


class DOM {
    tbody = document.querySelector("tbody")
    form = document.querySelector(".add-book-form")
    dialog = document.querySelector("dialog")

    constructor() {
        this.tbody.addEventListener("click", (event) => {
            this.id = event.target.dataset.id;
            if (event.target.classList.contains("remove-button")) {
                lib.removeBook(this.id);
            }

            if (event.target.classList.contains("toggle")) {
                lib.myLibrary.forEach(obj => {
                    for (const identifier in obj) {
                        if (id === identifier) {
                            obj[identifier].changeRead();
                            event.target.textContent = obj[identifier].read ? "Yes" : "No";
                        }
                    }
                })
            }
            this.printLibrary()
        })
    }


    printLibrary() {
        this.tbody.innerHTML = ""
        console.log("printed")

        // let identifier = "";
        // let buttonText = "";
        this.counter = 0;
        for (this.book of lib.myLibrary) {
            this.counter++;
            this.tr = document.createElement("tr");
            this.itemNum = document.createElement("th");
            this.title = document.createElement("td");
            this.author = document.createElement("td");
            this.pages = document.createElement("td");
            this.read = document.createElement("td");
            this.remove = document.createElement("td");

            this.itemNum.scope = "row";
            this.read.style.textAlign = "center";

            this.tr.id = this.book.id;
            // identifier = book.id;
            this.itemNum.textContent = this.counter;
            this.title.textContent = this.book.title;
            this.author.textContent = this.book.author;
            this.pages.textContent = this.book.pages;
            // buttonText = book.read ? "Yes" : "No";

            this.tr.appendChild(this.itemNum);
            this.tr.appendChild(this.title);
            this.tr.appendChild(this.author);
            this.tr.appendChild(this.pages);
            this.read.appendChild(this.createButton("toggle", this.book.read ? "Yes" : "No", this.book.id));
            this.tr.appendChild(this.read);
            this.remove.appendChild(this.createButton("remove-button", "Remove book", this.book.id));
            this.tr.appendChild(this.remove);
            this.tbody.appendChild(this.tr);
        }
    }

    createButton(cls, text, identifier) {
        const button = document.createElement("button");
        button.classList.add(cls);
        button.textContent = text;
        button.dataset.id = identifier;
        return button;
    }




}

let lib = new Library();
let printDom = new DOM();
lib.addBookToLibrary("The Calamitous Bob", "Álex Gilbert", 389, true);
lib.addBookToLibrary("Hell Difficulty Tutorial: Book One", "Cerim", 618, true);
console.log(lib.myLibrary)
printDom.printLibrary()



// const myLibrary = [];

// const tbody = document.querySelector("tbody");
// const form = document.querySelector(".add-book-form");
// const dialog = document.querySelector("dialog");

// function addBookToLibrary(title, author, pages, read) {
//     const bookId = crypto.randomUUID();
//     const book = new Book(title, author, pages, read);
//     myLibrary.push({
//         [bookId]: book
//     })
// }

// function createButton(cls, text, identifier) {
//     const button = document.createElement("button");
//     button.classList.add(cls);
//     button.textContent = text;
//     button.dataset.id = identifier;
//     return button;
// }

// function printLibrary() {
//     let counter = tbody.childNodes.length + 1;
//     let identifier = "";
//     let buttonText = "";

//     for (const book of myLibrary.slice(tbody.childNodes.length)) {
//         const tr = document.createElement("tr");
//         const itemNum = document.createElement("th");
//         const title = document.createElement("td");
//         const author = document.createElement("td");
//         const pages = document.createElement("td");
//         const read = document.createElement("td");
//         const remove = document.createElement("td");

//         itemNum.scope = "row";
//         read.style.textAlign = "center";

//         for (const ID in book) {
//             tr.id = ID;
//             identifier = ID;
//             itemNum.textContent = counter;
//             title.textContent = book[ID].title;
//             author.textContent = book[ID].author;
//             pages.textContent = book[ID].pages;
//             buttonText = book[ID].read ? "Yes" : "No";
//             counter += 1;
//         }

//         tr.appendChild(itemNum);
//         tr.appendChild(title);
//         tr.appendChild(author);
//         tr.appendChild(pages);
//         read.appendChild(createButton("toggle", buttonText, identifier));
//         tr.appendChild(read);
//         remove.appendChild(createButton("remove-button", "Remove book", identifier));
//         tr.appendChild(remove);
//         tbody.appendChild(tr);
//     }
// }

// function removeBook(identifier) {
//     const childToRemove = document.getElementById(identifier);
//     tbody.removeChild(childToRemove);

//     for (let i = 0; i < myLibrary.length; i++) {
//         for (const item in myLibrary[i]) {
//             if (item === identifier) {
//                 myLibrary.splice(i, 1);
//             }
//         }
//     }
// }

// form.addEventListener("submit", function (event) {
//     event.preventDefault();
//     const titleUser = document.querySelector("#title").value;
//     const authorUser = document.querySelector("#author").value;
//     const pagesUser = document.querySelector("#pages").value;
//     const readUser = (document.querySelector("[name='read']:checked").value === 'true');
//     addBookToLibrary(titleUser, authorUser, pagesUser, readUser);
//     printLibrary();

//     dialog.close();
//     document.querySelector(".add-book-form").reset();
// })

// tbody.addEventListener("click", function (event) {
//     const id = event.target.dataset.id;

//     if (event.target.classList.contains("remove-button")) {
//         removeBook(id);
//     }

//     if (event.target.classList.contains("toggle")) {
//         myLibrary.forEach(obj => {
//             for (const identifier in obj) {
//                 if (id === identifier) {
//                     obj[identifier].changeRead();
//                     event.target.textContent = obj[identifier].read ? "Yes" : "No";
//                 }
//             }
//         })
//     }
// })


// addBookToLibrary("The Calamitous Bob", "Álex Gilbert", 389, true);
// addBookToLibrary("Demon Copperhead", "Barbara Kingsolver", 560, false);
// addBookToLibrary("Hell Difficulty Tutorial: Book One", "Cerim", 618, true);
// addBookToLibrary("Alchemised", "SenLinYu", 1030, false);
// addBookToLibrary("The Compound", "Aisling Rawle", 292, false);

// printLibrary();