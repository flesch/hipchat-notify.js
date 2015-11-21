'use strict';

import { post } from 'got';

const {
  HIPCHAT_ROOM,
  HIPCHAT_TOKEN,
  HIPCHAT_SERVER = 'api.hipchat.com'
} = process.env;

function toMessageObject(message) {
  return (typeof message === 'string') ? { message } : message;
}

export default class HipChatNotify {

  constructor({ room = HIPCHAT_ROOM, token = HIPCHAT_TOKEN, server = HIPCHAT_SERVER }) {

    if (!room) { throw new Error('A HipChat room must be defined!'); }
    if (!token) { throw new Error('A HipChat room token must be defined!'); }

    this.room = room;
    this.token = token;
    this.server = server;

    this.notify = this.notify.bind(this);
    this.info = this.info.bind(this);
    this.warning = this.warning.bind(this);
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);

  }

  info(message, callback) {
    this.notify({ ...{ color:'gray' }, ...toMessageObject(message) }, callback);
  }

  warning(message, callback) {
    this.notify({ ...{ color:'yellow' }, ...toMessageObject(message) }, callback);
  }

  success(message, callback) {
    this.notify({ ...{ color:'green' }, ...toMessageObject(message) }, callback);
  }

  error(message, callback) {
    this.notify({ ...{ color:'red' }, ...toMessageObject(message) }, callback);
  }

  notify(message, callback = function(){}) {

    const body = toMessageObject(message);
    const defaults = { color:'yellow', notify:true, message_format: /<[a-z][\s\S]*>/i.test(body.message) ? 'html' : 'text' };

    const headers = {
      'authorization': `Bearer ${this.token}`,
      'content-type': 'application/json'
    };

    post(`https://${this.server}/v2/room/${this.room}/notification`, { body:JSON.stringify({ ...defaults, ...body }), headers }, (err, res, { statusCode }) => {
      callback(err, statusCode === 204 ? { status:'ok' } : res);
    });

  }

}
