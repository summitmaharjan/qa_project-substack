const { expect } = require("@playwright/test");
const dashboardTestData = require("../Fixtures/Dashboard.fixture.json");
const exp = require("constants");

exports.DashboardPage = class DashboardPage {
  constructor(page) {       
    this.page = page;
    this.plus = '//*[@id="trigger7"]';
    this.createNote = '//*[@id="dialog8"]/div/div/div/button/div[2]';
    this.writeNote = '//*[@id="headlessui-dialog-panel-P0-0"]/div/div[1]/div[2]/div/div/div[1]/div/div[1]/div';
    this.postButton = '//*[@id="headlessui-dialog-panel-P0-0"]/div/div[1]/div[3]/button';

    this.avatar = '//*[@id="trigger1"]';
    this.account = '//*[@id="dialog2"]/div/div/div/a';
    this.notesTab = '//*[@id="entry"]/div[1]/div[4]/div/div[2]/div[2]/div[1]/button[2]/div'
    this.verifynote = '//*[@id="entry"]/div[1]/div[4]/div/div[2]/div[2]/div[2]/div/div[1]/div/div/div/div/div[1]/div/div[2]/div/div/p'

    this.menu = '//*[@id="trigger11"]';
    this.editBtn = '//*[@id="dialog12"]/div/div/div/button[3]/div[2]'
    this.editInput = '//*[@id="headlessui-dialog-panel-P0-0"]/div/div[1]/div[2]/div/div/div[1]/div/div[1]/div';
    this.save = '//*[@id="headlessui-dialog-panel-P0-0"]/div/div[1]/div[3]/button';

    this.searchInput = '//*[@id="entry"]/div[1]/div[2]/div/div/div[2]/div[1]/form/input';
    this.searchPopupInput = '//*[@id="headlessui-combobox-input-P0-1"]';
    this.noteBtn = '//*[@id="reader-nav-page-scroll"]/div/div/div[1]/div[2]/div/div/div/div[2]/div/button[4]'
    this.verifyNoteSearch = '//*[@id="reader-nav-page-scroll"]/div/div/div[2]/div/div/div[1]/div/div/div/div/div[1]/div/div[2]/div/div/p'
  
    this.deleteBtn= '//*[@id="dialog12"]/div/div/div/div/button/div[2]';
    this.popUpDeleteBtn ='//*[@id="headlessui-dialog-panel-P0-0"]/div[3]/button[2]';
    this.deleteToast = '//*[@id="entry"]/div[2]/div/div/div[1]/div';

    this.logoutBtn = '//*[@id="dialog2"]/div/div/div/div[3]/a[3]/div';
    this.dashboardLoginButton =
      '//*[@id="substack-home"]/div[1]/div[1]/div/div[2]/div/button';
  }

  async postNote() {
    await this.page.locator(this.plus).click();
    await this.page.locator(this.createNote).click();
    await this.page.locator(this.writeNote).fill(dashboardTestData.note);
    await this.page.locator(this.postButton).click();
  }

  async validatePosting() {
    await this.page.locator(this.avatar).click();
    await this.page.locator(this.account).click()
    await this.page.locator(this.notesTab).click();
    await expect(this.page.locator(this.verifynote)).toHaveText(dashboardTestData.note)
    // await this.page.waitForTimeout(3000);
  }
  
  async editPost() {
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.avatar).click();    
    await this.page.locator(this.account).click()
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.notesTab).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.menu).click();
    await this.page.locator(this.editBtn).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.editInput).fill(dashboardTestData.editNote);
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.save).click();  
    
  }
  
  async verifyEdit() {
    await this.page.waitForTimeout(2000);

    await this.page.locator(this.avatar).click()
    await this.page.locator(this.notesTab).click();
    await expect(this.page.locator(this.verifynote)).toHaveText(dashboardTestData.editNote)
    await this.page.waitForTimeout(2000);
  }
  
  async searchBlog() {
    await this.page.locator(this.searchInput).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.searchPopupInput).fill("sumit maharjan");
    await this.page.waitForTimeout(2000);
    await this.page.keyboard.press("Enter");
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.noteBtn).click();
    await this.page.waitForTimeout(2000);
    await expect(this.page.locator(this.verifyNoteSearch)).toHaveText(
      dashboardTestData.searchNote
    );
  }
  
  async deleteBlog() {
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.avatar).click();    
    await this.page.locator(this.account).click()
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.notesTab).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.menu).click();
    await this.page.locator(this.deleteBtn).click();
    await this.page.locator(this.popUpDeleteBtn).click();
  }

  // async verifyDelete() {
  //   await expect(this.page.locator(this.verifyDeleteBlog)).toBeHidden();
  // }

  async logoutUser() {
    await this.page.locator(this.avatar).click();    
    await this.page.locator(this.logoutBtn).click();    
  }

  async logoutVerify() {
    await expect(this.page.locator(this.dashboardLoginButton)).toBeVisible();
  }
};
