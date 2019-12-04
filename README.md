# [Heating scheduler for Athom Homey](https://homey-heating.mskg.app) &middot; [![Build Status](https://travis-ci.com/mskg/homey-heating.svg?branch=master)](https://travis-ci.com/mskg/homey-heating) [![Coverage Status](https://coveralls.io/repos/github/mskg/homey-heating/badge.svg?branch=master)](https://coveralls.io/github/mskg/homey-heating?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/mskg/homey-heating.svg)](https://greenkeeper.io/)

Easily control the temperature of your thermostats.

## Known Issues
See [Issue Tracker](https://github.com/mskg/homey-heating/issues)

## Supported Languages

* English
* Dutch
* Deutsch

## Notes
* Build
  * `npm run homey:run` to run the dev build of the App on your homey.
    * This exposes the API public but does not change thermostat values.
    * Schedules are not read from configuration and are not persisted. You always start with clean values.
  * `npm run start:web` to run the settings app localy. Don't forget to set your Homey url below.
  * `npm run homey:install` to drop a production build onto your Homey.

* Change environment variable HOMEY_DEV_URL to point to your Homey's url, e.g. http://192.168.0.1
* Change environment variable HOMEY_LANG to view the web in either `en` or `nl`

* If you enable remote logging inside the app, you can watch the live trace of the application via [console.re/yourcategory](console.re)

* There is a script `scripts\translate.js` to translate new values from `en` to `nl`. The tool does not touch existing translations in the `app.json`, or `nl.json`.

* Install a *released build onto your Homey* `npm run release:install <tag>`. If you omit the tag, all available version will be printed.

## Change Log
* **1.0** Initial release
* **1.1.1** [Release notes](docs/releasenotes/v01-01.md)
* **1.1.2** [Release notes](docs/releasenotes/v01-01-02.md)
* **1.2.0** [Release notes](docs/releasenotes/v01-02-00.md)
* **1.2.1** [Release notes](docs/releasenotes/v01-02-01.md)
* **1.2.2** [Release notes](docs/releasenotes/v01-02-02.md)

## Feedback

Please report issues at the [issues section on GitHub](https://github.com/mskg/homey-heating/issues) or contact me on [Slack](https://athomcommunity.slack.com/team/mskg).
