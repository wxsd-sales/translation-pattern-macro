# Translation Pattern Macro

This Webex Device macro lets you easily create locally managed translations patterns which can be use to re-direct a dialled number to another destination.

## Overview

Using macros, we are able to monitor when an outbound call has been placed. With this information, we can inspected the dialled number and match it against our own regular expression rules. In the example config below, we have an array of regular expressions which redirect, append, prefix or ignore dialled numbers.

```js
const patterns = [
  { regex: '^([1][2][3])$', action: 'redirect', number: 'example@webex.com' },  // Matches 123 -> redirects to example@webex.com
  { regex: '123@connect\.example\.com', action: 'redirect', number: 'example@webex.com' },  // Matches 123@connect.example.com -> redirects to example@webex.com
  { regex: '^([7][8][9])$', action: 'redirect', number: 'example@webex.com' },  // Matches 789 -> redirects to example@webex.com
  { regex: '^([0-9]{9,12})$', action: 'append', number: '.example@webex.com' }, // Matches 9-12 digits -> <dialled> + '.example@webex.com'
  { regex: '^([0-9]{13})$', action: 'prefix', number: '9' }, // Matches 13 digits -> '9' + <dialled>
  { regex: '^(.*)@(.*)$', action: 'continue' } //Matches *@* URI -> Ignores URIs, allows to continue
]
```

Once a match has been found, the existing called it ended and the number is dialled. In the case where the number is matched with a ``continue`` action, we will just ignore that call and allow it to proceed as normal.


## Requirements

1. RoomOS/CE 9.15.x or above Webex Device.
2. Web admin access to the device to upload the macro.

## Setup

1. Download the ``translation-pattern.js`` file and upload it to your Webex Room device via Macro editor available on its web interface.
2. Configure the Macro by changing the config values at the beginning, there are comments explaining each one.
3. Enable the Macro on the editor.

## Validation

Validated Hardware:

* Desk Pro
* Roomkit Pro

This macro should work on other Webex Devices but has not been validated at this time.

## Demo

*For more demos & PoCs like this, check out our [Webex Labs site](https://collabtoolbox.cisco.com/webex-labs).


## License
All contents are licensed under the MIT license. Please see [license](LICENSE) for details.


## Disclaimer
Everything included is for demo and Proof of Concept purposes only. Use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for. These demos are for Cisco Webex use cases, but are not Official Cisco Webex Branded demos.


## Questions
Please contact the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=translation-pattern-macro) for questions. Or, if you're a Cisco internal employee, reach out to us on the Webex App via our bot (globalexpert@webex.bot). In the "Engagement Type" field, choose the "API/SDK Proof of Concept Integration Development" option to make sure you reach our team. 
