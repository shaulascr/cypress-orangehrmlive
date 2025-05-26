class adminPage {
    openAdmin() {
        cy.get('a[href="/web/index.php/admin/viewAdminModule"]').click();
        cy.url().should("include", "/web/index.php/admin/viewSystemUsers");
        cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-level').should("have.text", "User Management");
        cy.get('[data-v-10d463b7=""]').contains('Add').click();
        cy.url().should("include", "/web/index.php/admin/saveSystemUser");
        cy.get('.oxd-text.oxd-text--h6.orangehrm-main-title').should("have.text", "Add User");
    }

    openPIM(){
        cy.url().should('include', '/web/index.php/pim/viewEmployeeList');
        cy.get('.oxd-topbar-header-breadcrumb-module').should('have.text', 'PIM');
        // cy.contains('i', 'Add').click();  
        cy.get('.orangehrm-header-container > .oxd-button').contains('Add').click();        
        cy.url().should('include', '/web/index.php/pim/addEmployee');
        cy.get('.oxd-topbar-header-breadcrumb').should("have.text", "PIM");
    }

    fillUserRole(){
        // cy.get('.oxd-select-text.oxd-select-text--active').clear().select('Admin');
        //gabisa pake .select() larena bkn element select. ini manual dropdown pake div
        // cy.get('.oxd-label.oxd-input-field-required').should('have.text', 'User Role');
        cy.get('label.oxd-input-field-required').contains('User Role').should('have.text', 'User Role');

        cy.get('.oxd-select-text.oxd-select-text--active').contains('-- Select --').click()
        // cy.get('.oxd-select-text-input').contains('Admin').click()
        cy.get('[role="listbox"]').contains('Admin').click()
        cy.get('.oxd-select-text-input').should("have.text", "Admin-- Select --");
    }

    fillEmployeeName(){
        cy.get('label.oxd-input-field-required').contains('Employee Name').should('have.text', 'Employee Name');

        // cy.get('[placeholder="Type for hints..."]').clear().type("Budi Santoso");
        cy.get('.oxd-autocomplete-text-input > input').type('a');
        cy.wait(2000);
        cy.get('.oxd-autocomplete-dropdown').should('be.visible');
        cy.get('.oxd-autocomplete-option').eq(0).click();
    }

    fillStatus(){
        cy.get('label.oxd-input-field-required').contains('Status').should('have.text', 'Status');
        cy.get('.oxd-select-text.oxd-select-text--active').contains('-- Select --').click()
        cy.get('[role="listbox"]').contains('Enabled').click()
        // cy.get().contains().click()
    }

    fillUsername(username){
        cy.get('label.oxd-input-field-required').contains('Username').should('have.text', 'Username');
        cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type(username);
         
//div[@class='oxd-select-text oxd-select-text--focus']
    }

    fillPassword(password){
        cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type(password);
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type(password);
        cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').invoke('val').then((pwd) =>{
            cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').invoke('val').should('eq', pwd);
        });
    
    }

    fillFirstNameEmp(){
        cy.get('[name="firstName"]').clear().type('Budi');
    }
    fillMiddleNameEmp(){
        cy.get('[name="middleName"]').clear().type('Santoso');
    }
    fillLastNameEmp(){
        cy.get('[name="lastName"]').clear().type('Santoso');
    }
    fillId(id){
        cy.get('.oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type(id);
    }
    createDetailEmp(username){
        cy.get('.oxd-switch-wrapper').click();
        cy.get(':nth-child(4) > .oxd-grid-2 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type(username);
        cy.get('[data-v-7ef819fd=""]').contains('Enabled').click();
        

    }

    createDetailPass(password){
        cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type(password);
        cy.get('.oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type(password);
        // cy.get('.oxd-button.oxd-button--medium.oxd-button--secondary orangehrm-left-space').contains('Save')
        cy.contains('button', 'Save').click();
    }

}

export default new adminPage()