function Library(name) {
    // e.g., var babel = new Library('babel');
    this.name = name;
    this.shelves = {};
    this.report = function() {
        // Returns an object as associative array: {title: "shelf", secondTitle, "secondShelf", etc.}
        var allBooks = {};
        for (var shelf in this.shelves) {
            var thisShelf = this.shelves[shelf];
            for (var i = 0; i < thisShelf.books.length; i++) {
                allBooks[thisShelf.books[i]] = thisShelf.name; // I'm assuming we're treating unshelved books as removed from the library
            }
        }
        return allBooks;
    };
}

function Shelf(library, name) {
    // e.g., var fiction = new Shelf(babel, 'fiction');
    this.name = name;
    this.books = []; // An array (of objects) seems like the cleanest, most semantic data type here
    library.shelves[name] = this;
}

function Book(shelf, title, author) {
    // e.g., var hamlet = new Book(fiction, 'Hamlet', 'Shakespeare');
    this.title = title;
    this.author = author;
    this.unshelf = function() {
        console.log('Removing "' + this.title + '" from shelf ' + this.shelf.name);
        var i = this.shelf.books.indexOf(this);
        this.shelf.books.splice(i, 1);
        this.shelved = false;
    };
    this.enshelf = function(shelf) {
        if (this.shelved) {
            this.unshelf();
        }
        console.log('Putting "' + this.title + '" on shelf ' + shelf.name);
        shelf.books.push(this.title); // We push only the title, not the entire book object: otherwise, a shelf lists all its books, each of which lists its shelf, each of which lists all its books, etc.
        this.shelved = true;
        this.shelf = shelf; // Update the current shelf
    };
    this.enshelf(shelf);
}

// Initialize library
var babel = new Library('Babel');

// Initialize shelves
var memoir = new Shelf(babel, 'memoir');
var nonfiction = new Shelf(babel, 'nonfiction');
var fiction = new Shelf(babel, 'fiction');

// Initialize books
var elAleph = new Book(fiction, 'El Aleph', 'Borges, Jorge Luis');
var elHacedor = new Book(memoir, 'El hacedor', 'Borges, Jorge Luis');
var otrasInquisiciones = new Book(nonfiction, 'Otras inquisiciones', 'Borges, Jorge Luis');

// Test enshelf(), unshelf(), report() methods
otrasInquisiciones.enshelf(memoir);
console.log('Library contents: ' + JSON.stringify(babel.report())); // Library contents: {"El hacedor":"memoir","Otras inquisiciones":"memoir","El Aleph":"fiction"} 

otrasInquisiciones.enshelf(fiction);
console.log('Library contents: ' + JSON.stringify(babel.report())); // Library contents: {"El hacedor":"memoir","El Aleph":"fiction","Otras inquisiciones":"fiction"}

otrasInquisiciones.unshelf();
console.log('Library contents: ' + JSON.stringify(babel.report())); // Library contents: {"El hacedor":"memoir","El Aleph":"fiction"} 