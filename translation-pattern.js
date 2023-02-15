/********************************************************
Copyright (c) 2023 Cisco and/or its affiliates.
This software is licensed to you under the terms of the Cisco Sample
Code License, Version 1.1 (the "License"). You may obtain a copy of the
License at https://developer.cisco.com/docs/licenses
All use of the material herein must be in accordance with the terms of
the License. All rights not expressly granted by the License are
reserved. Unless required by applicable law or agreed to separately in
writing, software distributed under the License is distributed on an "AS
IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied.
*********************************************************
 * 
 * Macro Author:      	William Mills
 *                    	Technical Solutions Specialist 
 *                    	wimills@cisco.com
 *                    	Cisco Systems
 * 
 * Version: 1-0-0
 * Released: 15/02/23
 * 
 * This Webex Devices macro lets you easily define locally managed
 * translations patterns which change any dialled destination into another.
 * 
 * Features:
 * - Match and redirect a dialled number
 * - Match and prefix a dialled number
 * - Ignore specific numbers
 * 
 * Full Readme and source code available on Github:
 * https://github.com/wxsd-sales/translation-pattern-macro
 * 
 ********************************************************/
import xapi from 'xapi';

/*********************************************************
 * Configure the settings below
**********************************************************/

const patterns = [
  { regex: '^([1][2][3])$', action: 'redirect', redirect: 'example@webex.com' },  // Matches 123 -> redirects to example@webex.com
  { regex: '123@connect\.example\.com', action: 'redirect', redirect: 'example@webex.com' },  // Matches 123@connect.example.com -> redirects to example@webex.com
  { regex: '^([7][8][9])$', action: 'redirect', redirect: 'example@webex.com' },  // Matches 789 -> redirects to example@webex.com
  { regex: '^([0-9]{9,12})$', action: 'prefix', redirect: '.example@webex.com' }, // Matches 9-12 digits -> <numbers>+ '.example@webex.com'
  { regex: '^(.*)@(.*)$', action: 'continue' } //Matches *@* URI -> Ignores URIs, allows to continue
]

/*********************************************************
 * Below are the macros functions
**********************************************************/

xapi.Status.Call.on(handleOutgoing);

function handleOutgoing(call) {

  if (call.Direction != 'Outgoing') return;
  if (!call.CallbackNumber) return;
  
  const callId = call.id;
  const callback = normaliseRemoteURI(call.CallbackNumber);

  console.log(`Outgoing call detected to: [${callback}]`)
  const match = patterns.find(pattern => {
    const re = new RegExp(pattern.regex)
    return re.test(callback)
  });

  if (match) {
    switch (match.action) {
      case 'redirect':
        console.log(`Number matched with expression [${match.regex}] | Redirecting to: [${match.redirect}]`);
        changeCall(callId, match.redirect)
        break;
      case 'prefix':
        console.log(`Number matched with expression [${match.regex}] | Redirecting to: [${callback+match.redirect}]`);
        changeCall(callId, callback+match.redirect)
        break;
      case 'continue':
        console.log(`Number matched with expression [${match.regex}] | Ignoring call`);
        break;
    }
  } else {
    console.log('Not match found, ignoring call');
  }
};

function changeCall(callId, target) {
  console.log(`Disconnecting CallId: [${callId}]`);
  xapi.Command.Call.Disconnect({ CallId: callId });
  console.log(`Dialling Number: [${target}]`);
  xapi.Command.Dial({ Number: target });
}

function normaliseRemoteURI(number){
  const re = new RegExp('^(sip:|h323:|spark:|h320:|webex:|locus:)')
  return number.replace(re, '')
}
