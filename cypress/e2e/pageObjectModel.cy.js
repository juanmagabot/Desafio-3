import {HomePage} from '../support/pages/homePage.cy';
import {LoginPage} from '../support/pages/loginPage.cy';
import {OnlineShopPage} from '../support/pages/onlineShopPage.cy';
import {RegisterPage} from '../support/pages/registerPage.cy';
import {ShopCartProductsPage} from '../support/pages/shopCartProductsPage.cy';

describe('Desafio3', () => { 

  let fixtureUserData;
  let fixtureProductData;
  const registerPage = new RegisterPage();
  const loginPage = new LoginPage();
  const homePage = new HomePage();
  const onlineShopPage = new OnlineShopPage();
  const shopCartProductsPage = new ShopCartProductsPage();

  before('Before', () => {
    cy.fixture("dataUsuario").then(data => { fixtureUserData = data});
    cy.fixture("dataProduct").then(data => { fixtureProductData = data});
})

it('Caso De Prueba', () => {
  cy.visit('/');
  registerPage.dblClickIniciaSesion();
  loginPage.typeUsername(fixtureUserData.userName);
  loginPage.typePassword(fixtureUserData.pass);
  loginPage.clickLogIn();
  homePage.clickOnlineShop();
  onlineShopPage.addProduct(fixtureProductData.Product1.nameProduct);
  onlineShopPage.closeModal();
  onlineShopPage.addProduct(fixtureProductData.Product2.nameProduct);
  onlineShopPage.closeModal();
  onlineShopPage.clickShoppingCartButton();
  shopCartProductsPage.returnProductName(fixtureProductData.Product1.nameProduct).should('have.text', `${fixtureProductData.Product1.nameProduct}`);
  shopCartProductsPage.returnProductName(fixtureProductData.Product2.nameProduct).should('have.text', `${fixtureProductData.Product2.nameProduct}`);
  shopCartProductsPage.returnProductPrice(fixtureProductData.Product1.priceProduct).should('have.text', `$${fixtureProductData.Product1.priceProduct}`);
  shopCartProductsPage.returnProductPrice(fixtureProductData.Product2.priceProduct).should('have.text', `$${fixtureProductData.Product2.priceProduct}`);
  shopCartProductsPage.clickShowTotalPrice();
  shopCartProductsPage.returnTotalPrice().should('have.text', `${fixtureProductData.Product1.priceProduct + fixtureProductData.Product2.priceProduct}`);
})

})