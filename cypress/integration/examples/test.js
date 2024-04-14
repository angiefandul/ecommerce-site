/// <reference types="Cypress" />

import HomePage from "./pageObjects/HomePage";
import ProductPage from "./pageObjects/ProductPage";



describe('My Framework Test', () => {
    let data; // Declare data variable outside the before() hook

    before(() => {
        // root-level hook, runs once before all tests
        cy.fixture('example').then((fixtureData) => {
            data = fixtureData; // Assign fixture data to the data variable
        });
    });

    it('My Second Test case!', () => {
        Cypress.config('defaultCommandTimeout', 8000)
        
        const homePage = new HomePage()
        const productPage = new ProductPage()
        
        cy.visit(Cypress.env('url')+"/angularpractice/")
        
        // Use the data variable directly
        homePage.getEditBox().type(Cypress.env('userId'));
        cy.get(':nth-child(2) > .form-control').type(Cypress.env('password'));

        homePage.getGender().select(data.gender);
        //When typing name, lets validate if it will show up on the bottom of the page textfield;
        homePage.getTwoWayDataBinding().should('have.value', data.name)
        //JQuiry has attr, to validate specific value
        homePage.getEditBox().should('have.attr','minlength','2')
        //if disabled or not:
        homePage.getEntrepreneaur().should('be.disabled')
        homePage.getShopLink().click()

        data.productName.forEach(function (element) {
            cy.selectProduct(element);
        });
        productPage.checkOutButton().click()
        var sum=0

         // Validate the sum of two products: //
        cy.get('tr td:nth-child(4) strong').each(($el, index, list) => {
            
            const amount =  $el.text()
            //we are removing $ from number 5000
            var res = amount.split(" ")
            res = res[1].trim()
            sum=Number(sum)+Number(res)
        }).then(function()
        {
            cy.log(sum)

        })
        cy.get('h3 strong').then(function(element) {
            const amount =  element.text()
            var res = amount.split(" ")
            var total = res[1].trim()
            //Compare to values - only with assertions
            expect(Number(total)).to.equal(sum)
        })

        //cy.get(':nth-child(4) > :nth-child(5) > .btn').click({force: true})
        //cy.get('#country').type('India')
        // Click the button with force
        cy.get(':nth-child(4) > :nth-child(5) > .btn').click({ force: true }).then(() => {
         // Wait for the button click action to complete
         // Then type 'India' into the input field for country
         cy.get('#country').type('India');
         });  
        

        cy.get('.suggestions > ul > li > a').click()
        cy.get('.checkbox').scrollIntoView().click({ force: true });
        //cy.get('.ng-untouched > .btn').click()
        cy.get('input[type="submit"]').click()
        //Validate if Success text appears
        //cy.get('.alert').should('have.text','Success! Thank you! Your order will be delivered in next few weeks :-)')
        cy.get('.alert').then(function(element)
        {
            const actualText =  element.text()
            

          expect(actualText.includes("Success")).to.be.true

        })
    });   
});

