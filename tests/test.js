'use strict';

import HipChatNotify from '../';

const hipchat = new HipChatNotify({ room:'2139866', token:'Sq8Jd39ZR8R1xzZcfcyZVWEgYAdU9PiD2kUARP3X' });

hipchat.notify('Zombie ipsum reversus ab viral inferno.', (err, { status }) => {
  if (!err) {
    console.log(`The HipChat API said things went ${status}`);
  }
});

// hipchat.success('De carne <b>lumbering</b> animata corpora quaeritis.');
// hipchat.error('<b>Warning</b>: Nescio brains an Undead zombies.');
// hipchat.info({ message:'Pestilentia est plague haec decaying ambulabat mortuos.', notify:false });
// hipchat.success('<b>Success</b>: Pestilentia est plague haec decaying ambulabat mortuos.');
