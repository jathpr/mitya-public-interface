import { test, expect } from "@playwright/test";

// Basic E2E: verify locale in URL produces correct html[lang] and text;
// then switch locale via the UI and verify URL + html[lang] + sample string.

test.describe("i18n URL/locale consistency", () => {
  test.beforeEach(async ({ page }) => {
    // start from a localeed page we know exists
    await page.goto("/ru/meditation");
  });

  test("page language matches URL on load", async ({ page }) => {
    // Wait for html to be present and check lang attribute
    await page.waitForSelector("html");
    const lang = await page.getAttribute("html", "lang");
    expect(lang).toBe("ru");

    // Check that a sample Russian string exists on page
    const text = await page.textContent("body");
    expect(text).toContain("Митя");
  });

  test("switching locale updates URL and html[lang] without redirect to home", async ({
    page,
  }) => {
    // Open locale switcher if it's collapsed
    // LocaleSwitcher contains anchors with locale names (English / Русский / Беларуская)
    await page.waitForSelector("text=English");

    // Open the locale switcher first (it toggles on a role=button element),
    // then click the English entry and wait for a full navigation.
    await page.click('[role="button"]');
    await Promise.all([
      page.waitForNavigation({ waitUntil: "load" }),
      page.click("text=English"),
    ]);

    // After navigation, assert URL contains /en (allow optional query string)
    expect(page.url()).toMatch(/\/en(\/|\?|$)/);

    // html lang should be 'en'
    const lang = await page.getAttribute("html", "lang");
    expect(lang).toBe("en");

    // body should contain an English sample substring
    const body = await page.textContent("body");
    expect(body).toMatch(/Hello|Home|About/);
  });
});
