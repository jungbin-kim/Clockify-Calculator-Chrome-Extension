# Clockify Calculator Chrome Extension

[Clockify](https://clockify.me/) is the time tracking software. This chrome extension application merges with same tasks on Clockify's `Time Tracker` page.

## Build

```sh
# Build dev mode
$ npm run build-dev
# Build dev mode then Open BundleAnalyzer
$ npm run build-dev:analyzer
# Build production mode
$ npm run build
# Build production mode then Open BundleAnalyzer
$ npm run build:analyzer
```

## Usage

1. Download [Releases](https://github.com/jungbin-kim/Clockify-Calculator-Chrome-Extension/releases) zip file and unpack.
1. Open the Extension Management page by navigating to chrome://extensions.
   - The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then selecting Extensions.
1. Enable Developer Mode by clicking the toggle switch next to Developer mode.
1. Click the LOAD UNPACKED button and select the extension directory.
   ![Image of load extension](https://developer.chrome.com/static/images/get_started/load_extension.png)
1. Go [Clockify tracker page](https://clockify.me/tracker) and Click chrome extension app

Reference: [Chrome extension developer guide](https://developer.chrome.com/extensions/getstarted)
