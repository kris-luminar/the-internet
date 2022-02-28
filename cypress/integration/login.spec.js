import {loginPage} from '../page-objects/login_page';
import {securePage} from '../page-objects/secure_page';
import {login} from '../support/utils';

describe('login process', () => {
    beforeEach(() => {
        cy.visit('/login')
    })

    it('should have the right content for the login page', () => {
        cy.get(loginPage.title).should('be.visible').and('contain.text', 'Login Page')
        cy.get(loginPage.subheader).should('be.visible')
            .and('contain.text', 'This is where you can log into the secure area.')
    })

    describe('when valid credentials are provided', () => {
        beforeEach(() => {
            login();
        })

        it('should be successfully redirected to /secure', () => {
            cy.url().should('match', /\/secure$/);
            cy.get(securePage.flashMessage).should('contain.text', 'You logged into a secure area!')
                .and('be.visible')
        })

        it('should have the right content for the secure page', () => {
            cy.get(securePage.title).should('contain.text', 'Secure Area')
            cy.get(securePage.subheader).should('contain.text', 'Welcome to the Secure Area. When you are done click logout below.')
        })

        afterEach(() => {
            cy.get(securePage.logoutLink).click()
        })
    })
})