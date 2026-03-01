import { Api } from '../base/Api';
import { IProduct, IOrderRequest, IOrderResponse } from '../../types/index';

export class LarekAPI {
  private _api: Api;

  constructor(api: Api) {
    this._api = api;
  }

  async getProducts(): Promise<IProduct[]> {
    const response = await this._api.get<{ items: IProduct[] }>('/product');
    return response.items;
  }

  async postOrder(order: IOrderRequest): Promise<IOrderResponse> {
    return await this._api.post<IOrderResponse>('/order', order);
  }
}