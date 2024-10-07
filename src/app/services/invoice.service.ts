import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import { invoiceData } from '../data/invoice.data';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private invoice : Invoice = invoiceData;

  constructor() { }

  getInvoice(): Invoice {
    const total = this.calculateTotal();
    return {... this.invoice, total};
  }

  remove(id: number): Invoice {
    this.invoice.items = this.invoice.items.filter(Item => Item.id != id);
    const total = this.calculateTotal();
    return {... this.invoice, total};
  }

  save(item: Item): Invoice {
    this.invoice.items = [... this.invoice.items, item];
    const total = this.calculateTotal();
    return {... this.invoice, total};
  }

  calculateTotal() {
    //  let total = 0;

    //    this.invoice.items.forEach(Item => {
    //     total += Item.price * Item.quantity;
    //   });
    //   return total;
    return this.invoice.items.reduce((total, Item) => total + (Item.price * Item.quantity), 0)
  }

}
