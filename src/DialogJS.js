/**
 * WhaamIt! Slide Art - Google Slides add-on - AI-powered backgrounds for captivating presentations
 * Copyright (C) 2023. All rights reserved to Asaf Prihadash, TailorVJ.com
 * License: GNU AGPL v3
 */

/**
 * Shows the OpenAI API key dialog box.
 */
function showApiKeyDialog() {
  var template = HtmlService.createTemplateFromFile("Dialog");
  var apiKey = getApiKey();
  var orgId = getOrgId();
  template.apiKey = apiKey;
  template.orgId = orgId;
  var html = template.evaluate().setWidth(300).setHeight(250);
  SlidesApp.getUi().showModalDialog(html, "OpenAI API Key");
}

/**
 * Validates an OpenAI API key.
 * 
 * @param {string} apiKey - The API key to validate.
 * @returns {boolean} - Whether the API key is valid or not.
 */
function validateApiKey(apiKey) {
  return /^sk-[a-zA-Z0-9]{48}$/i.test(apiKey);
  // return true;
}

/**
 * Validates an OpenAI organization ID.
 * 
 * @param {string} orgId - The organization ID to validate.
 * @returns {boolean} - Whether the organization ID is valid or not.
 */
function validateOrgId(orgId) {
  return /^org-[a-zA-Z0-9]{24}$/.test(orgId);
  // return true;
}


/**
 * Saves a setting to the user properties.
 *
 * @param {string} key - The key of the setting.
 * @param {string} value - The value of the setting.
 */
function saveSetting(key, value) {
  var properties = PropertiesService.getUserProperties();
  properties.setProperty(key, value);
}

/**
 * Gets a setting from the user properties.
 *
 * @param {string} key - The key of the setting.
 * @returns {string} - The value of the setting, or an empty string if not found.
 */
function getSetting(key) {
  var properties = PropertiesService.getUserProperties();
  return properties.getProperty(key) || "";
}

/**
 * Clears a setting from the user properties.
 *
 * @param {string} key - The key of the setting.
 */
function clearSetting(key) {
  var properties = PropertiesService.getUserProperties();
  properties.deleteProperty(key);
}

/**
 * Saves the OpenAI API key and organization ID in user properties.
 * 
 * @param {string} apiKey - The OpenAI API key to save.
 * @param {string} orgId - The OpenAI organization ID to save.
 * @throws {Error} If the API key or organization ID is invalid.
 */
function saveSettings(apiKey, orgId) {
  if (validateApiKey(apiKey) && validateOrgId(orgId)) {
    saveSetting("OpenAI_API_Key", apiKey);
    saveSetting("OpenAI_Org_ID", orgId);
    return "Settings saved.";
  } else {
    throw new Error("Invalid API key or organization ID.");
  }
}


/**
 * Returns the OpenAI API key and organization ID saved in user properties.
 * 
 * @returns {{apiKey: string, orgId: string}} The OpenAI API key and organization ID saved in user properties.
 */
function getSettings() {
  return {
    apiKey: getSetting("OpenAI_API_Key") || "",
    orgId: getSetting("OpenAI_Org_ID") || "",
  };
}

/**
 * Clears the OpenAI API key and organization ID saved in user properties.
 */
function clearSettings() {
  clearSetting("OpenAI_API_Key");
  clearSetting("OpenAI_Org_ID");
}


/**
 * Saves the OpenAI API key in user properties.
 * 
 * @param {string} apiKey The OpenAI API key to save.
 * @throws {Error} If the API key is invalid.
 */
function saveApiKey(apiKey) {
  if (validateApiKey(apiKey)) {
    saveSetting("OpenAI_API_Key", apiKey);
  } else {
    throw new Error("Invalid API key.");
  }
}

/**
 * Returns the OpenAI API key saved in user properties.
 * 
 * @returns {string} The OpenAI API key saved in user properties.
 */
function getApiKey() {
  return getSetting("OpenAI_API_Key") || "";
}

/**
 * Clears the OpenAI API key saved in user properties.
 */
function clearApiKey() {
  clearSetting("OpenAI_API_Key");
}

/**
 * Saves the OpenAI organization ID in user properties.
 * 
 * @param {string} orgId The OpenAI organization ID to save.
 * @throws {Error} If the organization ID is invalid.
 */
function saveOrgId(orgId) {
  if (validateOrgId(orgId)) {
    saveSetting("OpenAI_Org_ID", orgId);
  } else {
    throw new Error("Invalid organization ID.");
  }
}

/**
 * Returns the OpenAI organization ID saved in user properties.
 * 
 * @returns {string} The OpenAI organization ID saved in user properties.
 */
function getOrgId() {
  return getSetting("OpenAI_Org_ID") || "";
}

/**
 * Clears the OpenAI organization ID saved in user properties.
 */
function clearOrgId() {
  clearSetting("OpenAI_Org_ID");
}
