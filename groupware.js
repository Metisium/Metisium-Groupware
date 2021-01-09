const express = require('express');
const jwt = require('../../../middleware/jwt');
const router = express.Router();

const appData = () => { // App Informations
  return {
    id: 'groupware',
    name: "Groupware",
    version: 0.1,
    author: 'Robin Schleser (privat@schleser.org)',
    hasWebAssets: true,
    subURL: '/gw',
    pages: [
      { name: 'Mails', href: '/mail' },
      { name: 'Write Mail', href: '/write' },
      { name: 'Calendar', href: '/calendar' },
    ],
  }
}

const onEnable = (logger) => { // Hook which will be called if the addon was successfully enabled
  logger.info('Groupware Add-on has been enabled');
}

const onDisable = (logger) => { // Shutdown or disable hook
  logger.info('Groupware Add-on has been disabled');
}

/** Express Endpoints */
router.get('/', (req, res) => {
  res.render(__dirname + '/ejs/mail', { title: "Mails" });
})

router.get('/mail', (req, res) => {
  res.render(__dirname + '/ejs/mail', { title: "Mail" });
});

router.get('/write', (req, res) => {
  res.render(__dirname + '/ejs/mail-write', { title: "Write" });
});

router.get('/calendar', jwt.auth, (req, res) => {
  res.render(__dirname + '/ejs/calendar', {
    title: "Calendar", events: [
      {
        title: "Workshop",
        description: "Toll beschreibung yaay wuhu wuuoiaog,woagpoaügw",
        room: "https://zoom.us/j/xxx",
        start: "12:30",
        end: "14:30"
      },
      {
        title: "Workshop",
        description: "Toll beschreibung yaay wuhu wuuoiaog,woagpoaügw",
        room: "https://zoom.us/j/xxx",
        start: "12:30",
        end: "14:30"
      },
      {
        title: "Workshop",
        description: "Toll beschreibung yaay wuhu wuuoiaog,woagpoaügw",
        room: "https://zoom.us/j/xxx",
        start: "12:30",
        end: "13:45"
      },
      {
        title: "Workshop",
        description: "Toll beschreibung yaay wuhu wuuoiaog,woagpoaügw",
        room: "https://zoom.us/j/xxx",
        start: "12:30",
        end: "14:30"
      },
      {
        title: "Workshop",
        description: "Toll beschreibung yaay wuhu wuuoiaog,woagpoaügw",
        room: "https://zoom.us/j/xxx",
        start: "15:30",
        end: "16:30"
      }
    ],
    user: req.user,
    selected: 0,
    pages: [
      { 
        name: 'My Calendar',
        href: './calendar/0' 
      },
      {
        name: 'Birthdays',
        href: './calendar/1' 
      },
      { name: 'Family', href: './calendar/2'  },
      { name: 'New', href: './calendar/add' }]
  });
});

router.get('/calendar/:id', jwt.auth, (req, res) => {
  if (req.params.id != "add") {
    res.render(__dirname + '/ejs/calendar', { title: "Calendar", user: req.user, selected: parseInt(req.params.id), pages: [{ name: 'My Calendar', href: '#my' }, { name: 'Birthdays', href: '#birth' }, { name: 'Family', href: '#family' }, { name: 'New', href: '#add' }] });
  }
});


/** Don't forget to expose these methodes */
module.exports = {
  appData,
  onEnable,
  onDisable,
  router
}
