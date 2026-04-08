const myLibrary = [];

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

addBookToLibrary("The Calamitous Bob", "Álex Gilbert", 389, true);
addBookToLibrary("Demon Copperhead", "Barbara Kingsolver", 560, false);
addBookToLibrary("Hell Difficulty Tutorial: Book One", "Cerim", 618, true);
addBookToLibrary("Alchemised", "SenLinYu", 1030, false);
addBookToLibrary("The Compound", "Aisling Rawle", 292, false);

const tbody = document.querySelector("tbody");
const submit = document.querySelector(".submit");

function printLibrary() {

    for (const book of myLibrary) {
        const tr = document.createElement("tr");
        const identifier = document.createElement("th");
        const title = document.createElement("td");
        const author = document.createElement("td");
        const pages = document.createElement("td");
        const read = document.createElement("td");

        identifier.scope = "row";
        for (const id in book) {
            identifier.textContent = id;
            title.textContent = book[id].title;
            author.textContent = book[id].author;
            pages.textContent = book[id].pages;
            read.textContent = book[id].read;
        }
        tr.appendChild(identifier);
        tr.appendChild(title);
        tr.appendChild(author);
        tr.appendChild(pages);
        tr.appendChild(read);
        tbody.appendChild(tr);
    }
}
printLibrary();

submit.addEventListener("click", (event) => {
    console.log(event);
    event.preventDefault();


})