# Meteorite Landing Data

## Overview

This app was created for the Chingu Voyage 9 pre-work. It pulls data from the
[Nasa Open Data Portal Meteorite Landings API](https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh)

#### LIVE LINK : https://chingu-meteor-data.netlify.com/

## Features

- The data is sorted and displayed into a chart, the chart is scrollable in
  multiple directions to see all the data.

- Clicking on the Geolocation coordinates launches Google Maps to display the
  geolocation.

- The chart is filterable by name based on the current data set (initial load
  pulls in first 1000 entries).

- All 45,000 + entries can be queried by name with the "Dig Deep!" search
  feature.

- The Filter feature will further filter through search results if the "Dig
  Deep!" search is active.

- Filter and "Dig Deep!" search are case-insensitive.

- Chart is paginated into 50 results at a time, and the previous / next buttons
  are active only when there are enough entries to use them

- The "Current Dataset" total at bottom is the total number of entries based on
  the Filter and "Dig Deep!" results. This defaults to the initial 1000 entries
  pulled on page load.

## Tech Used / Dependencies

- This is a React App boostrapped with CRA

- Add-on packages include: <br>

  1. [Husky](https://www.npmjs.com/package/husky)
  2. [Lint-Staged](https://www.npmjs.com/package/lint-staged)
  3. [Escape-String-RegExp](https://www.npmjs.com/package/escape-string-regexp)
  4. [Prettier](https://www.npmjs.com/package/prettier)

- Color inspiration from: [Palettab](https://palettab.com/)

- Fonts from [Google Fonts](https://fonts.google.com/)

- Icons from [Font Awesome](https://fontawesome.com/)
