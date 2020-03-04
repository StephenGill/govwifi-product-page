function submitCookiePreferences(e) {
  e.preventDefault();

  const data = new FormData(this);

  for (let category of data.keys()) {
    GovWifi.cookies.allowCategory(category, data.get(category) === "on");
  }
}

function initialCookiePreferences() {
  if (!GovWifi.cookies.cookiePreferencesDefined()) return;

  const policy = GovWifi.cookies.getCookiePreferences();

  Object.keys(policy).forEach(category => {
    const value = policy[category] ? "on" : "off";
    const id = `cookies-${category}-${value}`;
    const el = document.getElementById(id);

    if (el) el.checked = true;
  });
}

document.addEventListener("DOMContentLoaded", function() {
  GOVUKFrontend.initAll();

  GovWifi.cookies.checkCookiePolicy("cookie-banner");

  document
    .getElementById("cookie-settings")
    .addEventListener("submit", submitCookiePreferences);

  initialCookiePreferences();
});
