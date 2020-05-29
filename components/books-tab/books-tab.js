// components/books-tab/books-tab.js
import Toast from "@vant/weapp/toast/toast";
import BookService from "../../services/BookService";

Component({
    data: {
        keyword: "",
        page: 0,
        size: 4,
        books: [],
        scrollViewHeight: 0
    },
    lifetimes: {
        attached() {
            this.setScrollViewHeight();
            this.fetchFirstPage();
        }
    },
    methods: {
        setScrollViewHeight() {
            let scrollViewHeight = wx.getSystemInfoSync().windowHeight - 104;
            this.setData({ scrollViewHeight: scrollViewHeight });
        },
        fetchFirstPage() {
            let callback = (msg) => {
                if (msg.status === "SUCCESS") {
                    this.data.page = 0;
                    this.setData({ books: msg.data.content });
                    Toast.clear();
                } else {
                    Toast.clear();
                    if (msg.status === "UNAUTHORIZED") {
                        wx.redirectTo({ url: "../../pages/login/login" });
                    } else
                        Toast.fail({ context: this, message: "Unknown error" });
                }
            };
            Toast.loading({ context: this, duration: 0, forbidClick: true, message: "Loading ..." });
            if (this.data.keyword)
                BookService.bookFuzzySearch(this.data.keyword, 0, this.data.size, callback);
            else
                BookService.findAllBooks(0, this.data.size, callback);
        },
        fetchNextPage() {
            let callback = (msg) => {
                if (msg.status === "SUCCESS") {
                    this.data.page += 1;
                    this.setData({ books: this.data.books.concat(msg.data.content) });
                    Toast.clear();
                } else {
                    Toast.clear();
                    if (msg.status === "UNAUTHORIZED")
                        Toast.fail({ context: this, message: "Unauthorized"});
                    else
                    Toast.fail({ context: this, message: "Unknown error"});
                }
            };
            Toast.loading({ context: this, duration: 0, forbidClick: true, message: "Loading ..." });
            if (this.data.keyword)
                BookService.bookFuzzySearch(this.data.keyword, this.data.page + 1, this.data.size, callback);
            else
                BookService.findAllBooks(this.data.page + 1, this.data.size, callback);
        },
        handleKeywordChange(event) {
            this.setData({ keyword: event.detail });
        },
        handleExecSearch(event) {
            this.fetchFirstPage();
        },
        handleCancelSearch(event) {
            this.setData({ keyword: "" });
            this.fetchFirstPage();
        },
        handleLoadMoreBooks(event) {
            this.fetchNextPage();
        }
    }
});
