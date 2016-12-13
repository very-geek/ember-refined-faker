export function extractApplicationConfig() {
  return window.requirejs(
    Object.keys(window.requirejs.entries)
      .filter(entry => entry.match(/\/config\/environment/))[0]
  ).default.faker
}

export const defaultLocale = extractApplicationConfig().defaultLocale

export function changeLocale(faker, locale) {
  if (!localeHasBeenChanged) {
    // change locale first time
    faker.locale = locale
    localeHasBeenChanged = true
  } else if (locale && locale !== defaultLocale) {
    // change locale again without change tracking flag
    faker.locale = locale
  } else {
    // reset locale to default value
    faker.locale = defaultLocale
    localeHasBeenChanged = false
  }
}

export let localeHasBeenChanged = false
