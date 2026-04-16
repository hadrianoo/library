class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();

    }
    changeRead() {
        this.read = !this.read;
    }
}

class Library {
    myLibrary = [];

    addBookToLibrary(title, author, pages, read) {
        const book = new Book(title, author, pages, read);
        this.myLibrary.push(book);
    }

    removeBook(identifier) {
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

    constructor(library) {
        this.library = library;

        this.tbody.addEventListener("click", (event) => {
            this.identifier = event.target.dataset.id;
            if (event.target.classList.contains("remove-button")) {
                lib.removeBook(this.identifier);
            }
            if (event.target.classList.contains("toggle")) {
                this.library.forEach(obj => {
                    if (this.identifier === obj.id) {
                        obj.changeRead();
                        event.target.textContent = obj.read ? "Yes" : "No";
                    }
                })
            }
            this.printLibrary();
        })

        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.titleUser = document.querySelector("#title").value;
            this.authorUser = document.querySelector("#author").value;
            this.pagesUser = document.querySelector("#pages").value;
            this.readUser = (document.querySelector("[name='read']:checked").value === "true");
            lib.addBookToLibrary(this.titleUser, this.authorUser, this.pagesUser, this.readUser);

            this.printLibrary();
            this.dialog.close();
            document.querySelector(".add-book-form").reset();
        })
    }

    createTableRow() {
        const tr = document.createElement("tr");
        const itemNum = document.createElement("th");
        const title = document.createElement("td");
        const author = document.createElement("td");
        const pages = document.createElement("td");
        const userRead = document.createElement("td");
        const remove = document.createElement("td");

        itemNum.scope = "row";

        return { tr, itemNum, title, author, pages, userRead, remove }
    }

    appendRow(book, index) {
        const { tr, itemNum, title, author, pages, userRead, remove } = this.createTableRow()

        tr.id = book.id;
        itemNum.textContent = index;
        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages;

        tr.appendChild(itemNum);
        tr.appendChild(title);
        tr.appendChild(author);
        tr.appendChild(pages);
        userRead.appendChild(this.createButton("toggle", book.read ? "Yes" : "No", book.id));
        tr.appendChild(userRead);
        remove.appendChild(this.createButton("remove-button", "Remove book", book.id));
        tr.appendChild(remove);

        return tr;
    }

    printLibrary() {
        this.tbody.innerHTML = ""
        let counter = 0;

        for (const book of this.library) {
            counter++;
            this.tbody.appendChild(this.appendRow(book, counter));
        }
    }

    createButton(cls, text, identifier) {
        this.button = document.createElement("button");
        this.button.classList.add(cls);
        this.button.textContent = text;
        this.button.dataset.id = identifier;
        return this.button;
    }
}

const lib = new Library();
const printDom = new DOM(lib.myLibrary);
lib.addBookToLibrary("The Calamitous Bob", "Álex Gilbert", 389, true);
lib.addBookToLibrary("Demon Copperhead", "Barbara Kingsolver", 560, false);
lib.addBookToLibrary("Hell Difficulty Tutorial: Book One", "Cerim", 618, true);
lib.addBookToLibrary("Alchemised", "SenLinYu", 1030, false);
lib.addBookToLibrary("The Compound", "Aisling Rawle", 292, false);
printDom.printLibrary()
