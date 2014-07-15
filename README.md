#JS Library
`library.js` models a public library with JavaScript classes:
* Each `Library` holds a `shelves` object and exposes a `report` method that returns all the books currently in the library. 
* Each `Shelf` holds an array of `Book` titles (strings); as new shelves are initialized, they&rsquo;re pushed into `library.shelves`. 
* Each `Book` holds basic info (title, author) and supports two methods: `shelf()` and `unshelf()`.

Here it is in action: <a href="http://jsfiddle.net/daviddavidson/EQ3ep/" target="_blank">http://jsfiddle.net/daviddavidson/EQ3ep/</a>

<em>P.S. Note that `index.html` exists only to fire `library.js`. Open it up, and then check the console!</em>