// custom-tab-bar/index.js
Component({
  data: {
    active: 0,
    list: [
      {
        icon: 'home-o',
        text: 'Home',
        url: '/pages/home/home',
      },
      {
        icon: 'cart-o',
        text: 'Cart',
        url: '/pages/cart/cart',
      },
      {
        icon: 'orders-o',
        text: 'Orders',
        url: '/pages/orders/orders',
      },
      {
        icon: 'user-o',
        text: 'Account',
        url: '/pages/account/account',
      },
    ],
  },
  methods: {
    handleChange(event) {
      this.setData({ active: event.detail });
      wx.switchTab({ url: this.data.list[event.detail].url });
    },
    init() {
      let currentPages = getCurrentPages();
      let currentPage = currentPages[currentPages.length - 1];

      let index = this.data.list.findIndex(item => item.url === `/${currentPage.route}`);

      this.setData({ active: index });
    },
  },
})
