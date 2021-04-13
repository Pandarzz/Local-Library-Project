

function findAuthorById(authors, id) {
  return authors.find( e => e.id === id);                 
}


function findBookById(books, id) {
 return books.find(e => e.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  return books.reduce(
    (acc, book) => {
      const [borrowed, returned] = acc;
      const recent = book.borrows[0];
      if (recent.returned) {
        returned.push(book);
      } else {
        borrowed.push(book);
      }
      return acc;
    },
    [[], []]
  );
}

function getBorrowersForBook(book, accounts) {
  let returnArr = [];
  for(let key in book.borrows) {
    const accountObj = accounts.find(account => account.id === book.borrows[key].id);
    accountObj
    accountObj.returned = book.borrows[key].returned;
    returnArr.push(accountObj);
  }
  return returnArr.slice(0, 10);
}
 


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};