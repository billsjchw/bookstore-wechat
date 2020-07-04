// components/book-grid/book-grid.js
Component({
  properties: {
    books: Array,
    rowSize: Number,
  },
  methods: {
    handleTapBook(event) {
      let bookId = event.currentTarget.dataset.book.id;
      wx.navigateTo({ url: `../../pages/book/book?bookId=${bookId}` });
    },
  },
})
