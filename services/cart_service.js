import service from './service';

function addBookToMyCart(bookId, callback) {
  let params = { 'book-id': bookId };
  service.get('/cart/add-book-to-my-cart', params, callback);
}

function findMyCart(callback) {
  service.get('/cart/find-my-cart', null, callback);
}

function editItemInMyCart(cartItem, callback) {
  service.post('/cart/edit-item-in-my-cart', cartItem, callback);
}

function deleteItemFromMyCart(bookId, callback) {
  let params = { 'book-id': bookId };
  service.get('/cart/delete-item-from-my-cart', params, callback);
}

export default {addBookToMyCart, findMyCart, editItemInMyCart, deleteItemFromMyCart};
