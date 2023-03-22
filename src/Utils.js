/**
 * WhaamIt! Slide Art - Google Slides add-on - AI-powered backgrounds for captivating presentations
 * Copyright (C) 2023. All rights reserved to Asaf Prihadash, TailorVJ.com
 * License: GNU AGPL v3
 */


/**
 * A function to test the success and failure handling in the sidebar.
 * Returns a random success or failure state.
 */
function testFunction(text) {
  var random = Math.random();
  Logger.log("textFunction " + random);
  if (random < 0.5) {
    return true;
  } else {
    throw new Error("An error occurred while processing the request.");
  }
}


/**
 * Returns a Drive image URL for loading in a HTML img tag
 *
 * @param {string} imageName - The name of the image to retrieve from Drive
 * @returns {string | null} - The URL of the image or null if not found
 */
function getImageUrl(imageName) {
  var folderName = 'MyImageFolder';
  var files = DriveApp.getFoldersByName(folderName).next().getFilesByName(imageName);
  if (files.hasNext()) {
    var file = files.next();
    return file.getDownloadUrl().replace('export=download', 'export=media');
  }
  return null;
}


/**
 * Returns an object containing the URLs of two images from Drive.
 * 
 * @returns {object} - An object containing two image URLs, with keys 'image1' and 'image2'
 */
function getImageUrls() {
  var imageUrls = {};
  var file1 = DriveApp.getFileById('FILE_ID_1');
  var file2 = DriveApp.getFileById('FILE_ID_2');
  
  imageUrls['image1'] = file1.getDownloadUrl().replace('export=download', 'export=media');
  imageUrls['image2'] = file2.getDownloadUrl().replace('export=download', 'export=media');
  
  return imageUrls;
}