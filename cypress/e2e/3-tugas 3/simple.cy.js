require('cypress-xpath');
import loginPage from "../../pages/loginPage";
import adminPage from "../../pages/adminPage";

let passwordAdmin = "admin123";
let usernameAdmin = "Admin";
const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const newusernameAdmin = Cypress._.sampleSize(characters, 5).join('');;
const randomNumber = Math.floor(Math.random() * 1000000);
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
const genereateUsername = Cypress._.sampleSize(characters, 7).join('');
const adminPass = "vJ#^K7ZU_63X";
const wrongPassword = Cypress._.sampleSize(chars, 3).join('');

describe('Login sebagai admin', function(){
    it('Berhasil login sebagai admin', function(){
        cy.visit("/");
        cy.get('[name="username"]').clear().type(usernameAdmin);
        cy.get('[name="password"]').clear().type(passwordAdmin);
        cy.get('[type="submit"]').click();
        cy.url().should("include", "/web/index.php/dashboard/index");
        cy.get('.oxd-topbar-header-breadcrumb').should("have.text", "Dashboard")
        cy.screenshot('halaman-dashboard');

    });
    it('Gagal login sebagai admin', function(){
        cy.visit("/");
        cy.get('[name="username"]').clear().type(usernameAdmin);
        cy.get('[name="password"]').clear().type("wrongpassword");
        cy.get('[type="submit"]').click();
        cy.get('.oxd-text.oxd-text--p.oxd-alert-content-text').should("have.text", "Invalid credentials")
    });
});

describe('Buat akun untuk karyawan', function(){
    beforeEach(function() {
        cy.visit('/');
        loginPage.loginUser(usernameAdmin, passwordAdmin);
        cy.contains('span', 'PIM').click();
    });
    it('Masuk halaman tambah karyawan', function(){
        cy.url().should('include', '/web/index.php/pim/viewEmployeeList');
        cy.get('.oxd-topbar-header-breadcrumb-module').should('have.text', 'PIM');
        cy.get('.orangehrm-header-container > .oxd-button').contains('Add').click();     
    });
    it('Berhasil buat akun', function(){
        const id = randomNumber.toString();
        adminPage.openPIM();
        cy.url().should('include', '/web/index.php/pim/addEmployee');
        cy.get('.oxd-text.oxd-text--h6.orangehrm-main-title').should('have.text', 'Add Employee');
        cy.contains('Employee Full Name').should('have.text', 'Employee Full Name');
        adminPage.fillFirstNameEmp();
        adminPage.fillMiddleNameEmp();
        adminPage.fillLastNameEmp();
        adminPage.fillId(id);
        adminPage.createDetailEmp(genereateUsername);
        adminPage.createDetailPass(adminPass);
        cy.get('.oxd-toast-content').should('contain', 'Success');
        cy.screenshot('berhasil-tambah-karyawan');

    });
});

describe('Buat admin', function(){
    beforeEach(function() {
        cy.visit('/');
        loginPage.loginUser(usernameAdmin, passwordAdmin);
        cy.contains('span', 'Admin').click();
    });
    it('Masuk halaman tambah admin', function(){
       
        cy.url().should("include", "/web/index.php/admin/viewSystemUsers");
        cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-level').should("have.text", "User Management");
        cy.get('[data-v-10d463b7=""]').contains('Add').click();
        cy.url().should("include", "/web/index.php/admin/saveSystemUser");
        cy.get('.oxd-text.oxd-text--h6.orangehrm-main-title').should("have.text", "Add User");
    });

    it('Berhasil tambah admin', function(){
        adminPage.openAdmin();
        adminPage.fillUserRole();
        adminPage.fillEmployeeName();
        adminPage.fillStatus();
        adminPage.fillUsername(newusernameAdmin);
        adminPage.fillPassword(adminPass);
        cy.contains('button', 'Save').click();
        cy.get('.oxd-toast-content').should('contain', 'Success');
        cy.screenshot('berhasil-tambah-admin');
    });
});

describe('Tambah cuti', function(){
    it('tambah cuti karyawan', function(){
        cy.visit('/');
        loginPage.loginUser(usernameAdmin, passwordAdmin);
        cy.contains('span', 'Leave').click();
        cy.xpath('//span[normalize-space()="Entitlements"]').click();
        cy.xpath('//a[normalize-space()="Add Entitlements"]').click();
        cy.xpath('//label[normalize-space()="Individual Employee"]').click();
        cy.get('.oxd-autocomplete-text-input > input').type('a');
        cy.wait(2000);
        cy.get('.oxd-autocomplete-dropdown').should('be.visible');
        cy.get('.oxd-autocomplete-option').eq(0).click();
        cy.xpath('//div[contains(text(),"-- Select --")]').click();
        cy.get('.oxd-select-dropdown').contains('CAN - Personal').click();
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').then($select => {
            const options = $select.find('option');
            const randomIndex = Math.floor(Math.random() * options.length);
            const randomValue = options.eq(randomIndex).val();
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click(randomValue);
        });
        cy.xpath("(//input[@class='oxd-input oxd-input--active'])[2]").type('1');
        cy.xpath("//button[normalize-space()='Save']").click();
        cy.wait(2000);
        cy.xpath("//button[normalize-space()='Confirm']").click();
        cy.get('.oxd-toast-content').should('contain', 'Success');
        cy.xpath("//span[normalize-space()='(1) Record Found']").should('contain', "Record Found")
        cy.screenshot('berhasil-tambah-cuti-karyawan');
    });
    it('Karyawan Request Cuti', function(){
        loginPage.loginUser(genereateUsername, adminPass);
        cy.wait(4000);
        cy.contains('span', 'Leave').click();
        cy.get('.oxd-topbar-body-nav > ul > :nth-child(1)').click();
        cy.screenshot('halaman-request-cuti');
        cy.xpath("//div[@class='oxd-select-text oxd-select-text--focus']").click();
        cy.get('.oxd-select-dropdown').contains('CAN - Personal').click();
        cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input').clear().type('2025-05-28');
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input').clear().type('2025-05-30');
        cy.xpath("//button[normalize-space()='Apply']").click();
        cy.get('.oxd-toast-content').should('contain', 'Success');
        cy.screenshot('berhasil-request-cuti');
    });
});
