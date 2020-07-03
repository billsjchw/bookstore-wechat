// components/add-to-cart-button/add-to-cart-button.js
import cart_service from '../../services/cart_service';
import Toast from '@vant/weapp/toast/toast';

Component({
  data: {
    submitting: false,
    bookId: null,
  },
  pageLifetimes: {
    show() {
      let currentPages = getCurrentPages();
      let currentPage = currentPages[currentPages.length - 1];
      let bookId = currentPage.options.bookId;
      this.setData({ bookId: bookId });
    },
  },
  methods: {
    handleSubmit() {
      if (this.data.submitting)
        return;
      
      if (this.data.bookId === null)
        return;

      this.setData({ submitting: true });
      Toast.loading({ context: this, duration: 0, message: 'Loading ...' });
      cart_service.addBookToMyCart(this.data.bookId, (msg) => {
        Toast.clear();
        if (msg.status === 'SUCCESS')
          Toast({ context: this, message: 'Success' });
        else if (msg.status === 'UNAUTHORIZED')
          Toast({ context: this, message: 'Please sign in first' });
        else if (msg.status === 'BOOK_NOT_FOUND')
          Toast({ context: this, message: 'Book not found' });
        else if (msg.status === 'MAX_AMOUNT_EXCEEDED')
          Toast({ context: this, message: 'Max amount exceeded' });
        else
          Toast({ context: this, message: 'Unknown error' });
        this.setData({ loading: false });
      });
    }
  },
})
