const data = [
  {
    id: 1,
    title: 'The Lord of the Rings',
    publicationDate: '1954-07-29',
    author: 'J. R. R. Tolkien',
    genres: [
      'fantasy',
      'high-fantasy',
      'adventure',
      'fiction',
      'novels',
      'literature',
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: 'El señor de los anillos',
      chinese: '魔戒',
      french: 'Le Seigneur des anneaux',
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: 'The Cyberiad',
    publicationDate: '1965-01-01',
    author: 'Stanislaw Lem',
    genres: [
      'science fiction',
      'humor',
      'speculative fiction',
      'short stories',
      'fantasy',
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: 'Dune',
    publicationDate: '1965-01-01',
    author: 'Frank Herbert',
    genres: ['science fiction', 'novel', 'adventure'],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: '',
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: '1997-06-26',
    author: 'J. K. Rowling',
    genres: ['fantasy', 'adventure'],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: 'Harry Potter y la piedra filosofal',
      korean: '해리 포터와 마법사의 돌',
      bengali: 'হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন',
      portuguese: 'Harry Potter e a Pedra Filosofal',
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: 'A Game of Thrones',
    publicationDate: '1996-08-01',
    author: 'George R. R. Martin',
    genres: ['fantasy', 'high-fantasy', 'novel', 'fantasy fiction'],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: '왕좌의 게임',
      polish: 'Gra o tron',
      portuguese: 'A Guerra dos Tronos',
      spanish: 'Juego de tronos',
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

/*
// **************************
// **************************
// Destructuring
// **************************
// **************************

// Useful for get some data out of an object or out of an array

// Destructuring Object
// Relies on the property names of the object that should match the variables names used

// Get the value of a object property
// const book = getBook(2);
const book = getBook(2);
console.log(book);

// Without Object Destructuring
// const title = book.title;
// const author = book.author;

// With Object Destructuring
// The variable names used should be the same names as object property
// Use { var1, var2 } to destructuring an Object
const { title, author, pages, publicationDate, genres, hasMovieAdaptation } =
  book;
console.log(title, author, genres);

// Destructuring Array
// Relies on the order of the elements in the array

// Without Array Destructuring
// const primaryGenre = genres[0];
// const secondaryGenre = genres[1];
// console.log(primaryGenre, secondaryGenre);

// With Array Destructuring
// Use [ var1, var2 ] to destructuring an Array
// const [primaryGenre, secondaryGenre] = genres;
// console.log(primaryGenre, secondaryGenre);

// **************************
// **************************
// Rest Operator
// **************************
// **************************

// Useful to get all the other elements that weren't destructured by some reason
// The Rest Operator can only be placed at the end of a destructuring operation
// When the three dots symbol (...) is used at the left side of the equal symbol (=) it is a Rest Operator
const [primaryGenre, secondaryGenre, ...otherGenres] = genres;
console.log(primaryGenre, secondaryGenre, otherGenres);

// **************************
// **************************
// Spread Literals
// **************************
// **************************

// Spread operator with Arrays
// Useful to create a new array with all the current elements of an array plus add a new one to the end
// It can be used both on arrays and objects
// When the three dots symbol (...) is used at the right side of the equal symbol (=) it is a Spread Operator

// const newGenres = [...genres, 'epic fantasy'];
const newGenres = ['epic fantasy', ...genres];
console.log(newGenres);

// Spread operator with Objects

// It allows to:
// - Create new objects when add new properties to an object is needed
// - Create new objects with an updated property
const updatedBook = { ...book, moviePlubicationDate: '2001-12-19' };
console.log(updatedBook);

// It allows to update existing properties of an object by overwrite them.
// Always add the spread operator first and after the properties that want to be updated
const updatedBook2 = {
  ...book,
  // Adding a new property
  moviePlubicationDate: '2001-12-19',
  // Overwriting an existing property
  pages: 1210,
};
console.log(updatedBook2);

// **************************
// **************************
// Template Literals
// **************************
// **************************

// It is a ES6 JS feature
// Used to create strings that contain JS variables or any JS expression (anything that produces a value) like functions

const summary = `${title}, a ${pages}-page long book, was written by ${author} and published in ${
  publicationDate.split('-')[0]
}. The book has ${hasMovieAdaptation ? '' : 'not'} been adapted as a movie.`;
console.log(summary);

// **************************
// **************************
// Ternaries instead of IF / ELSE statements
// **************************
// **************************

// Used to define values based on a condition where it isn't possible to use an if / else statement
// It's a special type of operator that has three operands - condition ? expr1 : expr2

const pagesRange = pages > 1000 ? 'over a 1000' : 'less than 1000';
// console.log(pagesRange);
console.log(`The book has ${pagesRange} pages`);
console.log(
  `The book has ${pages > 1000 ? 'over a 1000' : 'less than 1000'} pages`
);

// **************************
// **************************
// Arrow Functions
// **************************
// **************************

// It's a way of write JS functions introduced in ES6
// Helpful for writing short one-line functions

// Traditional way of writing Functions
// Function Declaration
// function getYear(str) {
//   return str.split('-')[0];
// }
// console.log(getYear(publicationDate));

// Arrow Functions
// It's not needed to write the return word explicitly when it has just one line
// It's needed to write the return word explicitly when it has more than one line
// To use, need to be stored in a variable
// Function Expression
// const getYear = (str) => str.split('-')[0]; // return word not needed
const getYear = (str) => {
  return str.split('-')[0]; // return word needed
};
console.log(getYear(publicationDate));

// **************************
// **************************
// Short-Circuiting and Logical Operators &&, ||, ??
// **************************
// **************************

// Short-Circuiting and the Logical Operator && (AND)
// When the first operator is true the AND operator will return the second, third or last operator
// This is an example of NO short-circuiting
console.log(true && 'Hello World');
console.log(true && 'Hello World' && 'This is a test');

// When the first operator is false the AND operator will return the first operator
// Short-circuiting works in the AND operator when the first value is false
// The evaluation is short-circuiting and nothing more is evaluated in the expression
console.log(false && 'Hello World');
console.log(false && 'Hello World' && 'This is a test');
console.log(hasMovieAdaptation && 'This book has a movie');

// Truthly and Falsy values with && (AND)
// Truthly value is any value that is not a false value
// Falsy value are 0, '', null, undefined
console.log('jonas' && 'Some string'); // Not short-circuiting
console.log(0 && 'Some string'); // Short-circuiting

// Short-Circuiting and the Logical Operator || (OR)
// When the first operator is true the OR operator will return the first operator
// Short-circuiting works in the OR operator when the first operator is true
// This is an example of short-circuiting
console.log(true || 'Hello World');
console.log(true || 'Hello World' || 'This is a test');

// When the first operator is false the OR operator will return the next operator evaluated to true
// The evaluation is short-circuiting when the next operator evaluated to true is founded and nothing more is evaluated in the expression
console.log(false || 'Hello World');
console.log(false || 'Hello World' || 'This is a test');
console.log(hasMovieAdaptation || 'This book has a movie');

// Not short-circuiting to set default values
console.log(book.translations.spanish);
const japanTranslation = book.translations.japan || 'NOT TRANSLATED';
console.log(japanTranslation);

console.log(book.reviews.librarything.reviewsCount);
const countWrong = book.reviews.librarything.reviewsCount || 'No data';
console.log(countWrong); // Error produced by the falsy value in the evaluation. It should be 0, don't 'No data'

// Fix the previous error with the Nullish Coallescing Operator
const count = book.reviews.librarything.reviewsCount ?? 'No data';
console.log(count); // Not Error produced by the falsy value in the evaluation. The evaluation returns 0.

// **************************
// **************************
// Optional Chaining
// **************************
// **************************

// JS property that just evaluate the next property if the previous one exists
// obj.property?.property?.property
// Useful when it's not sure that all the expected values exist in an object

function getTotalReviewCount(book) {
  const goodread = book?.reviews?.goodreads?.reviewsCount;
  const librarything = book?.reviews?.librarything?.reviewsCount ?? 0; //Fix error with the Nullish Coalesnce operator
  return goodread + librarything;
}

console.log(getTotalReviewCount(book));
*/

// **************************
// **************************
// The Array map Method
// **************************
// **************************

// The map method will loop over an array and return a new array with the same length with some operation applied to each element of the original array.
// The map method is to create a new array based on the original array with some operation applied to each element of the original array.
// map expects a callback function which is a function that will be called for each of the array elements.

function getTotalReviewCount(book) {
  const goodread = book?.reviews?.goodreads?.reviewsCount;
  const librarything = book?.reviews?.librarything?.reviewsCount ?? 0; //Fix error with the Nullish Coalesnce operator
  return goodread + librarything;
}

const books = getBooks();

// const x = [1, 2, 3, 4, 5].map((el) => el * 2);
// console.log(x);

const titles = books.map((book) => book.title);
console.log(titles);

// const essentialData = books.map((book) => {
//   return {
//     title: book.title,
//     author: book.author,
//   };
// });

const essentialData = books.map((book) => ({
  title: book.title,
  author: book.author,
  reviews: getTotalReviewCount(book),
}));

console.log(essentialData);

// **************************
// **************************
// The Array filter Method
// **************************
// **************************

// Use to filter out some elements of an array based on a condition.
// filter expects a callback function which is a function that will be called for each of the array elements.
// if the condition is true the current element will go into the filtered array.
// if the condition is false the current element will not go into the filtered array.

const longBooks = books.filter((book) => book.pages > 500);
console.log(longBooks);

const longBooksWithMovie = books.filter((book) => book.hasMovieAdaptation);
console.log(longBooksWithMovie);

const adventureBooks = books
  .filter((book) => book.genres.includes('adventure'))
  .map((book) => book.title);
console.log(adventureBooks);

// **************************
// **************************
// The Array reduce Method
// **************************
// **************************

// The most versatile and powerful array method
// It's used to add together numbers or perform any mathematical operation with numbers
// reduce expects
// - a callback function which is a function that will be called for each of the array elements
// - the callback function has as parameters the accumulator and the array element
// - a stater value for the accumulator which will contain the final value accumulated
// The common use is reduce an entire array to just one value

const pagesAllBooks = books.reduce((acc, book) => acc + book.pages, 0);
console.log(pagesAllBooks);

// **************************
// **************************
// The Array sort Method
// **************************
// **************************

// It's used to sort an array
// Unlike to map and reduce method this isn't a functional method so sort mutates the original array
// sort expects
// - a callback function which is a function that will be called for each of the array elements
// - the callback function has two arguments called a, b
// - to order in an ascending way return a - b
// - to order in an descending way return b - a

const arr = [3, 7, 1, 9, 6];
const sortedAscending = arr.slice().sort((a, b) => a - b);
console.log(sortedAscending);
console.log(arr);

const sortedDescending = arr.slice().sort((a, b) => b - a);
console.log(sortedDescending);
console.log(arr);

const sortedByPagesDescending = books.slice().sort((a, b) => b.pages - a.pages);
console.log(sortedByPagesDescending);

// **************************
// **************************
// Working with immutable arrays
// **************************
// **************************

// 1) How to add an element to an array.

const newBook = {
  id: 6,
  title: 'Harry Potter and the Chamber of Secrets',
  author: 'J. K. Rowling',
};

const booksAfterAdd = [...books, newBook];
console.log(booksAfterAdd);

// 2) How to delete an element of an array
// Whenever the condition in the callback function returns a false value then that object will not be in the final array

const booksAfterDelete = books.filter((book) => book.id !== 3);
console.log(booksAfterDelete);

// 3) How to update an element of an array
// map is the choice whenever an element update is needed inside and array

const booksAfterUpdate = booksAfterDelete.map((book) =>
  book.id === 1 ? { ...book, pages: 50000 } : book
);
console.log(booksAfterUpdate);

// **************************
// **************************
// Asynchronous JS: Promises
// **************************
// **************************

// Fetch:
// - Used to load data from an external web API

// What happens when the fetch function is called?
// - Fetch data from an API will take time because a HTTP request is made, JS waits until that request is processed and download the response
// - In the meantime JS keeps running executing the rest of the code do JS will not wait until the data is fetched
// - How do something when finally the data has arrived from the fetch function?
// - - Well, this is the reason of asynchronous JS techniques like Promises.

// Promises:
// - The fetch function will return a Promise with a Pending state
// - The then method allows to handle Promises with the fulfilled state (when the data successfully arrived)
// - The then method will be called as soon as the Promise state is fulfilled
// - The then method needs a callback function which contains the code that will be executed when the data has arrived
// - Promises states:
// - - Fulfilled if the data successfully arrived
// - - Pending when it is doing something
// - - Rejected when there is an error

// fetch('https://jsonplaceholder.typicode.com/todos') // JS fire off a request to the API
//   .then((res) => res.json()) // JS register the callback function to be executed later when the previous Promise is fulfilled
//   .then((data) => console.log(data)); // JS register the callback function to be executed later when the previous Promise is fulfilled

// console.log('jonas'); // JS execute this code immediately

// Finally some time pass, then the data from the API arrived, then JS goes back and executed the callback functions registered before.

// **************************
// **************************
// Asynchronous JS: Async / Await
// **************************
// **************************

// Async / Await:
// - Used to load data from an external web API
// - More cleaner syntax compared to fetch / then

// API call implementation with fetch / then

// fetch('https://jsonplaceholder.typicode.com/todos') // JS fire off a request to the API
//   .then((res) => res.json()) // JS register the callback function to be executed later when the previous Promise is fulfilled
//   .then((data) => console.log(data)); // JS register the callback function to be executed later when the previous Promise is fulfilled

// console.log('jonas'); // JS execute this code immediately

// Finally some time pass, then the data from the API arrived, then JS goes back and executed the callback functions registered before.

// API call implementation with async / await

// Create an async function
async function getTodos() {
  // Inside the async function await by the Promise to be fulfilled
  // By the await keyword, inside an async function JS will not immediately move on to the next line, like it usually does.
  // JS will stop / pause the code execution inside the async function and when the Promise is fulfilled JS will store the response into a variable
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await res.json();
  // console.log(data);
  return data;
}

// Fundamental piece of knowledge to have in order to work with async functions
// Why getTodos return a Promise with pending state?
// - Same as before, right after the getTodos() function is called, JS immediately moves to the next line. It does not wait until the Promise will be resolved.
// - At this point, JS has no way of knowing yet what will be the final data, simply todos var is a Promise, which means that the result value of an async function is always a Promise
const todos = await getTodos();
console.log(todos);

console.log('jonas');

// In React, as soon as data is received from an API the next state is set it with state inside the async function
