const client = require("../../index");
const moment = require('moment');
const tz = require('moment-timezone');
const chalk = require('chalk');
const { TimeCode, ClockChannel, Format, Interval } = require('../../settings/settings')

client.once('ready', () => {
  //init time
  const timeNow = moment().tz(TimeCode).format(Format);
  //define clockChannel
  const channel = client.channels.cache.get(ClockChannel);
  //initial update
  channel.edit({ name: `🕒 ${timeNow}` }, 'Clock update')
    .catch(console.error);
  //set the interval
  setInterval(() => {
    const timeNowUpdate = moment().tz(TimeCode).format(Format);
    ClockChannel.edit({ name: `🕒 ${timeNowUpdate}` }, 'Clock update')
      .catch(console.error);
  }, Interval);

    console.log(chalk.greenBright("[READY]"), `Logged in as ${client.user.tag} (${client.user.id}) at ${moment().format("DD MMMM YYYY, HH:mm:ss")}`);
});