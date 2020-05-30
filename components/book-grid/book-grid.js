// components/book-grid/book-grid.js
Component({
    properties: {
        books: Object
    },
    methods: {
        handleTapBook(event) {
            let bookId = event.currentTarget.dataset.book.id;
            wx.navigateTo({
                url: `../../pages/book/book?bookId=${bookId}`
            });
        }
    }
});
