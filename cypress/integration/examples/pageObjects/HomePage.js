class HomePage {

    getEditBox()
    {
        return cy.get("input[name='name']:nth-child(2)")
    }
    getGender()
    {
        return cy.get('select')
    }
    getEntrepreneaur()
    {
        return cy.get('#inlineRadio3')
    }
    getTwoWayDataBinding()
    {
        return cy.get(':nth-child(4) > .ng-untouched')
    }
    getShopLink()
    {
        return cy.get(':nth-child(2) > .nav-link')
    }
    
}
    
    export default HomePage;
    