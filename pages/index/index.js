// pages/index/index.js
Page({
    data: {
        active: 0
    },
    onTabChange(event) {
        this.setData({ active: event.detail });
    }
})
