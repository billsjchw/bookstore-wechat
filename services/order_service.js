import service from './service';

function orderItemsInMyCart(dto, callback) {
  service.post('/order/order-items-in-my-cart', dto, callback);
}

export default {orderItemsInMyCart};
