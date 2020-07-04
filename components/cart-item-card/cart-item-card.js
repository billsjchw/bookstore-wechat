// components/cart-item-card/cart-item-card.js
import {MiscConst} from '../../utils/constant';

Component({
  properties: {
    value: Object,
  },
  methods: {
    handleActiveChange(event) {
      let detail = {
        book: this.properties.value.book,
        amount: this.properties.value.amount,
        active: event.detail,
      };
      this.triggerEvent('change', detail);
    },
    handleAdd(event) {
      let newAmount = this.properties.value.amount + 1;
      if (newAmount < MiscConst.CART_ITEM_MIN_AMOUNT ||
          newAmount > MiscConst.CART_ITEM_MAX_AMOUNT)
        return;
      let detail = {
        book: this.properties.value.book,
        amount: newAmount,
        active: this.properties.value.active,
      };
      this.triggerEvent('change', detail);
    },
    handleSubstract(event) {
      let newAmount = this.properties.value.amount - 1;
      if (newAmount < MiscConst.CART_ITEM_MIN_AMOUNT ||
          newAmount > MiscConst.CART_ITEM_MAX_AMOUNT)
        return;
      let detail = {
        book: this.properties.value.book,
        amount: newAmount,
        active: this.properties.value.active,
      };
      this.triggerEvent('change', detail);
    },
    handleDelete(event) {
      this.triggerEvent('delete', this.properties.value.book.id);
    },
  },
})
