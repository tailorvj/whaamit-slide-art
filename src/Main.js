/**
 * WhaamIt! Slide Art - Google Slides add-on - AI-powered backgrounds for captivating presentations
 * Copyright (C) 2023. All rights reserved to Asaf Prihadash, TailorVJ.com
 * License: GNU AGPL v3
 */

/**
 * Runs once when the add-on is installed.
 */
function onInstall() {
  showApiKeyDialog();
  showSidebar();
}

/**
 * Adds custom menu items to the Slides add-on menu.
 */
function onOpen() {
  const MY_CUSTOM_ICON = "https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEOSe6rjs2PS7CMxMlQAcgO5QtdVGCxHxW-bmstQNb8JsenvBVZqzzGd0PSN0_RzZ4Y4PfoMJwIIswnSWBODVeH6B6_TEFA=w1920-h952";
  var ui = SlidesApp.getUi();
  ui.createAddonMenu()
    .addItem("Generate Backgrounds", "showSidebar")
    .addItem("Set API Key", "showApiKeyDialog")
    .addToUi();
}