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

function printLibrary() {
    let counter = tbody.childNodes.length + 1;

    if (tbody.childNodes.length < myLibrary.length) {

    }

    for (const book of myLibrary.slice(tbody.childNodes.length)) {
        const tr = document.createElement("tr");
        const identifier = document.createElement("th");
        const title = document.createElement("td");
        const author = document.createElement("td");
        const pages = document.createElement("td");
        const read = document.createElement("td");

        const button = document.createElement("button");
        button.classList.add("remove-button");
        button.textContent = "Remove book";
        button.style.margin = "10px";


        identifier.scope = "row";

        for (const ID in book) {
            tr.id = ID;

            identifier.textContent = counter;
            title.textContent = book[ID].title;
            author.textContent = book[ID].author;
            pages.textContent = book[ID].pages;
            read.textContent = book[ID].read;
            button.dataset.id = ID;
            counter += 1;
        }

        tr.appendChild(identifier);
        tr.appendChild(title);
        tr.appendChild(author);
        tr.appendChild(pages);
        tr.appendChild(read);
        tr.appendChild(button);
        tbody.appendChild(tr);
    }
}
printLibrary();



form.addEventListener("submit", function (event) {
    event.preventDefault();
    const titleUser = document.querySelector("#title").value;
    const authorUser = document.querySelector("#author").value;
    const pagesUser = document.querySelector("#pages").value;
    const readUser = document.querySelector("[name='read']:checked").value;

    addBookToLibrary(titleUser, authorUser, pagesUser, readUser);
    printLibrary();

    dialog.close();
    document.querySelector(".add-book-form").reset();
})

const removeButton = document.querySelectorAll(".remove-button");


removeButton.forEach(button => button.addEventListener("click", function (event) {
    // console.log(event.target.dataset.id)
    removeFromLibrary(event.target.dataset.id);
    console.log(myLibrary);

}))
