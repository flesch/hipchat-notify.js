# hipchat-notify

> **A room notification** - Room owners are able to create room notification tokens that can be used to send room notification messages, popular with light-weight, notification-only integrations.

Using [version 2 of HipChat's API](https://www.hipchat.com/docs/apiv2), this Node library abstracts sending [notifications](https://www.hipchat.com/docs/apiv2/method/send_room_notification) to HipChat rooms.

![HipChat](https://cloud.githubusercontent.com/assets/13259/4345434/da13eaba-40cd-11e4-9b22-5f61da9cd517.png)

## Installation

```javascript
$ npm install --save hipchat-notify
```

## Usage

Create a new instance of `HipChatNotify` for each room you want to notify, including the room ID or name and the notification token (created on the HipChat admin site).

```javascript
var HipChatNotify = require('hipchat-notify');
var hipchat = new HipChatNotify(836305, '1nkUSmF8rH4QY1wMGj1rcelvtYKUG7rFteEv8ROZ');
```

### hipchat.notify(`str_or_object`, `[callback]`);

```javascript
hipchat.notify('Pastry I love cupcake fruitcake chocolate cake gummi bears dragée I love.');
```

The color of the message will be `yellow` by default, and will set `notify` to true. To change this, pass an `Object` instead of a `String`.

```javascript
hipchat.notify({ message:'Pastry I love cupcake fruitcake chocolate cake gummi bears dragée I love.', color:'purple', notify:false });
```

The `message_format` is automatically set for you, based on whether or not your `message` includes HTML elements. Passing an `Object` instead of a `String` will let you override this and other defaults.

### Examples

Other methods also exist to change the color.

```
hipchat.info('Pastry I love cupcake fruitcake <strong>chocolate cake</strong> gummi bears dragée I love.'); // gray
hipchat.warning('<i><b>Warning</b>: Cupcake powder lollipop bonbon liquorice croissant sweet.</i>'); // red
hipchat.success('Tiramisu jelly gummies bear claw brownie caramels applicake chocolate bar I love.'); // green
hipchat.error('<b>Error</b>: Marshmallow cheesecake chocolate topping chocolate cake I love ice cream.'); // red
```

## License

[The MIT License (MIT)](http://flesch.mit-license.org/)

Copyright © 2013 John Flesch, [http://fles.ch](http://fles.ch/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.