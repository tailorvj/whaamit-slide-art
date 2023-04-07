# Development - WhaamIt! Slide Art

This script is designed to work with Google Slides and OpenAI's APIs, specifically DALL-E and GPT-3.5-turbo. The primary function of the code is to generate a background image based on the text and theme of the current slide in a Google Slides presentation.

The main functions of the code are as follows:

1. `showSidebar()`: Displays a sidebar in Google Slides for generating background images.
2. `getAllTextOnSlide(slide)`: Extracts all text from a given slide.
3. `countWords(str)`: Counts the number of words in a string.
4. `cleanString(text)`: Cleans a string by removing unwanted characters and trimming whitespace.
5. `getContent(jsonObj)`: Extracts the "content" value from a JSON object.
6. `getSummaryFromChatGPT(slideText)`: Generates a summary of the provided text using the OpenAI GPT-3 model.
7. `getHexValuesArray(themeColors)`: Returns an array of hex color values from an array of ThemeColorTypes.
8. `getThemeColors()`: Returns a string of space-separated hex color values from the active presentation's theme colors.
9. `setStyle(artStyleSelection)`: Sets the art style for generating the background image.
10. `generateAnalogousBackgroundImage(text, theme, artStyle)`: Generates an analogous background image for the current slide using OpenAI's Dall-E model.
11. `addBackgroundShape(theme)`: Adds a semi-transparent rectangle to the current slide, behind all other elements in the slide.

When the script is executed, it generates a background image based on the text and theme of the current slide, and sets it as the slide's background. The code also includes functions to interact with OpenAI's APIs, parse the response, and apply the generated image as the slide's background.

## Actual development

### Fork and clone this repo

Use the fork button on Github to fork it to your own profile.

Clone from your profile into your workspace. Replace tailorvj below with your user id.

```bash
$ git clone git@github.com:tailorvj/whaamit-slide-art.git
```

### Clasp

Clasp is Google's CLI for AppsScript development

* [Official Clasp tutorial document](https://github.com/google/clasp)
* [Official Clasp codelab](https://codelabs.developers.google.com/codelabs/clasp/) - highly recommended
* [Clasp Github repo with full command documentation](https://github.com/google/clasp)

#### Install Clasp

If it's not already installed, install Clasp on your machine

```bash
$ sudo npm install -g @google/clasp
$ clasp login
```

#### Create clasp project

```
$ cd src
$ clasp create
```

**IMPORTANT**: This will create a .claps.json file in the ./src folder. You may have to copy this file to the root folder as well in order for all clasp commands to work. Please pay attention where you are running clasp commands from though (the root or ./src folder)

Push your local code to the Google Apps Script server

```bash
$ clasp push
```

You may be asked to overwrite the appsscript.json for the project. Respond with y (yes).

Now open  your online AppsScript editor and make sure all of the files from the ./src folder are there

```bash
$ clasp open
```

The above command will open the current project in the online AppsScript editor. This is useful for Test Deployments

Just make sure you rename the project from Src to something more meaningful (Like WhaamIt! Development or something like that)

## Test Deployment

Now that your project is set up, it is time to test the add-on on a Slides presentation

### You need a Slides Presentation

1. [Create a new Slides presentation](https://slides.new), or open an existing presenation and remember its name
2. Add some text to your new presentation for testing purposes
3. Name your presentation, to make it easy to identify in your tests. Close the presentation tab

### Create a Test Deployment
1. Get back to the AppsScript editor and press the arrow on the "Deploy" button
2. Create a new Test deployment for an Editor add-on
3. Select the presentation you created earlier as the target for your tests
4. Save your test
5. Select it from the list and Execute it
6. The presentation should open for the test with the "Whaatever you named it" menu under the "extensions" menu
7. Open the menu and select 'set API key' from the menu. 
8. Set your OpenAI API key and orgId (links can be found in the dialog). Save
9. Open the "Generate Backgrounds" sidebar and press the "Generate" button. You should see a "Generating..." message under the button and after some time, the slide background will become an AI-generated image.
10. Try the various sidebar parameters

The add-on works!

## Your turn

Now you can commit your changes and make changes to the project.

A couple of **IMPORTANT** notes:

1. Git and Clasp are unrelated to each other. You have to "clasp push" and "git commit" separately.
2. Don't edit your code in the online AppsScript editor, but if you do, make sure to clasp pull before you start editing your code locally. Otherwise, you will overwrite your local changes with the online version. Just make sure you don't edit the same files in both places at the same time.
3. Again, you should ideally only edit files locally. **Don't edit code in the online editor.**

From now on, every time you would like to test new code modifications, all you have to do is

```bash
$ clasp push
$ clasp open
```

and Deploy > Deployment test > Select presentation > Execute

## Pull requests

In order to share your new ideas on the main "WhaamIt!" project, make a pull request. Tailor VJ will review your code request and will integrate it into the main add-on, which will be published with the next version on the Workspace add-on store

Please document your code well (ChatGPT and copilot are your friends)

I appreciate you for taking the time to read this document

Kind regards,
Tailor VJ

## For publishing purposes only (disregard of you are contributing code) - Save versions and deployments with Clasp

### Create a versioned archive

Example:

```bash
$ clasp version "Version 1 first working MVP"
```

* version `<text>` - represents the text you use when retrieving that versioned archive. Keep it short but informative.

### Create a versioned deployment:

Example:

```bash
$ clasp deploy -V 1 -d "Version 1 deployment sent to review"
```

* -V `<number>` - represents the version number
* -d `<title>` - represents the name as seen in the Deployments UI


## LICENSE and COPYRIGHT

All files in this project are subject to the same license

WhaamIt! Slide Art - Google Slides add-on - AI-powered backgrounds for captivating presentations

Copyright (C) 2023. All rights reserved to Asaf Prihadash, TailorVJ.com

License: [GNU AGPL v3](LICENSE)
