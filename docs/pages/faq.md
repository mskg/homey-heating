---
layout: page
title:  FAQ
---

This is a collection of things that have been asked. 

## How will the app realize whether I am on holiday or not? Where to define? Maybe I missed it but I can‘t see a holiday mode in Homey
A plan is the normal schedule, but than what happens if I'm at home unplanned? I leave home unplanned? I go to sleep earlier? We're on holiday for a couple of days?

How to configure these things? Make plans for all of them? I thought that's too much work. In my usecase, that just means I put everything to cool-down, or to a comfortable coazy temperature.

I called these setpoints exceptions, and the events `mode` for the heating scheduler. The *modes* than can be set either
- using Flow: The action is called `Set heating mode`
- or using the settings page: Drop-down on `Overview` | `Change heating mode`

No automation here, as this can all be done easily with Flow and better as anything I might have thought about. 

The modes **One day at home**, **One day away from home**, and **Sleeping** are reset every day at 00:00 to `Automatic`.
The other modes (**On holiday**, **Out of season (it's summer)**) stay until you set the scheduler back to any other mode.
