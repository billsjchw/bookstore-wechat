// components/cart-manager/cart-manager.js
import cart_service from '../../services/cart_service';
import Toast from '@vant/weapp/toast/toast';

Component({
  data: {
    cart: null,
    error: false,
    loading: true,
    submitting: false,
  },
  lifetimes: {
    attached() {
      this.fetchCart();
    },
  },
  methods: {
    fetchCart() {
      this.setData({ loading: true });
      Toast.loading({ context: this, duration: 0, message: 'Loading ...' });
      cart_service.findMyCart((msg) => {
        Toast.clear();
        if (msg.status === 'SUCCESS')
          this.setData({ cart: msg.data, error: false });
        else
          this.setData({ error: true });
        this.setData({ loading: false });
      });
    },
    handleChangeCartItem(event) {
      if (this.data.loading || this.data.submitting)
        return;
      
      this.setData({ submitting: true });
      Toast.loading({ context: this, duration: 0, message: 'Loading ...' });
      cart_service.editItemInMyCart(event.detail, (msg) => {
        Toast.clear();
        if (msg.status === 'SUCCESS') {
          let index = this.data.cart.items.findIndex((item) => item.book.id === event.detail.book.id);
          if (index >= 0)
            this.setData({ [`cart.items[${index}]`]: event.detail });
        } else if (msg.status === 'UNAUTHORIZED') {
          Toast({ context: this, message: 'Please sign in first' });
        } else if (msg.status === 'ITEM_NOT_FOUND') {
          Toast({ context: this, message: 'Item not found' });
        } else if (msg.status === 'MIN_AMOUNT_EXCEEDED') {
          Toast({ context: this, message: 'Min amount exceeded' });
        } else if (msg.status === 'MAX_AMOUNT_EXCEEDED') {
          Toast({ context: this, message: 'Max amount exceeded' });
        } else {
          Toast({ context: this, message: 'Unknown error' });
        }
        this.setData({ submitting: false });
      });
    },
    handleDeleteCartItem(event) {
      console.log(event);
      if (this.data.loading || this.data.submitting)
        return;
    
      this.setData({ submitting: true });
      Toast.loading({ context: this, duration: 0, message: 'Loading ...' });
      cart_service.deleteItemFromMyCart(event.detail, (msg) => {
        Toast.clear();
        if (msg.status === 'SUCCESS') {
          let index = this.data.cart.items.findIndex((item) => item.book.id === event.detail);
          if (index >= 0) {
            this.data.cart.items.splice(index, 1);
            this.setData({ cart: this.data.cart });
          }
        } else if (msg.status === 'UNAUTHORIZED') {
          Toast({ context: this, message: 'Please sign in first' });
        } else {
          Toast({ context: this, message: 'Unknown error' });
        }
        this.setData({ submitting: false });
      });
    },
  },
})
