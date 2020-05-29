// pages/book/book.js
import BookService from "../../services/BookService";
import Toast from "@vant/weapp/toast/toast";

Page({
    data: {
        loading: true,
        error: false,
        book: null
    },
    onLoad(options) {
        let isbn = options.isbn;
        this.fetchBook(isbn);
    },
    fetchBook(isbn) {
        // Toast.loading({ duration: 0, forbidClick: true, message: "Loading ..." });
        BookService.findBookByIsbn(isbn, (msg) => {
            // Toast.clear();
            if (msg.status === "SUCCESS")
                this.setData({ loading: false, book: msg.data });
            else {
                this.setData({ loading: false, error: true });
                if (msg.status === "UNAUTHORIZED")
                    Toast.fail("Unauthorized");
                else
                    Toast.fail("Unknown error");
            }
        });
    }
});
