# hipchat-notify

> **A room notification** - Room owners are able to create room notification tokens that can be used to send room notification messages, popular with light-weight, notification-only integrations.

Using [version 2 of HipChat's API](https://www.hipchat.com/docs/apiv2), this Node library abstracts sending [notifications](https://www.hipchat.com/docs/apiv2/method/send_room_notification) to HipChat rooms.

![HipChat](https://cloud.githubusercontent.com/assets/13259/11049199/615d391a-8702-11e5-8d57-99ef3ee8aaa7.png)

## Installation

First, make sure you have a **token** created for each room you'll want to notify.


![HipChat Room Token](https://cloud.githubusercontent.com/assets/13259/11046618/145ec9ca-86f4-11e5-8928-61f79403073b.png)

![HipChat Room Token](https://cloud.githubusercontent.com/assets/13259/11046617/145dff36-86f4-11e5-9c64-11b50773be09.png)


Then, install **hipchat-notify** with npm.

```bash
$ npm install --save hipchat-notify
```

Create a new instance of `HipChatNotify` for each room you want to notify, including the room **ID** or **name** and the **token**.

```javascript
import HipChatNotify from 'hipchat-notify';

const hipchat = new HipChatNotify({ room:'2139866', token:'Sq8Jd39ZR8R1xzZcfcyZVWEgYAdU9PiD2kUARP3X' });
const { notify, info, warning, success, error } = hipchat;
```

If you're using [HipChat Server](https://www.hipchat.com/server), include the `server` key in the configuration object.

```javascript
const hipchat = new HipChatNotify({
  room: '2139866',
  token: 'Sq8Jd39ZR8R1xzZcfcyZVWEgYAdU9PiD2kUARP3X',
  server: 'hipchat.mycompany.com'
});
```

The room **ID** and **token** above are real! Join the room these examples are posted to here: <https://www.hipchat.com/gzS5PTk20>

## Usage

### hipchat.notify(`message`, `callback`);

The `message` argument accepts either a `String` or an `Object`.

```javascript
hipchat.notify('Zombie ipsum reversus ab viral inferno.', (err, { status }) => {
  if (!err) {
    console.log(`The HipChat API said things went ${status}`);
  }
});
```

If your message includes HTML elements, `message_format` is set to `html`. This, and other defaults (like color), can be overriden by passing an `Object` instead of a `String`.

```javascript
hipchat.notify({
  message: 'Zombie ipsum reversus ab viral inferno.',
  color: 'red', // Defaults to 'yellow'.
  notify: false // Defaults to true.
});
```

Be sure to reference HipChat's API [documentation](https://www.hipchat.com/docs/apiv2/method/send_room_notification) for the options you can specifiy (like including a `from` parameter).

Convience methods to define the message color are also included.

* hipchat.notify: `{ color:'yellow' }`
* hipchat.info: `{ color:'gray' }`
* hipchat.warning: `{ color:'red' }`
* hipchat.success: `{ color:'green' }`
* hipchat.error: `{ color:'red' }`

See `tests/test.js` for examples you can run.

```bash
$ babel-node tests/test.js
```


## License

[The MIT License (MIT)](http://flesch.mit-license.org/)

Copyright © 2015 John Flesch, [http://fles.ch](http://fles.ch/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.