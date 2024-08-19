const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInWithPassword = '//*[@id="substack-login"]/div[2]/div[2]/form/div[2]/div/a'
    this.emailInput = '//*[@id="substack-login"]/div[2]/div[2]/form/div[1]/input';
    this.passwordInput = '//*[@id="substack-login"]/div[2]/div[2]/form/input[3]';
    this.loginButton = '//*[@id="substack-login"]/div[2]/div[2]/form/button'
    this.errorMessage = '//*[@id="page-content-inner"]/div[2]/strong';
    this.dashboardLoginButton =
      '//*[@id="substack-home"]/div[1]/div[1]/div/div[2]/div/button';
    this.invalidErrorMessage = '//*[@id="error-container"]/div';
    this.dashboardAvatar = '//*[@id="trigger1"]/picture/img';
    this.accountName = '//*[@id="dialog2"]/div/div/div/a/div/div/div/div[1]';
    this.emptyErrorEmail = '//*[@id="substack-login"]/div[2]/div[2]/form/div[2]';
    this.emptyErrorPassword = '//*[@id="substack-login"]/div[2]/div[2]/form/div[3]'
  }

  async login(email, password) {
    await this.page.locator(this.dashboardLoginButton).click();
    await this.page.locator(this.signInWithPassword).click();
    await this.page.locator(this.emailInput).fill(email);
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  }

  async verifyValidLogin() {
    await this.page.locator(this.dashboardAvatar).click()
    await expect(this.page.locator(this.accountName)).toHaveText("Sumit Maharjan");
  }

  async invalidLogin() {
    await expect(this.page.locator(this.invalidErrorMessage)).toHaveText(
      "We were unable to sign you in. This may indicate that there is no account for this email address, that the provided password was incorrect, or that there is no password set for this account. You can try signing in via email."
    );
  }

  async emptyEmailLogin(errormessage){
    await expect(this.page.locator(this.emptyErrorEmail)).toHaveText(errormessage);
  }
  async emptyPasswordLogin(){
    await expect(this.page.locator(this.emptyErrorPassword)).toHaveText("Please enter a longer password")
  }
};
