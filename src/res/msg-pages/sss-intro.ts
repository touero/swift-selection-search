/*

Boot script for the intro page shown after installation. Defines the
translation language and applies it to the page text.

*/

chrome.storage.local.get(["language"], items => {
	const language = typeof items.language === "string" ? items.language : undefined;
	SSS_I18N.setLanguage(language);
	SSS_I18N.applyTranslations(document);
});
