# Translation Pattern Macro
Welcome to our WXSD DEMO Repo! <!-- Keep this here --> 

This Webex Devices macro lets you easily create locally managed translations patterns which change any dialled destination into another.

Add as many Regex based patterns as you want, with the option to redirect, append, prefix or ignore dialled numbers.

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


<!-- Keep the following here -->  
 *_Everything included is for demo and Proof of Concept purposes only. Your use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for. These demos are for Cisco Webex usecases, but are not Official Cisco Webex Branded demos._


## Requirements

1. RoomOS/CE 9.15.x or above Webex Device.
2. Web admin access to the device to uplaod the macro.

## Setup

1. Download the ``translation-pattern.js`` file and upload it to your Webex Room device via Macro editor available on its web interface.
2. Configure the Macro by changing the config values at the beginning, there are comments explaining each one.
3. Enable the Macro on the editor.

## Validation

Validated Hardware:

* Desk Pro
* Roomkit Pro


## Support

Please reach out to the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=translation-pattern-macro)
