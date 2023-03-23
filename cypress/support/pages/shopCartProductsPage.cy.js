export class ShopCartProductsPage {
  
  clickShowTotalPrice() {
      cy.get('button').contains('Show total price').click();
  }

  returnProductName(product){
      const productName = cy.get('p#productName').contains(product);
      return productName;
  }

  returnProductPrice(product){
      const productPrice = cy.get('p#productPrice').contains(product);
      return productPrice;
  }

  returnTotalPrice(){
      return cy.get('#price');
  }

  clickCheckOut(){
    cy.get('button').contains('Go to Checkout').click();
  }  

}