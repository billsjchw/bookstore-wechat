// components/book-browser/book-browser.js
import book_service from '../../services/book_service';
import Toast from '@vant/weapp/toast/toast';

Component({
  properties: {
    rowSize: Number,
    pageSize: Number,
  },
  data: {
    loading: false,
    page: 0,
    input: '',
    keyword: '',
    books: [],
  },
  lifetimes: {
    attached() {
      this.setData({ loading: true });

      Toast.loading({ context: this, duration: 0, message: "Loading ..." });
      book_service.findAllBooks(0, this.properties.pageSize, (msg) => {
        Toast.clear();
        if (msg.status === 'SUCCESS')
          this.setData({ books: msg.data.content });
        else
          Toast({ context: this, message: 'Error' });
        this.setData({ loading: false });
      });
    },
  },
  methods: {
    handleInputChange(event) {
      this.setData({ input: event.detail });
    },
    handleSearch() {
      if (this.data.loading)
        return;
      
      this.setData({
        loading: true,
        keyword: this.data.input,
        page: 0,
      });

      Toast.loading({ context: this, duration: 0, message: "Loading ..." });
      let callback = (msg) => {
        Toast.clear();
        if (msg.status === 'SUCCESS')
          this.setData({ books: msg.data.content });
        else
          Toast({ context: this, message: 'Error' });
        this.setData({ loading: false });
      };
      if (this.data.keyword)
        book_service.bookFuzzySearch(this.data.keyword, this.data.page, this.properties.pageSize, callback);
      else
        book_service.findAllBooks(this.data.page, this.properties.pageSize, callback);
    },
    handleLoadMore() {
      if (this.data.loading)
        return;
      
      this.setData({
        loading: true,
        page: this.data.page + 1,
      });

      Toast.loading({ context: this, duration: 0, message: "Loading ..." });
      let callback = (msg) => {
        Toast.clear();
        if (msg.status === 'SUCCESS')
          this.setData({ books: this.data.books.concat(msg.data.content) });
        else
          Toast({ context: this, message: 'Error' });
        this.setData({ loading: false })
      };
      if (this.data.keyword)
        book_service.bookFuzzySearch(this.data.keyword, this.data.page, this.properties.pageSize, callback);
      else
        book_service.findAllBooks(this.data.page, this.properties.pageSize, callback);
    },
  }
})
