// components/book-view/book-view.js
import book_service from '../../services/book_service';
import Toast from '@vant/weapp/toast/toast';

Component({
  data: {
    loading: false,
    error: false,
    book: null,
  },
  pageLifetimes: {
    show() {
      let currentPages = getCurrentPages();
      let currentPage = currentPages[currentPages.length - 1];
      let bookId = currentPage.options.bookId;
      this.fetchBook(bookId);
    },
  },
  methods: {
    fetchBook(bookId) {
      this.setData({ loading: true });

      Toast.loading({ context: this, duration: 0, message: "Loading ..." });
        book_service.findBookById(bookId, (msg) => {
        Toast.clear();
        if (msg.status === 'SUCCESS')
          this.setData({ error: false, book: msg.data });
        else
          this.setData({ error: true });
        this.setData({ loading: false });
      });
    },
  }
})
