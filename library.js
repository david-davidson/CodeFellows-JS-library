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
                allShelvedBooks[thisShelf.books[i].title] = thisShelf.name;
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
        console.log('Removing ' + this.title + ' from ' + shelf.name);
        var i = shelf.books.indexOf(this);
        shelf.books.splice(i, 1);
        this.shelved = false;
    };

    this.enshelf = function(shelf) {
        if (this.shelved) {
            this.unshelf(); // Don't try to unshelve books that aren't shelved
        }
        shelf.books.push(this);
        this.shelved = true;
        this.shelf = shelf; // Here's our problem!!!
    };
    this.enshelf(shelf);
}

var babel = new Library('babel');
var memoir = new Shelf(babel, 'memoir');
var nonfiction = new Shelf(babel, 'nonfiction');
var fiction = new Shelf(babel, 'fiction');
var elAleph = new Book(fiction, 'El Aleph', 'Borges');
var elHacedor = new Book(memoir, 'El Hacedor', 'Borges');
var otrasInquisiciones = new Book(nonfiction, 'Otras Inquisiciones', 'Borges');
otrasInquisiciones.enshelf(memoir);
otrasInquisiciones.enshelf(nonfiction);
otrasInquisiciones.enshelf(fiction);
otrasInquisiciones.unshelf();

console.log(babel.report());

/*
To unshelf() itself, it needs to know what shelf it's on. If we set shelf as an attribute of Book(), then each shelf holds an array of books, each of which points to its parent shelf, each of which holds... infinite back and forth. Only one should know, and it's probably shelf. (Cleaner: library knows shelves; shelves know books; books know only about themselves.) Maybe something like getParentShelf(), which could ask each shelf, Do you hold me? loop through list of shelves, return shelf that holds books

*/