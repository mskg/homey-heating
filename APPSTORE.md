# Homey heating scheduler for Athom Homey

Easily control the temperature of your thermostats.

## How does this work and what can it do on Homey?

This app controls the target temperature if your thermostats based on (many) *heating plans*. A heating plan is list of set points. At each set point, the associated target temperature is applied to a list devices.

A heating plan can be associated with either zones or devices. If a heating plan is associated with a zone, the heating plan is associated with all themorstats inside that zone. Child zones are not evaluated (yet).

## Example

For example, assume a heating plan for your living room with the following setup

* Monday ... Friday
  * 15:00, 18.5°
  * 18:00, 20.5°
  * 23:00, 16.0°  
* Saturday, Sunday
  * 09:00, 20.5°
  * 23:30, 16.0°

At each of the listed times, the target temperature is set to the given value. From Monday to Friday, you warmup the the living room starting 15:00. On weekends, the temperature is kept high all the time beginning 09:00.

## What happens on holidays? ... when I'm not at home?

The heating plans support exceptions for the following events:

* One day at home
* One day not at home
* Sleeping
* Holiday

For each plan, you can define exceptional temperatures that are applied to all thermostats associated with your plan. When you define an exceptional temperature, and the event is active, the plan's schedules are paused.

The events *One day at home*, *One day not at home*, and *Sleeping* are reset every night at 00:00 and the normal *Automatic* schedule applies. The event *Holiday* is not automatically canceled and has to be reset manually using *Flows*.

## Live cylce

If the holiday "thing" is not your style, you can automate it yourself. Plans can be enabled and disabled manually or via *Flow*. If a heating plan is disabled, it is not applied.

## Flow activity cards

The follwing activity cards are provided

* Apply all active heating plans
* Apply a specific heating plan, even when it is not activated
* Set heating mode, see above
* Enable/disable a specific plan

## Supported languages

* English

## Feedback

Please report issues at the [issues section on GitHub](https://github.com/mskg/homey-heating/issues) or contact me on [Slack](https://athomcommunity.slack.com/team/mskg).