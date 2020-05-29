import Ajax from "./Ajax";
import Backend from "../constants/Backend";

const BookService = {
    findBookByIsbn(isbn, callback) {
        Ajax.get(`${Backend.DOMAIN}/book/find-book-by-isbn`, { isbn: isbn }, callback);
    },
    findAllBooks(page, size, callback) {
        Ajax.get(`${Backend.DOMAIN}/book/find-all-books`, { page: page, size: size }, callback);
    },
    bookFuzzySearch(keyword, page, size, callback) {
        Ajax.get(`${Backend.DOMAIN}/book/book-fuzzy-search`, { keyword: keyword, page: page, size: size }, callback);
    }
};

export default BookService;
