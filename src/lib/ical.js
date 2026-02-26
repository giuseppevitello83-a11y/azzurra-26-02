import ICAL from "ical.js";

export async function fetchICalEvents(url) {
    if (!url) return [];

    try {
        const response = await fetch(url);
        const text = await response.text();
        const jcalData = ICAL.parse(text);
        const comp = new ICAL.Component(jcalData);
        const vevents = comp.getAllSubcomponents("vevent");

        return vevents.map(vevent => {
            const event = new ICAL.Event(vevent);
            return {
                start: event.startDate.toJSDate(),
                end: event.endDate.toJSDate(),
                summary: event.summary
            };
        });
    } catch (error) {
        console.error("Error fetching or parsing iCal:", error);
        return [];
    }
}
