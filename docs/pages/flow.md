---
layout: page
title:  What happens on holidays? ... when I'm not at home?
---

The heating plans support exceptions for the followin event:

* One day at home
* One day not at home
* Sleeping
* Holiday
* Out of season

Beside the normal schedule, you can define exceptional temperatures that for each plan. When you define an exceptional temperature, and the mode is active, the plan's schedules are paused.

The events *One day at home*, *One day not at home*, and *Sleeping* are reset every night at 00:00 and the normal *Automatic* schedule applies.

The events *Holiday* and *Out of season* are not automatically canceled and have to be reset manually using *Flow* and/or the settings area.

## I want more control

If the holiday "thing" is not your style, you can automate it yourself. Plans can be enabled and disabled manually or via *Flow*. If a heating plan is disabled, it is not applied.

### Flow activity cards

The follwing activity cards are provided

* *Apply all active heating plans* - You played with the temperatures and want all thermostats to be set again. That's the action.
* A*pply a specific heating plan*, even when it is not activated.
* *Set heating mode*, see above
* *Enable/disable* a specific plan

### Flow triggers

The following triggers are provided

* *Heating mode* changes
* *Thermostat mode* changes
* Thermostat *temperature* or *target temperature* changes

<!--
### How to implement open window detection with the virtual device? #29
- Add a flow that triggers on `open` of any of the room's windows
- On `open`, set temperature of associated heating plan to, e.g. 6°
- When the switch is `closed`, reset the `thermostat_override` to automatic and you're done.
-->