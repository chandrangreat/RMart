import { RouterService } from './../../core/services/router.service';
import { Injectable } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart, CartProduct } from 'src/app/core/types/Cart';
// import { vfs, fonts, createPdf } from 'pdfmake/build/pdfmake';
// import * as pdfMake from 'pdfmake/build/pdfmake';
import {
  PdfMakeWrapper,
  Columns,
  Txt,
  Table,
  Line,
  Canvas,
} from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { CurrencyPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  cart: Cart = <Cart>{};
  // vfs = pdfFonts.pdfMake.vfs;

  constructor(
    private _cartService: CartService,
    private _routerService: RouterService,
    private _currencyPipe: CurrencyPipe
  ) {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  generateOrderNumber() {
    let now = Date.now().toString(); // '1492341545873'
    // pad with extra random digit
    now += now + Math.floor(Math.random() * 10);
    // format
    return [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join('');
  }

  placeOrder(checkoutInformation: {
    name: string;
    address: string;
    paymentMethod: string;
  }) {
    this.cart = this._cartService.getCartFromLocalStorage();
    const pdf = new PdfMakeWrapper();
    const orderId = this.generateOrderNumber();

    pdf.info({
      title: `Order No. ${orderId}`,
      subject: 'Order Receipt',
      creator: 'RMart',
      producer: 'RMart',
    });

    pdf.add({
      text: `RMART`,
      margin: [20, 0, 20, 20],
      style: 'header',
    });

    pdf.add('\n');

    pdf.add({
      text: `Order No. ${orderId}`,
      margin: [0, 0, 0, 20],
      style: 'header',
    });

    pdf.add('\n');

    pdf.add({
      text: 'Shipping Information',
      style: 'miniHeader',
    });

    pdf.add('\n');

    const nameColumn = new Columns([
      'Name',
      {
        text: checkoutInformation.name,
        style: 'boldText',
      },
    ]).columnGap(10).end;

    pdf.add(nameColumn);

    pdf.add('\n');

    const addressColumn = new Columns([
      'Address',
      {
        text: checkoutInformation.address,
        style: 'boldText',
      },
    ]).columnGap(10).end;

    pdf.add(addressColumn);

    pdf.add('\n');

    pdf.add({
      text: 'Payment Information',
      style: 'miniHeader',
    });

    const paymentMethodColumn = new Columns([
      'Payment Method',
      {
        text: checkoutInformation.paymentMethod,
        style: 'boldText',
      },
    ]).columnGap(10).end;

    pdf.add('\n');

    pdf.add(paymentMethodColumn);

    pdf.add('\n');

    pdf.add({
      text: 'Items Summary',
      style: 'miniHeader',
    });

    pdf.add('\n');

    let rows = [
      [
        { text: 'Product Id', style: 'boldText' },
        { text: 'Item', style: 'boldText' },
        { text: 'Unit Price', style: 'boldText' },
        { text: 'Quantity', style: 'boldText' },
        { text: 'Total Price', style: 'boldText' },
      ],
    ];

    let cartDataArray = this.cart.cartProducts.map(
      (cartProduct: CartProduct) => {
        let row = [];
        row.push(cartProduct.id);
        row.push(cartProduct.name);
        row.push(cartProduct.price);
        row.push(cartProduct.cartProductQuantity);
        row.push(
          this._currencyPipe.transform(
            cartProduct.cartProductPrice,
            'INR',
            'symbol',
            '1.0-0'
          )
        );
        return row;
      }
    );

    let rowsToBePrinted = [...rows, ...cartDataArray];

    const itemsTable = new Table(rowsToBePrinted).widths([
      100, 100, 100, 100, 100,
    ]).end;

    pdf.add(itemsTable);

    pdf.add('\n');

    pdf.add({
      text: 'Delivery Information',
      style: 'miniHeader',
    });

    pdf.add('\n');

    const deliveryInformationColumn = new Columns([
      'Delivery',
      {
        text: 'Free',
        style: 'boldText',
      },
    ]).columnGap(10).end;

    pdf.add(deliveryInformationColumn);

    pdf.add('\n');
    pdf.add('\n');

    const totalChargesColumn = new Columns([
      {
        text: 'Total Charges',
        style: 'boldBigText',
      },
      {
        text: this._currencyPipe.transform(
          this.cart.totalCartPrice,
          'INR',
          'symbol',
          '1.0-0'
        ),
        style: 'boldBigText',
      },
    ]).columnGap(10).end;

    pdf.add(totalChargesColumn);

    pdf.add('\n');
    pdf.add('\n');
    pdf.add('\n');

    pdf.add({
      text: 'Thank you for shopping with us',
      style: 'thankyouNote',
    });

    pdf.add('\n');

    pdf.add(new Canvas([new Line([20, 60], [500, 60]).end]).end);

    pdf.styles({
      brand: {
        bold: true,
        fontSize: 22,
        alignment: 'center',
      },
      header: {
        bold: true,
        fontSize: 20,
        alignment: 'center',
      },
      miniHeader: {
        fontSize: 17,
        decoration: 'underline',
      },
      boldText: {
        bold: true,
      },
      boldBigText: {
        bold: true,
        fontSize: 18,
      },
      thankyouNote: {
        italics: true,
        alignment: 'center',
      },
    });

    pdf.create().download(`RMart-${orderId}`, () => {
      this._cartService.clearCart();
      alert('Order Placed Successfully. Taking you back to shopping');
      this._routerService.routeToHomePage();
    });
  }
}
