function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}


function getBooksBorrowedCount(books) {
  return books.filter((book) => {
    const [recent] = book.borrows;
    return !recent.returned;
  }).length;
}

function getMostCommonGenres(books) {
  let array = {}; /* We're setting an empty object = to our variable array! */
  for(const book of books) {
 /* We're setting book = to our parameter books */
   let genre = book.genre;
 /* We're setting variable genre equal to books.genre inside the object */  
    if (array[genre]) {
 /* Here we're saying if there's no array with genre inside it, we're going to make our own! */ 
      array[genre] += 1;
 /* Since we're only looking for one thing, we set the array[genre] += 1; */ 
    }
  else {
    array[genre] = 1;
  } 
  }  
   let result = []
  for (const key in array) {
   result.push({
     name: key,
    count: array[key]
         })
  }
  return result.sort((a, b) => b.count - a.count)
               .slice(0,5);
}

function _sortHelper(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    } else {
      return 0;
    }
  });
}

function getMostPopularBooks(books) {
  const groupById = books.reduce((acc, { id, borrows }) => {
    acc[id] = borrows.length;
    return acc;
  }, {});
  const sorted = _sortHelper(groupById);
  return sorted
    .map((id) => {
      const { title: name } = books.find(({ id: bookId }) => bookId === id);
      return { name, count: groupById[id] };
    })
    .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
    let returnArr = [];
     authors.forEach(author => {
       returnArr.push({
         name: `${author.name.first} ${author.name.last}`,
         count: 0 ,
         id: author.id
       })
     });
      
     books.forEach((book) => {
     const currentBookId = book.authorId;
    
       let foundAuthor = returnArr.find((author) => {         
         return author.id == currentBookId} );
       if (foundAuthor) {
         foundAuthor.count += book.borrows.length;
       }  
     })
   return returnArr.sort((authorA, authorB) => authorB.count - authorA.count).slice(0,5).map(({id, ...rest}) => rest)
   }



module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
