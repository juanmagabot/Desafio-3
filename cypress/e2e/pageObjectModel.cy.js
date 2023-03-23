
import {HomePage} from '../support/pages/homePage.cy';
import {ProductPage} from '../support/pages/ProductPage.cy';
import {ShopCartProductsPage} from '../support/pages/shopCartProductsPage.cy';
import {CheckOut} from '../support/pages/checkOut.cy';
import {Recipt} from '../support/pages/recipt.cy';

describe('Desafio Final', () => { 
  let fixtureProductData;
  let fixtureCreditData;
  let token;
  let userAPI;
  const username = "Juanma1";
  const password = "123456!";
  const gender = "Male";
  const day = "13";
  const month = "December";
  const year = "1995";   
  const homePage = new HomePage();
  const productPage = new ProductPage();
  const shopCartProductsPage = new ShopCartProductsPage();
  const checkOut = new CheckOut();
  const recipt = new Recipt();

  before('Before', () => {
    cy.fixture("dataProduct").then(data => { fixtureProductData = data});
    cy.fixture("dataCredit").then(data => { fixtureCreditData = data});
  })

  after('after', () => {
    window.localStorage.setItem("token","");
    cy.request({
      url: `https://pushing-it.onrender.com/api/deleteuser/${username}`,
      method: 'DELETE',
  }).then(response => {
      expect(response.status).equal(200);
  });
});

    it('Caso De Prueba', () => {
      cy.request({
        url: 'https://pushing-it.onrender.com/api/register',
        method: 'POST',
        body: {
            username: username,
            password: password,
            gender: gender,
            day: day,
            month: month,
            year: year
        },
    }).then(response => {
        expect(response.status).equal(200);
        cy.request({
          url: 'https://pushing-it.onrender.com/api/login',
          method: 'POST',
          body: {
              username: username,
              password: password
          },
        }).then(response => {
          expect(response.status).equal(200);
          token = response.body.token;
          userAPI = response.body.user.username;
        });
    }); 

  window.localStorage.setItem("token", token)
  window.localStorage.setItem("user", userAPI)
  cy.visit('/');
  homePage.clickOnlineShop();
  productPage.addProduct(fixtureProductData.Product1.nameProduct);
  productPage.closeModal();
  productPage.addProduct(fixtureProductData.Product2.nameProduct);
  productPage.closeModal();
  productPage.clickShoppingCartButton();
  shopCartProductsPage.returnProductName(fixtureProductData.Product1.nameProduct).should('have.text', `${fixtureProductData.Product1.nameProduct}`);
  shopCartProductsPage.returnProductName(fixtureProductData.Product2.nameProduct).should('have.text', `${fixtureProductData.Product2.nameProduct}`);
  shopCartProductsPage.returnProductPrice(fixtureProductData.Product1.priceProduct).should('have.text', `$${fixtureProductData.Product1.priceProduct}`);
  shopCartProductsPage.returnProductPrice(fixtureProductData.Product2.priceProduct).should('have.text', `$${fixtureProductData.Product2.priceProduct}`);
  shopCartProductsPage.clickShowTotalPrice();
  shopCartProductsPage.returnTotalPrice().should('have.text', `${fixtureProductData.Product1.priceProduct + fixtureProductData.Product2.priceProduct}`);
  shopCartProductsPage.clickCheckOut();
  checkOut.typeName(fixtureCreditData.firstName);
  checkOut.typeLastName(fixtureCreditData.lastName);
  checkOut.typeCreditCard(fixtureCreditData.creditNumber);
  checkOut.clickPurchase();
  cy.wait(13000)
  recipt.returnFullName().should('have.text', `${fixtureCreditData.firstName} ${fixtureCreditData.lastName} has succesfully purchased the following items`);
  recipt.returnProductName(fixtureProductData.Product1.nameProduct).should('have.text', `${fixtureProductData.Product1.nameProduct}`);
  recipt.returnProductName(fixtureProductData.Product2.nameProduct).should('have.text', `${fixtureProductData.Product2.nameProduct}`);
  recipt.returnCreditNumber().should('have.text', `${fixtureCreditData.creditNumber}`);
  recipt.returnTotalPrice().should('have.text', `You have spent $${fixtureProductData.Product1.priceProduct + fixtureProductData.Product2.priceProduct}`);
})
})

