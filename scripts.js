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
            this.identifier = event.target.dataset.id;
            if (event.target.classList.contains("remove-button")) {
                lib.removeBook(this.identifier);
            }
            if (event.target.classList.contains("toggle")) {
                lib.myLibrary.forEach(obj => {
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
            this.readUser = (document.querySelector("[name='read']:checked").value === 'true');
            lib.addBookToLibrary(this.titleUser, this.authorUser, this.pagesUser, this.readUser);

            this.printLibrary();
            this.dialog.close();
            document.querySelector(".add-book-form").reset();
        })
    }

    createTableRow() {
        this.tr = document.createElement("tr");
        this.itemNum = document.createElement("th");
        this.title = document.createElement("td");
        this.author = document.createElement("td");
        this.pages = document.createElement("td");
        this.read = document.createElement("td");
        this.remove = document.createElement("td");
    }


    printLibrary() {
        this.tbody.innerHTML = ""
        this.counter = 0;

        for (this.book of lib.myLibrary) {
            this.counter++;
            this.createTableRow()
            this.itemNum.scope = "row";
            this.read.style.textAlign = "center";
            this.tr.id = this.book.id;
            this.itemNum.textContent = this.counter;
            this.title.textContent = this.book.title;
            this.author.textContent = this.book.author;
            this.pages.textContent = this.book.pages;
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
lib.addBookToLibrary("Demon Copperhead", "Barbara Kingsolver", 560, false);
lib.addBookToLibrary("Hell Difficulty Tutorial: Book One", "Cerim", 618, true);
lib.addBookToLibrary("Alchemised", "SenLinYu", 1030, false);
lib.addBookToLibrary("The Compound", "Aisling Rawle", 292, false);
console.log(lib.myLibrary)
printDom.printLibrary()
