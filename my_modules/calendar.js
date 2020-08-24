const { google } = require("googleapis");
const gapi = require("./gapi.js");
const auth = gapi.getAuth();
module.exports = {
    CraeteEvent(splitted) {
        const calendar = google.calendar({version: 'v3', auth});
        month = splitted[1];
        day = splitted[2];
        time = splitted[3];
        clase = splitted[4];
        link = splitted[5];
        date = `2020-${month}-${day}T${time}:00:00+02:00`;
        var event = {
            'summary': `Clase de: ${clase}`,
            'description': link,
            'start': {
            'dateTime': date,
            'timeZone': 'Europe/Madrid',
            },
            'end': {
            'dateTime': date,
            'timeZone': 'Europe/Madrid',
            },
            'reminders': {
            'useDefault': false,
            'overrides': [
                {'method': 'popup', 'minutes': 5},
            ],
            },
        };
        
        calendar.events.insert({
            auth: auth,
            calendarId: 'primary',
            resource: event,
        }, function(err, event) {
            if (err) {
            console.log('There was an error contacting the Calendar service: ' + err);
            return;
            }
        });
    }
}  