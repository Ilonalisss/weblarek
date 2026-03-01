import { IProduct } from '../../types/index';
import { EventEmitter } from "../base/Events";

export class Catalog extends EventEmitter {
  protected productsList: IProduct[] = [];
  protected selectedProduct: IProduct | null = null;

  /**
 * Сохранение массива товаров
 */
  setProductsList(products: IProduct[]): void {
    this.productsList = products;
    this.emit('catalog:changed', { 
      count: this.productsList.length,
      products: this.productsList 
    });
  }
  /**
 * Получение массива товаров
 */
  getProductsList(): IProduct[] {
    return this.productsList;
  }

  getProductById(id: string): IProduct | null {
    return this.productsList.find(product => product.id === id) || null;
  }

  selectProduct(product: IProduct): void {
    this.selectedProduct = product;
    this.emit('product:selected', { 
      product: this.selectedProduct,
      id: product.id 
    });
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}