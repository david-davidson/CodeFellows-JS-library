function Library(name) {
    // Use example: var babel = new Library('babel', ['fiction', 'nonfiction']);
    // shelvesArray is optional: you can initialize with just var babel = new Library('babel'), too.
    this.name = name;
    this.shelves = {};
    // if (Array.isArray(shelvesArray)) {
    //     for (var i = 0; i < shelvesArray.length; i++) {
    //         window[shelvesArray[i]] = new Shelf(this, shelvesArray[i]); // Runs each shelf argument through the Shelf() constructor, which is what pushes each new shelf into this.shelves. (I put that task in Shelf() so we can call Shelf() on its own.)
    //     }
    // }
    this.report = function() {
        // Returns an object as associative array: {title: "shelf", secondTitle, "secondShelf", etc.}
        allShelvedBooks = {};
        for (var shelf in this.shelves) {
            thisShelf = this.shelves[shelf];
            for (var i = 0; i < thisShelf.books.length; i++) {
                allShelvedBooks[thisShelf.books[i].title] = thisShelf.name;
            }
        }
        return allShelvedBooks;
    };
}

function Shelf(library, name) {
    this.name = name;
    this.books = [];
    library.shelves[name] = this;
}

function Book(shelf, title, author) { // No need to define the library again; the shelf knows its library
    this.title = title;
    this.author = author;
    this.unshelf = function() {
        var shelf = this.shelf; // Get the most up-to-date shelf
        var i = shelf.books.indexOf(this);
        shelf.books.splice(i, 1); // Remove book from the shelf
        this.shelf = false; // So we won't try to unshelf it next time
    };
    this.enshelf = function(shelf) {
        if (this.shelf) {
            this.unshelf(); // Don't try to unshelve books that aren't shelved
        }
        shelf.books.push(this);
        this.shelf = shelf; // Reset the shelf
    };
    this.enshelf(shelf);
}

var babel = new Library('babel');
var memoir = new Shelf(babel, 'memoir');
var nonfiction = new Shelf(babel, 'nonfiction');
var fiction = new Shelf(babel, 'fiction');
// console.log(babel.shelves);
// console.log(babel.fiction);
var elAleph = new Book(fiction, 'El Aleph', 'Borges');
// console.log(babel.shelves.fiction.books[0]);
var inquisiciones = new Book(nonfiction, 'Inquisiciones', 'Borges');
var otrasInquisiciones = new Book(nonfiction, 'Otras Inquisiciones', 'Borges');
// otrasInquisiciones.enshelf(fiction);

console.log(babel.report());