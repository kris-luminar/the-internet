import {loginPage} from '../page-objects/login_page';
import {securePage} from '../page-objects/secure_page';
import {login} from '../support/utils';

describe('logout process', () => {
    context('when already logged in', () => {
        beforeEach(() => {
            cy.visit('/login')
            login();
        })

        describe('when logout button clicked', () => {
            beforeEach(() => {
                cy.get(securePage.logoutLink).click()
            })

            it('should be successfully redirected to /login', () => {
                cy.url().should('match', /\/login$/);
                cy.get(loginPage.flashMessage).should('contain.text', 'You logged out of the secure area!')
                    .and('be.visible')
            })

            it('should have the right content for the login page', () => {
                cy.get(loginPage.title).should('be.visible').and('contain.text', 'Login Page')
                cy.get(loginPage.subheader).should('be.visible')
                    .and('contain.text', 'This is where you can log into the secure area.')
            })
        })
    })
})