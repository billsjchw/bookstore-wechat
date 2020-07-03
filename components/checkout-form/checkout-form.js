// components/checkout-form/checkout-form.js
import order_service from '../../services/order_service';
import Toast from '@vant/weapp/toast/toast';

Component({
  data: {
    submitting: false,
    value: {
      address: '',
      phone: '',
      firstName: '',
      lastName: '',
      paymentMethod: 'ONLINE',
    },
    errMsg: {
      address: '',
      phone: '',
      firstName: '',
      lastName: '',
    },
  },
  methods: {
    handleAddressChange(event) {
      this.setData({ 'value.address': event.detail });
    },
    handlePhoneChange(event) {
      this.setData({ 'value.phone': event.detail });
    },
    handleFirstNameChange(event) {
      this.setData({ 'value.firstName': event.detail });
    },
    handleLastNameChange(event) {
      this.setData({ 'value.lastName': event.detail });
    },
    handlePaymentMethodChange(event) {
      this.setData({ 'value.paymentMethod': event.detail });
    },
    handleSubmit() {
      if (this.data.submitting)
        return;
      
      if (!this.validate())
        return;

      this.setData({ submitting: true });
      let dto = {
        consignee: {
          address: this.data.value.address,
          phone: this.data.value.phone,
          firstName: this.data.value.firstName,
          lastName: this.data.value.lastName,
        },
        paymentMethod: this.data.value.paymentMethod,
      };
      Toast.loading({ context: this, duration: 0, message: 'Loading ...' });
      order_service.orderItemsInMyCart(dto, (msg) => {
        Toast.clear();
        if (msg.status === 'SUCCESS')
          wx.navigateBack();
        else if (msg.status === 'UNAUTHORIZED')
          Toast({ context: this, message: 'Please sign in first' });
        else if (msg.status === 'NOTHING_TO_ORDER')
          Toast({ context: this, message: 'Nothing to order' });
        else if (msg.status === 'OUT_OF_STOCK')
          Toast({ context: this, message: `Book ${msg.data.title} is out of stock` });
        else
          Toast({ context: this, message: 'Unknown error' });
        this.setData({ loading: false });
      });
    },
    validate() {
      this.setData({ 'errMsg.address': '' });
      this.setData({ 'errMsg.phone': '' });
      this.setData({ 'errMsg.firstName': '' });
      this.setData({ 'errMsg.lastName': '' });

      if (!this.data.value.address)
        this.setData({ 'errMsg.address': 'Address cannot be empty' });
      if (!this.data.value.phone)
        this.setData({ 'errMsg.phone': 'Phone cannot be empty' });
      if (!this.data.value.firstName)
        this.setData({ 'errMsg.firstName': 'First name cannot be empty' });
      if (!this.data.value.lastName)
        this.setData({ 'errMsg.lastName': 'Last name cannot be empty' });

      return !this.data.errMsg.address &&
          !this.data.errMsg.phone &&
          !this.data.errMsg.firstName &&
          !this.data.errMsg.lastName;
    },
  },
})
