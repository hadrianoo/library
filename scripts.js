const myLibrary = [];

const tbody = document.querySelector("tbody");
const form = document.querySelector(".add-book-form");
const dialog = document.querySelector("dialog");

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.changeRead = function () {
    return !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    const bookId = crypto.randomUUID();
    const book = new Book(title, author, pages, read);
    myLibrary.push({
        [bookId]: book
    })
}

function removeFromLibrary(id) {
    for (let i = 0; i < myLibrary.length; i++) {
        for (const item in myLibrary[i]) {
            if (item === id) {
                myLibrary.splice(i, 1);
            }
        }
    }
}

addBookToLibrary("The Calamitous Bob", "Álex Gilbert", 389, true);
addBookToLibrary("Demon Copperhead", "Barbara Kingsolver", 560, false);
addBookToLibrary("Hell Difficulty Tutorial: Book One", "Cerim", 618, true);
addBookToLibrary("Alchemised", "SenLinYu", 1030, false);
addBookToLibrary("The Compound", "Aisling Rawle", 292, false);

function createButton(cls, text, identifier) {
    const button = document.createElement("button");
    button.classList.add(cls);
    button.textContent = text;
    button.dataset.id = identifier;
    button.style.margin = "auto";
    button.style.width = "100px";
    return button;
}

function printLibrary() {
    let counter = tbody.childNodes.length + 1;
    let identifier = "";
    let readText = "";

    for (const book of myLibrary.slice(tbody.childNodes.length)) {
        const tr = document.createElement("tr");
        const nextNum = document.createElement("th");
        const title = document.createElement("td");
        const author = document.createElement("td");
        const pages = document.createElement("td");
        const read = document.createElement("td");
        const remove = document.createElement("td");

        nextNum.scope = "row";
        read.style.textAlign = "center";

        for (const ID in book) {
            tr.id = ID;
            identifier = ID;
            nextNum.textContent = counter;
            title.textContent = book[ID].title;
            author.textContent = book[ID].author;
            pages.textContent = book[ID].pages;
            readText = book[ID].read ? "Yes" : "No";
            counter += 1;
        }

        tr.appendChild(nextNum);
        tr.appendChild(title);
        tr.appendChild(author);
        tr.appendChild(pages);
        read.appendChild(createButton("toggle", readText, identifier));
        tr.appendChild(read);
        remove.appendChild(createButton("remove-button", "Remove book", identifier));
        tr.appendChild(remove);
        tbody.appendChild(tr);
    }
}
printLibrary();

function removeFromScreen(identifier) {
    const childToRemove = document.getElementById(identifier);
    tbody.removeChild(childToRemove);
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const titleUser = document.querySelector("#title").value;
    const authorUser = document.querySelector("#author").value;
    const pagesUser = document.querySelector("#pages").value;
    const readUser = (document.querySelector("[name='read']:checked").value === 'true');
    addBookToLibrary(titleUser, authorUser, pagesUser, readUser);
    printLibrary();

    dialog.close();
    document.querySelector(".add-book-form").reset();
})

tbody.addEventListener("click", function (event) {
    const id = event.target.dataset.id;

    if (event.target.classList.contains("remove-button")) {
        removeFromLibrary(id);
        removeFromScreen(id);
    }

    if (event.target.classList.contains("toggle")) {
        myLibrary.forEach(obj => {
            for (const identifier in obj) {
                if (id === identifier) {
                    obj[identifier].read = obj[identifier].changeRead();
                    event.target.textContent = obj[identifier].read ? "Yes" : "No";
                    console.log(obj[identifier].read)
                }
            }
        })
    }
})