/**
 * WhaamIt! Slide Art - Google Slides add-on - AI-powered backgrounds for captivating presentations
 * Copyright (C) 2023. All rights reserved to Asaf Prihadash, TailorVJ.com
 * License: GNU AGPL v3
 */


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
 * Returns all the text on the slide as a string
 * @param {Slide} slide - The slide to get the text from
 * @return {string} - The text on the slide
 */
function getAllTextOnSlide(slide) {
  var elements = slide.getPageElements();
  Logger.log("getAllTextOnSlide elements.length: " + elements.length);
  var allText = '';
  Logger.log("getAllTextOnSlide allText empty: " + allText);
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    if (element.getPageElementType() == 'SHAPE') {
      var shape = element.asShape();
      var shapeText = shape.getText().asString();
      if (shapeText) {
        allText += shapeText + '\n';
      }
    } else if (element.getPageElementType() == 'TABLE') {
      var table = element.asTable();
      var numRows = table.getNumRows();
      var numCols = table.getNumColumns();
      for (var row = 0; row < numRows; row++) {
        for (var col = 0; col < numCols; col++) {
          var cell = table.getCell(row, col);
          var cellText = cell.getText().asString();
          if (cellText) {
            allText += cellText + '\n';
          }
        }
      }
    } else if (element.getPageElementType() == 'TEXT_BOX') {
      var textBox = element.asShape();
      var textBoxText = textBox.getText().asString();
      if (textBoxText) {
        allText += textBoxText + '\n';
      }
    }
  }
  Logger.log("getAllTextOnSlide allText: " + allText);
  var trimmedText = allText.trim();
  Logger.log("getAllTextOnSlide trimmedText: " + trimmedText);
  if (countWords(trimmedText) < 11){
    Logger.log("getAllTextOnSlide returning trimmedText: " + trimmedText);
    return trimmedText;
  }else {
    var summaryFromChatGPT = getSummaryFromChatGPT(trimmedText);
    Logger.log("getAllTextOnSlide returning summaryFromChatGPT: " + summaryFromChatGPT);
    return summaryFromChatGPT;
  }; 
}



/**
 * Returns the word count of a string
 * @param {string} str - The string to count words in
 * @return {number} - The number of words in the string
 */
function countWords(str) {
  // remove leading/trailing white space
  str = str.trim();

  // if there are no words, return 0
  if (str === "") {
    return 0;
  }

  // split string into words and count the length of the resulting array
  return str.split(/\s+/).length;
}


/**
 * Cleans up a string by removing unwanted characters and trimming whitespace.
 * @param {string} text - The text to be cleaned.
 * @return {string} - The cleaned up text.
 */
function cleanString(text) {
  // Replace non-alphanumeric characters with spaces
  var cleanedText = text.replace(/[^0-9a-z]/gi, ' ');
  // Trim whitespace from the beginning and end of the string
  cleanedText = cleanedText.trim();
  // Replace multiple spaces with a single space
  cleanedText = cleanedText.replace(/\s+/g, ' ');
  return cleanedText;
}



/**
 * Extracts the value of the "content" key as a String from the given JSON object
 * @param {Object} jsonObj - The JSON object to extract the content from
 * @return {string} - The value of the "content" key as a string
 */
function getContent(jsonObj) {
  Logger.log("getContent()");
  var getContentTextValue = jsonObj.choices[0].message.content;
  Logger.log("getContent() getContentTextValue " + getContentTextValue);
  return getContentTextValue;
}


/**
 * Generates a summary of the provided text using the OpenAI GPT-3 model.
 * @param {string} slideText - The text to summarize.
 * @return {string|null} - The generated summary, or null if the API call fails.
 */
function getSummaryFromChatGPT(slideText) {
  var model = "gpt-3.5-turbo";
  endpoint = "v1/chat/completions";

  var cleanText = cleanString(slideText);
  Logger.log("getSummaryFromChatGPT cleanText: " + cleanText);
  var prompt = "Generate a high-quality summary of this text: " + cleanText;
  Logger.log("getSummaryFromChatGPT prompt: " + prompt);

  var apiKey = getSettings().apiKey;
  var orgId = getSettings().orgId;
  var temperature = 0.5;

  const requestBody = {
    "model": model,
    "messages": [{"role": "user", "content": prompt}],
    "temperature": temperature,
  };

  const requestOptions = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+apiKey,
      "OpenAI-Organization": orgId,
    },
    "payload": JSON.stringify(requestBody)
  }

  try {
    const response = UrlFetchApp.fetch("https://api.openai.com/" + endpoint, requestOptions);
    var responseText = response.getContentText();
    Logger.log("getSummaryFromChatGPT responseText: " + responseText);
    var json = JSON.parse(responseText);
    Logger.log("getSummaryFromChatGPT json: " + json);
    var openAITextResponse = getContent(json);
    Logger.log("getSummaryFromChatGPT openAITextResponse: " + openAITextResponse);
    return openAITextResponse;
  } catch (error) {
    Logger.log("Error: " + error);
    return null;
  }
}


/**
 * Returns an array of hex values from an array of ThemeColorTypes
 * @param {Array<ThemeColorType>} themeColors - Array of ThemeColorTypes to get hex values from
 * @return {Array<string>} - Array of hex values
 */
function getHexValuesArray(themeColors) {
  var hexValues = [];
  themeColors.forEach(function(themeColor) {
    hexValues.push(SlidesApp.getActivePresentation().getMasters()[0].getColorScheme().getConcreteColor(themeColor).asRgbColor().asHexString());
  });
  return hexValues;
}


/**
 * Returns a string of space-separated hex color values from the active presentation's theme colors.
 *
 * @return {string} - A string of space-separated hex color values.
 */
function getThemeColors() {
  var myPresentation = SlidesApp.getActivePresentation();
  var themeColors = myPresentation.getMasters()[0].getColorScheme().getThemeColors();
  //extract hex values from Theme Colors
  var hexValuesJoin = getHexValuesArray(themeColors).join(' ');
  Logger.log('hexValuesJoin: ' + hexValuesJoin);
  return hexValuesJoin;
}


// Source for most styles: https://strikingloo.github.io/DALL-E-2-prompt-guide
const styleList = {
  "Steampunk": "A digital steampunk illustration, 4k, detailed, trending in artstation",
  "Fantasy": "A digital illustration, 4k, detailed, trending in artstation, fantasy, organic and bent",
  "Steampunk2": "A digital steampunk illustration in the sky, 4k, detailed, trending in artstation, fantasy",
  "Japanese": "Breath-taking digital painting with vivid colours amazing art mesmerizing, captivating, artstation 3, japanese style",
  "Japanese2": "Breath-taking digital painting with amazing art mesmerizing, captivating, artstation 3, japanese style",
  "Illustration": "A digital illustration, 4k, detailed, trending in artstation, fantasy",
  "LowPoly" : "Low-poly render; high resolution, 4k",
  "AnimeOil": "anime oil painting high resolution cottagecore ghibli inspired 4k",
  "Mesmerize": "Breath-taking digital painting with amazing art mesmerizing, captivating, artstation 3",
  "Pixar3D": "Pixar style 3D render, 4k, high resolution, trending in artstation",
  "Renaissance": "An oil painting from the renaissance, Gorgeous digital painting, amazing art, artstation 3, realistic",
  "Arcade" : "Arcade style, Breath-taking digital painting, 4K, amazing art, fantasy",
  "AbstractPlasma": "abstract plasma slightly blurred"
};


/**
 * Sets the art style for generating the background image
 * @param {string} artStyleSelection - The selected art style
 * @return {string} - The set art style
 */
function setStyle(artStyleSelection) {

  if (!artStyleSelection) {
    return styleList['Japanese'];
  }

  if (artStyleSelection in styleList) {
    return styleList[artStyleSelection];
  }

  return artStyleSelection;
}


/**
 * Generates an analogous background image for the current slide using OpenAI's Dall-E model.
 * @param {string} text - The text to use for generating the image. If not provided, the function will use the text on the current slide.
 * @param {string} theme - The color theme of the presentation. If "light", the image will use lighter shades of the color scheme. If "dark", it will use darker shades.
 * @param {string} artStyle - The style of the background image to generate. If not provided, the function will use the default style from the `styleList` object.
 * @return {void}
 */
function generateAnalogousBackgroundImage(text, theme, artStyle) {
  var text = text;
  var theme = theme;
  Logger.log("theme: " + theme);
  var mainTheme = "light";
  var oppositeTheme = "dark";
  if (theme == "dark"){
    mainTheme = "dark";
    oppositeTheme = "light";
  };
  Logger.log("mainTheme: " + mainTheme + " , oppositeTheme: " + oppositeTheme);

  var artStyle = setStyle(artStyle);
  Logger.log("artStyle: " + artStyle);

  if(countWords(text) > 10){
    text = getSummaryFromChatGPT(text);
  };

  // Gets the current active page that is selected in the active presentation.
  var selection = SlidesApp.getActivePresentation().getSelection();
  var currentPage = selection.getCurrentPage();
  // getAllTextOnSlide gets a response from ChatGPT if longer than 10 words
  var textOnSlide = getAllTextOnSlide(currentPage);
  Logger.log("textOnSlide: " + textOnSlide);

  var slideText = text || textOnSlide || "Alice in Wonderland falling into the rabbit hole";
  var logSlideText = "slideText: " + slideText;
  Logger.log(logSlideText);

  // Get the color theme of the presentation
  var colorTheme = getThemeColors();
  var logColorTheme = "colorTheme: " + colorTheme;
  Logger.log(logColorTheme);

  // Get the OpenAI API key and org identifier
  var apiKey = getSettings().apiKey;
  var logApiKey = "apiKey" + apiKey;
  Logger.log(logApiKey);
  var orgId = getSettings().orgId;
  var logOrgId = "orgId" + orgId;
  Logger.log(logOrgId);

  // Construct the prompt for Dall-e
  var prompt2 = "generate " + artStyle + " " + mainTheme + " background image about " + slideText + ". Use shades of colors that are analogous to " + colorTheme + ", but use mostly the " + mainTheme + "er shades. Never generate text as part of the image";

  Logger.log("Dall-e prompt: " + prompt2);

  temperature= 0
  maxTokens = 2000
  const requestBody2 = {
    "prompt": prompt2,
    "n": 1,
    "size": "1024x1024"
  };
  const requestOptions2 = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+apiKey,
      "OpenAI-Organization": orgId,
    },
    "payload": JSON.stringify(requestBody2)
  };
  const response2 = UrlFetchApp.fetch("https://api.openai.com/v1/images/generations", requestOptions2);
  var responseText = response2.getContentText();
  var json = JSON.parse(responseText);
  var url1=json['data'][0]['url'];
  selection.getCurrentPage().getBackground().setPictureFill(UrlFetchApp.fetch(url1).getBlob());

  addBackgroundShape(theme);
}


/**
 * Adds a semi-transparent rectangle to the current slide, behind all other elements in the slide.
 * The color and transparency of the rectangle depend on the specified theme.
 * @param {string} overlay - The overlay shape color. If "white", the shape will be white with 70% transparency. Otherwise, it will be black with 50% transparency.
 */
function addBackgroundShape(overlay) {
  var presentation = SlidesApp.getActivePresentation();
  var slide = presentation.getSelection().getCurrentPage();
  var existingShapes = slide.getShapes();
  var semitransShape = null;

  // Search for existing shape with 'semitrans' title and delete it
  for (var i = 0; i < existingShapes.length; i++) {
    if (existingShapes[i].getTitle() === 'semitrans') {
      existingShapes[i].remove();
      break;
    }
  }

  // Create the new shape
  var shape = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, 0, 0, presentation.getPageWidth(), presentation.getPageHeight());
  shape.setTitle('semitrans');

  shape.getBorder().setTransparent();

  // Set the fill color and transparency based on the theme
  if (overlay === 'white') {
    shape.getFill().setSolidFill('#ffffff', 0.7);
  } else {
    shape.getFill().setSolidFill('#000000', 0.5);
  }

  // Send the shape to the back
  shape.sendToBack();
}



