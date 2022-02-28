import {loginPage} from "../page-objects/login_page";

export const login = () =>
    cy.get(loginPage.providedUsername).invoke('text').then(userName => {
        cy.get(loginPage.providedPassword).invoke('text').then(userPassword => {
            cy.get(loginPage.username).type(userName);
            cy.get(loginPage.password).type(userPassword);
            cy.get(loginPage.loginButton).contains('Login').click()
        })
    })