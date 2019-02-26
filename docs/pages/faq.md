---
layout: page
title:  FAQ
---

This is a collection of things that have been asked. 

## Maybe I am blind but I can’t find the way how to create the mentioned virtual device
This device is only available since version 1.2.0.

## How will the app realize whether I am on holiday or not? Where to define? Maybe I missed it but I can‘t see a holiday mode in Homey
A plan is the normal schedule, but than what happens if I'm at home unplanned? I leave home unplanned? I go to sleep earlier? We're on holiday for a couple of days?

How to configure these things? Make plans for all of them? I thought that's too much work. In my usecase, that just means I put everything to cool-down, or to a comfortable coazy temperature.

I called these setpoints exceptions, and the events `mode` for the heating scheduler. The *modes* than can be set either
- using Flow: The action is called `Set heating mode`
- or using the settings page: Drop-down on `Overview` | `Change heating mode`

No automation here, as this can all be done easily with Flow and better as anything I might have thought about. 

The modes **One day at home**, **One day away from home**, and **Sleeping** are reset every day at 00:00 to `Automatic`.
The other modes (**On holiday**, **Out of season (it's summer)**) stay until you set the scheduler back to any other mode.

## To many alerts/notifications when using multiple heating plans
In the settings page, you can toggle notifications for 
* mode change
* temperature set
* temperature set error

## I have window and door sensors and it would be great to add those ones as exception devices
I understand that request and I will put it on the list #69. In the meanwhile, you could try the following:
- Add your heating plans as [virtual thermostat](./device)
- Add a flow that triggers on open/close of any of the room’s windows/doors. You could do that easily with `<groups>` if there are many of them in the same zone
- On open, set temperature of associated heating plan device to, e.g. 6°
- When the switch is closed, reset the thermostat_override to automatic and you’re done.
