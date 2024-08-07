import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as crypto from 'crypto';
import { BE_URL, VIETCOMBANK_URL } from 'src/common/constants';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CheckOrderResponse } from 'src/types/order.type';
import { BookingService } from '../booking/booking.service';

// - Thông tin Merchant
// ● Merchant site code: 7
// ● Mật khẩu kết nối: 123456789
// - Tài khoản đăng nhập
// ● Email login: vcb-test@yopmail.com
// ● Mật khẩu đăng nhập: 123456789
// - Thẻ ATM test thanh toán ngân hàng EXB
//  Tên chủ thẻ: NGUYEN VAN A
//  Số thẻ ATM: 9704111111111111

// Tài liệu kết nối-Cổng thanh toán Vietcombank-Version

// 7

//  Mã xác thực (OTP): 123456
// - QRCODE: Ngân hàng VCB
// - Thẻ quốc tế: Thẻ VISA
// ● Tên chủ thẻ: NGUYEN VAN A
// ● Số thẻ VISA: 400000 00 0000 1091
// ● CVV: 123

@Controller('order')
@ApiTags('order')
export class OrderController {
  listOrder: any[];
  private readonly bookingServices: BookingService;

  constructor(
    private readonly httpService: HttpService,
    bookingServices: BookingService,
  ) {
    this.listOrder = [];
    this.bookingServices = bookingServices;
  }

  @Post('payment/:booking_id')
  @UseGuards(AuthGuard)
  async createOrder(@Param('booking_id') booking_id: string) {
    const booking = await this.bookingServices.getBooking(booking_id);

    const now = new Date().getTime().toString();

    const merchant_site_code = '7';
    const order_code = now;
    const amount = booking.rateamount.amount;
    const currency = 'VND';
    const buyer_fullname = `${booking.first_name} ${booking.last_name}`;
    const buyer_email = booking.email;
    const buyer_mobile = booking.phone_number.replace('+', '');
    const buyer_address = 'Ha Noi';
    const return_url = `${BE_URL}order/order-return/${order_code}`;
    const cancel_url = `${BE_URL}order/order-canceled`;
    const notify_url = `${BE_URL}order/order-notify`;
    const language = 'vi';
    const merchant_passcode = '123456789';
    const order_description = '';

    const hash = crypto.createHash('md5');

    hash.update(
      merchant_site_code +
        '|' +
        order_code +
        '|' +
        order_description +
        '|' +
        amount +
        '|' +
        currency +
        '|' +
        buyer_fullname +
        '|' +
        buyer_email +
        '|' +
        buyer_mobile +
        '|' +
        buyer_address +
        '|' +
        return_url +
        '|' +
        cancel_url +
        '|' +
        notify_url +
        '|' +
        language +
        '|' +
        merchant_passcode,
    );

    const checksum = hash.digest('hex').toString();

    const formData = new FormData();
    formData.append('function', 'CreateOrder');
    formData.append('merchant_site_code', merchant_site_code);
    formData.append('order_code', order_code);
    formData.append('amount', amount.toString());
    formData.append('currency', currency);
    formData.append('buyer_fullname', buyer_fullname);
    formData.append('buyer_email', buyer_email);
    formData.append('buyer_mobile', buyer_mobile);
    formData.append('buyer_address', buyer_address);
    formData.append('return_url', return_url);
    formData.append('cancel_url', cancel_url);
    formData.append('notify_url', notify_url);
    formData.append('language', language);
    formData.append('checksum', checksum);

    console.log('👌  formData:', formData);

    const { data } = await this.httpService
      .post(VIETCOMBANK_URL, formData)
      .toPromise();

    this.listOrder.push({
      order_code,
      token_code: data.result_data.token_code,
    });

    return data;
  }

  async checkOrder(order_code: string) {
    console.log(this.listOrder);
    const merchant_site_code = '7';
    const merchant_passcode = '123456789';
    const order = this.listOrder.find(
      (order) => order.order_code === order_code,
    );
    const token_code = order.token_code;

    const hash = crypto.createHash('md5');

    hash.update(
      merchant_site_code + '|' + token_code + '|' + merchant_passcode,
    );

    const checksum = hash.digest('hex').toString();

    const formData = new FormData();
    formData.append('function', 'CheckOrder');
    formData.append('merchant_site_code', merchant_site_code);
    formData.append('token_code', token_code);
    formData.append('checksum', checksum);

    const { data } = await this.httpService
      .post(VIETCOMBANK_URL, formData)
      .toPromise();

    return data;
  }

  @Get('order-return/:order_code')
  async orderReturn(
    @Param('order_code') order_code: string,
    @Res({ passthrough: true }) res,
  ) {
    const data: CheckOrderResponse = await this.checkOrder(order_code);

    if (data.result_code === '0000') {
      res.redirect('http://localhost:3000/payment-success');
    } else {
      res.redirect('http://localhost:3000/payment-fail');
    }

    return data;
  }

  @Get('order-canceled')
  async orderCanceled() {
    return 'order-canceled';
  }

  @Get('order-notify')
  async orderNotify() {
    return 'order-notify';
  }
}
