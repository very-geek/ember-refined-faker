export function extractApplicationConfig() {
  return self.window && self.window.requirejs && self.window.requirejs(
    Object.keys(self.window.requirejs.entries)
      .filter(entry => entry.match(/\/config\/environment/))[0]
  ).default.faker
}

export const defaultLocale = extractApplicationConfig().defaultLocale

export let localeHasBeenChanged = false

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
