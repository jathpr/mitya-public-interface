/* Smoke i18n tests
 * Fetch a set of pages with different Accept-Language headers and assert
 * html lang attribute matches the URL locale and that a few keys from
 * messages are present in the returned HTML.
 */

const routes = ["/be", "/en", "/ru", "/be/about", "/en/about", "/ru/about"];

const headersToTest = [
  { name: "no-header", headers: {} },
  { name: "ru", headers: { "Accept-Language": "ru" } },
  { name: "en", headers: { "Accept-Language": "en" } },
  { name: "be", headers: { "Accept-Language": "be" } },
];

const expectedSamples = {
  be: ["Галоўная", "Пра мяне", "Будзь"],
  en: ["Home", "About", "Be"],
  ru: ["Главная", "Обо мне", "Будь"],
};

async function fetchHtml(path, headers) {
  const url = `http://localhost:3000${path}`;
  const res = await fetch(url, { headers, redirect: "manual" });
  if (!res.ok && res.status !== 200) {
    return { error: `status=${res.status}` };
  }
  const text = await res.text();
  return { text };
}

(async function main() {
  console.log("Running smoke i18n tests...");
  let failures = 0;
  for (const r of routes) {
    for (const h of headersToTest) {
      const { text, error } = await fetchHtml(r, h.headers);
      const label = `${r} / ${h.name}`;
      if (error) {
        console.error(label, "ERROR", error);
        failures++;
        continue;
      }
      const langFromUrl = r.split("/")[1] || "be";
      const hasLangAttr = new RegExp(
        `<html[^>]*lang="${langFromUrl}"`,
        "i"
      ).test(text);
      const hasSamples = expectedSamples[langFromUrl].some((s) =>
        text.includes(s)
      );

      if (!hasLangAttr) {
        console.error(
          label,
          "FAIL: html lang mismatch (expected",
          langFromUrl + ")"
        );
        failures++;
      }
      if (!hasSamples) {
        console.error(label, "FAIL: sample strings not found for", langFromUrl);
        failures++;
      }
      if (hasLangAttr && hasSamples) {
        console.log(label, "OK");
      }
    }
  }
  if (failures === 0) {
    console.log("All smoke tests passed");
    process.exit(0);
  } else {
    console.error("Smoke tests failed:", failures);
    process.exit(2);
  }
})();
