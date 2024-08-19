const { test, expect } = require("playwright/test");
const LoginTestData = require("../../Fixtures/Login.fixture.json");
const dashboardTestData = require("../../Fixtures/Dashboard.fixture.json");

const { DashboardPage } = require("../../page-objects/dashboard.po");
const { LoginPage } = require("../../page-objects/login.po");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);
  await login.login(
    LoginTestData.validUser.email,
    LoginTestData.validUser.password
  );
  // await login.verifyValidLogin();
});

test.describe("Add Delete and Edit blog", () => {
  test.describe.configure({ mode: "serial" });
  test("create Blog", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.postNote();
    await dashboard.validatePosting();
  });

  test("edit note", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.editPost();
    await dashboard.verifyEdit();
  });

  test("search blog", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.searchBlog();
  });

  test("delete blog", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.deleteBlog();
    await page.waitForTimeout(2000);
    // await dashboard.verifyDelete();
    // await page.waitForTimeout(3000);
  });

  test("logout", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.logoutUser();
    await dashboard.logoutVerify();
  });
});
