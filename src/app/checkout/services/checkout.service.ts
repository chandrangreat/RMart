import { Injectable } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart, CartProduct } from 'src/app/core/types/Cart';
// import { vfs, fonts, createPdf } from 'pdfmake/build/pdfmake';
// import * as pdfMake from 'pdfmake/build/pdfmake';
import { PdfMakeWrapper, Columns, Txt, Table } from 'pdfmake-wrapper';
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
    private _currencyPipe: CurrencyPipe
  ) {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  uid() {
    let a = new Uint32Array(3);
    window.crypto.getRandomValues(a);
    return (
      performance.now().toString(36) +
      Array.from(a)
        .map((A) => A.toString(36))
        .join('')
    ).replace(/\./g, '');
  }

  placeOrder(checkoutInformation: {
    name: string;
    address: string;
    paymentMethod: string;
  }) {
    this.cart = this._cartService.getCartFromLocalStorage();
    // this.cart;
    const pdf = new PdfMakeWrapper();
    const orderId = this.uid();
    pdf.info({
      title: `Order No. ${orderId}`,
      subject: 'Order Receipt',
      creator: 'RMart',
      producer: 'RMart',
    });

    pdf.add({
      text: `Order No. ${orderId}`,
      margin: [0, 0, 0, 20],
      style: 'header',
    });

    pdf.add({
      text: 'Shipping Information',
      style: 'miniHeader',
      margin: [10, 0],
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
      margin: [10, 0],
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
      margin: [10, 0],
    });

    pdf.add('\n');

    let rows = [
      [
        { text: 'Product Id', style: 'boldText' },
        { text: 'Item', style: 'boldText' },
        { text: 'Quantity', style: 'boldText' },
        { text: 'Price', style: 'boldText' },
      ],
    ];

    let cartDataArray = this.cart.cartProducts.map(
      (cartProduct: CartProduct) => {
        let row = [];
        row.push(cartProduct.id);
        row.push(cartProduct.name);
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
      125, 125, 125, 125,
    ]).end;

    pdf.add(itemsTable);

    pdf.add('\n');

    pdf.styles({
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
    });

    pdf.create().open();
    // createPdf(documentDefinition).open();
  }
}
