class loginPage{

    visit(){
        cy.visit("/");
    }

    fillUsername(username){
        cy.get('[name="username"]').clear().type(username);
    }
    fillPassword(password){
        cy.get('[name="password"]').clear().type(password);
    }

    clickLogin() {
        cy.get('[type="submit"]').click();
    }

    loginUser(usernameAdmin, passwordAdmin){
        this.visit();
        this.fillUsername(usernameAdmin);
        this.fillPassword(passwordAdmin);
        this.clickLogin();
    }
}

export default new loginPage()