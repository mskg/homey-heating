# Homey heating scheduler for Athom Homey

Easily control the temperature of your thermostats.

## How does this work and what can it do on Homey?

This app controls the target temperature if your thermostats based on (many) *heating plans*. A heating plan is list of set points. At each set point, the associated target temperature is applied to a list devices.

A heating plan can be associated with either zones or devices. If a heating plan is associated with a zone, the heating plan is associated with all themorstats inside that zone. Child zones are not evaluated (yet).

You can find more details, a short manual, as well as release notes online [https://homey-heating.mskg.app](https://homey-heating.mskg.app).

## Features
* *Mobile friendly* Configuration page allows easy editing. Plans and setpoints can be copied, configuration can be ex-/imported, overview of current set temperatures, ...
* *Full flexibility* Heating plans can be associated with zones or devices, in any combination.
* *Different szenarios for the same thermostats?* Heating plans can be enabled and disabled, which allows flexible szenarios triggered by flow (see below).
* *Not at home?* Homey heating scheduler supports different modes and associated exceptions: Automatic, One day at home, One day away, Sleeping, On holiday.
* *Flow integration* Set mode, enable/disable plan, apply plan, etc.
* *Optimal resouce management* Your Homey is only utilized when there is something to do: No permanent polling or reading of temperatures in the background. The app only wakes up on setpoints.

Not what you expect? Than it's probably not what I do at home. Feel free to add a feature request on [GitHub](https://github.com/mskg/homey-heating/issues).

## Supported languages

* English
* Dutch

## Feedback

Anything doesn't work? Please report issues at the [issues section on GitHub](https://github.com/mskg/homey-heating/issues) or contact me on [Slack](https://athomcommunity.slack.com/team/mskg).
