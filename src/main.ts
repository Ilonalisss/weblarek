import './scss/styles.scss';
import { Buyer } from './components/models/Buyer';
import { Cart } from './components/models/Cart';
import { Catalog } from './components/models/Catalog';
import { LarekAPI } from './components/models/LarekAPI';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';


console.log('\n Тестирование Catalog');
const catalog = new Catalog();

catalog.on('catalog:changed', (data) => {
  console.log('Каталог изменился', data);
});

catalog.setProductsList(apiProducts.items);
console.log('Товары в каталоге:', catalog.getProductsList());

const firstProduct = catalog.getProductsList()[0];
if (firstProduct) {
  console.log('Товар по ID:', catalog.getProductById(firstProduct.id));
  
  catalog.selectProduct(firstProduct);
  console.log('Выбранный товар:', catalog.getSelectedProduct());
}

console.log('\n Тестирование Cart');
const cart = new Cart();

cart.on('basket:changed', (data) => {
  console.log('Корзина изменилась', data);
});

const product1 = catalog.getProductsList()[0];
const product2 = catalog.getProductsList()[1];

if (product1) {
  cart.addProduct(product1);
  console.log(`Добавлен: ${product1.title}`);
}

if (product2) {
  cart.addProduct(product2);
  console.log(`Добавлен: ${product2.title}`);
}

console.log('Товары в корзине:', cart.getProductsList());
console.log('Количество:', cart.getTotalProducts());
console.log('Общая стоимость:', cart.getTotalPrice());
console.log('Есть product1?', cart.hasProduct(product1?.id || ''));

if (product1) {
  cart.removeProduct(product1);
  console.log('После удаления:', cart.getProductsList());
}

cart.clearCart();
console.log('После очистки:', cart.getProductsList());


console.log('\n Тестирование Buyer');
const buyer = new Buyer();

buyer.on('form:errors', (errors) => {
  console.log('Ошибки валидации:', errors);
});

buyer.setBuyerPayment('card');
buyer.setBuyerAddress('ул. , д.');
buyer.setBuyerEmail('@mail.ru');
buyer.setBuyerPhone('+7999999999');

console.log('Все данные покупателя:', buyer.getBuyerData());

console.log('Валидация заказа (оплата+адрес):', buyer.validateOrder());
console.log('Валидация контактов (email+телефон):', buyer.validateContacts());

buyer.clear();
console.log('После очистки:', buyer.getBuyerData());


const api = new Api(API_URL);
const larekApi = new LarekAPI(api);

console.log('\n Загрузка товаров с сервера ');
larekApi.getProducts()
  .then(products => {
    console.log('Товары получены с сервера:', products);
    
    catalog.setProductsList(products);
    console.log('Товары сохранены в каталог');
    console.log('Первый товар:', catalog.getProductsList()[0]);
    

    if (products.length > 0) {
      cart.addProduct(products[0]);
      console.log('Товар добавлен в корзину');
      console.log('Товары в корзине:', cart.getProductsList());
    }
  })
  .catch(error => {
    console.error('Ошибка загрузки:', error);
  });
