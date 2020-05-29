// components/book-grid/book-grid.js
Component({
    properties: {
        books: Object
    },
    methods: {
        handleTapBook(event) {
            let isbn = event.currentTarget.dataset.book.isbn;
            wx.navigateTo({
                url: `../../pages/book/book?isbn=${isbn}`
            });
        }
    }
})
