function Library(name) {
    this.name = name;
    this.shelves = []; // Initialize it empty; push into it as we go
    this.report = function() {
        for (var j = 0; j < this.shelves.length; j++) {            
            for (var k = 0; k < this.shelves[j].books.length; k++) {
                console.log('Title: ' + this.shelves[j].books[k].title + ' | author: ' + this.shelves[j].books[k].author + ' | shelf: ' + this.shelves[j].name);
            }
        }
    };
}

function Shelf(library, name) {
    this.name = name;
    this.books = [];
    library.shelves.push(this);
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
var fiction = new Shelf(babel, 'fiction');
var nonfiction = new Shelf(babel, 'nonfiction');
var memoir = new Shelf(babel, 'memoir');
var elAleph = new Book(fiction, 'El Aleph', 'Borges');
var inquisiciones = new Book(nonfiction, 'Inquisiciones', 'Borges');
var otrasInquisiciones = new Book(nonfiction, 'Otras Inquisiciones', 'Borges');
otrasInquisiciones.enshelf(fiction);

babel.report();