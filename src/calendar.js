import request from 'superagent';

const CALENDAR_ID = process.env.GATSBY_CALENDAR_ID;
const API_KEY = process.env.GATSBY_API_KEY;
let getUrl = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&singleEvents=True`

export function getCalendarEvents(callback) {
    request
        .get(getUrl)
        .end((err, resp) => {
            if (!err) {
                const events = []
                JSON.parse(resp.text).items.map((event) => {
                    events.push({
                        start: event.start.date || event.start.dateTime,
                        end: event.end.date || event.end.dateTime,
                        title: event.summary,
                        location: event.location,
                        description: event.description,
                        recurrence: event.recurrence,
                    })
                })
                callback(events)
            }
        })
}