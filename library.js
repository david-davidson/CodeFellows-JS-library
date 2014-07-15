function Library(name) {
    // Use example: var babel = new Library('babel');
    this.name = name;
    this.shelves = {};

    this.report = function() {
        // Returns an object as associative array: {title: "shelf", secondTitle, "secondShelf", etc.}
        allShelvedBooks = {};
        for (var shelf in this.shelves) {
            thisShelf = this.shelves[shelf];
            for (var i = 0; i < thisShelf.books.length; i++) {
                allShelvedBooks[thisShelf.books[i]] = thisShelf.name;
            }
        }
        return allShelvedBooks;
    };
}

function Shelf(library, name) {
    // Use example: var fiction = new Shelf(babel, 'fiction');
    this.name = name;
    this.books = [];
    library.shelves[name] = this;
}

function Book(shelf, title, author) {
    // Use example: var hamlet = new Book(fiction, 'Hamlet', 'Shakespeare');
    this.title = title;
    this.author = author;
    this.unshelf = function() {
        shelf = this.shelf;
        console.log('Removing ' + this.title + ' from ' + this.shelf.name);
        var i = this.shelf.books.indexOf(this);
        this.shelf.books.splice(i, 1);
        this.shelved = false;
    };
    this.enshelf = function(shelf) {
        if (this.shelved) {
            this.unshelf();
        }
        shelf.books.push(this.title); // We push only the title, not the entire book object: otherwise, each book refers to its shelf, which refers to all its books, each of which refers to its shelf, each of which refers to all its books, etc. Note that, therefore, a given shelf knows only the *names* of its books.
        this.shelved = true;
        this.shelf = shelf; // Update the current shelf
    };
    this.enshelf(shelf);
}

// Initialize library
var babel = new Library('babel');

// Initialize shelves
var memoir = new Shelf(babel, 'memoir');
var nonfiction = new Shelf(babel, 'nonfiction');
var fiction = new Shelf(babel, 'fiction');

// Initialize books
var elAleph = new Book(fiction, 'El Aleph', 'Borges');
var elHacedor = new Book(memoir, 'El Hacedor', 'Borges');
var otrasInquisiciones = new Book(nonfiction, 'Otras Inquisiciones', 'Borges');

// Test shelf, enshelf methods
otrasInquisiciones.enshelf(memoir);
otrasInquisiciones.enshelf(nonfiction);
otrasInquisiciones.enshelf(fiction);
otrasInquisiciones.unshelf();

// Test library's reporting method
console.log(babel.report());