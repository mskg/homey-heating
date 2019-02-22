---
layout: page
title:  Virtual Thermostat
---

Image it's a cold winter day and you need to raise the temperature of your living room. Of course, you don't want to change your normal plan and your *at home mode* doesn't fit - you want it warmer/colder, now!

For this, there is *Virtual Thermostats*. Each of your plans can be added as a virtual thermostat device to Homey. So how does it work then?

1. Open up the virtual thermostat
1. Raise it to the temperature you feel comfortable with
1. The *Heating scheduler* adjusts all devices associated with that plan

The *Heating scheduler* remembers you choice until end of the day, your normal schedules apply again afterwards.

You want to switch from your set temperature back to your normal schedule? Just flip the *mode* on the same device back to `Heating plan (automatic)` and you're again done. If you want to keep your setting forever (ignore the plan), set the mode to `Fully manual`.
<screenshots>
    <screenshot>
        <img src="/assets/screens/virtual-temperature.png" />
        <div>Virtual Thermostat</div>
    </screenshot>

    <screenshot>
        <img src="/assets/screens/virtual-mode.png" />
        <div>Virtual Thermostat Modes</div>
    </screenshot>
</screenshots>

### Some technical details

The virtual device comes with the following capabilities
- `target_temperature` Sets that value for all devices associated with the plan
- `measured_temperature` Shows the mean value of all temperature readings from all devices related to the plan
- `thermostat_override` This allows to define what happens when the target temperature is changed, independent of the plan's schedule.
  - *Heating plan (automatic)* - Target temperature is adjusted according with the plan
  - *Manual until midnight* - Target temperature is kept until midnight
  - *Fully manual* - Plan get's disabled. You still control al devices with that thermostat.

All of the capabilities can be changed/watched with Flow.

## Installation
That's five easy steps
1. Click *Devices* and the *Add* icon top-right
1. Select the *Homey Heating Scheduler* driver
1. Select the *Virtual Thermostat* device
1. Select the plans you want to add
1. Confirm the installation of your're devices

You're eady to go.

<screenshots>
    <screenshot>
        <img src="/assets/screens/driver.png" />
        <div>Homey Heating Scheduler driver</div>
    </screenshot>

    <screenshot>
        <img src="/assets/screens/device.png" />
        <div>Select virtual thermostat</div>
    </screenshot>

    <screenshot>
        <img src="/assets/screens/select.png" />
        <div>Select the plans you want to add</div>
    </screenshot>

    <screenshot>
        <img src="/assets/screens/install.png" />
        <div>Confirm the installation</div>
    </screenshot>

      <screenshot>
        <img src="/assets/screens/screen.png" />
        <div>Your device is ready</div>
    </screenshot>
</screenshots>
