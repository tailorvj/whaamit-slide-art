/**
 * WhaamIt! Slide Art - Google Slides add-on - AI-powered backgrounds for captivating presentations
 * Copyright (C) 2023. All rights reserved to Asaf Prihadash, TailorVJ.com
 * License: GNU AGPL v3
 */

/**
 * Runs once when the add-on is installed.
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Adds custom menu items to the Slides add-on menu.
 */
function onOpen() {
  var ui = SlidesApp.getUi();
  ui.createAddonMenu()
    .addItem("Generate Backgrounds", "showSidebar")
    .addItem("Set API Key", "showApiKeyDialog")
    .addToUi();
}


/**
 * Shows the sidebar for generating background images.
 */
function showSidebar() {
  Logger.log("showing sidebar");
  var template = HtmlService.createTemplateFromFile("Sidebar");
  var html = template.evaluate().setTitle("Generate Backgrounds").setWidth(300);
  SlidesApp.getUi().showSidebar(html);
}


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