const { test, expect } = require("@playwright/test");
const testData = require("../../Fixtures/Login.fixture.json");
const { LoginPage } = require("../../page-objects/login.po");


console.log(testData.validUser.email);

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Login tests", () => {
  test.describe.configure({ mode: "serial" });
  test.describe("valid login tests", () => {
    test("valid login", async ({ page }) => {
      const login = new LoginPage(page);
      await login.login(testData.validUser.email, testData.validUser.password);
      await login.verifyValidLogin();
    });
  });

  test.describe("invalid login tests", () => {
    test.describe.configure({ mode: "serial" });
    test("login invalid", async ({ page }) => {
      const login = new LoginPage(page);
      await login.login(
        testData.invalidUser.invalidCredentials.email,
        testData.invalidUser.invalidCredentials.password
      );

      await login.invalidLogin();
    });

    test("empty field", async ({ page }) => {
      const login = new LoginPage(page);
      await login.login(
        testData.invalidUser.emptyField.email,
        testData.invalidUser.emptyField.password
      );
      await login.emptyEmailLogin("Please enter a valid email");
      await login.emptyPasswordLogin();
    });

    test("email empty", async ({ page }) => {
      const login = new LoginPage(page);
      await login.login(
        testData.invalidUser.emptyEmail.email,
        testData.invalidUser.emptyEmail.password
      );
      await login.emptyEmailLogin("Please enter a valid email");
    });

    test("Password empty", async ({ page }) => {
      const login = new LoginPage(page);
      await login.login(
        testData.invalidUser.emptyPassword.email,
        testData.invalidUser.emptyPassword.password
      );
      await login.emptyEmailLogin("Please enter a longer password");
    });

    test("email with leading space", async ({ page }) => {
      const login = new LoginPage(page);
      await login.login(
        testData.invalidUser.emailLeadingSpace.email,
        testData.invalidUser.emailLeadingSpace.password
      );
      await page.waitForTimeout(3000);
      await login.verifyValidLogin();
    });

    test("password with leading space", async ({ page }) => {
      const login = new LoginPage(page);
      await login.login(
        testData.invalidUser.passwordLeadingSpace.email,
        testData.invalidUser.passwordLeadingSpace.password
      );
      await login.invalidLogin();
    });
  });
});