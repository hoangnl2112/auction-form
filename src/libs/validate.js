'use strict';

export const checkEmail = function (email) {
  if (typeof email !== 'string') return false;
  const reg = new RegExp('^(([^<>()[\\]\\\\.,;:\\s@\\\']+(\\.[^<>()[\\]\\\\.,;:\\s@\\\']+)*)|(\\\'.+\\\'))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
  return reg.test(email);
};

export const getMessageError = function (message, indicator = '\n', indicator2 = ', ') {
  if(message) {
    if(typeof message === 'string') return message;
    if(Object.keys(message).length > 0) {
      const msg = [];
      for(let key in message) {
        msg.push(key + ': ' + message[key].join(indicator2));
      }
      msg.join(indicator)
    }
  }
  return '';
};
