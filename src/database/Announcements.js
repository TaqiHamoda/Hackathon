// Check javascript datetime: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

// Announcements objects
const Announcements = [
    {
        id: 0,
        location: {
            latitude: 43.550841,
            longitude: 79.664593,
        },
        title: "UTM Soccer",
        datetime: new Date("2023-05-01T17:30:00"),
        capacity: 11,
        rsvp: 5,
        description: "Hey guys, we are playing soccer at the UTM soccer field in front of MN. You're welcome to join us :)"
    },
    {
        id: 1,
        location: {
            latitude: 43.547940,
            longitude: -79.660912,
        },
        title: "Basketball Playerz",
        datetime: new Date("2023-05-01T14:00:00"),
        capacity: 3,
        rsvp: 2,
        description: "Sup everyone. Wanna join us for a basketball game at the RAWC?"
    },
    {
        id: 2,
        location: {
            latitude: 43.547940,
            longitude: -79.660914,
        },
        title: "Badminton",
        datetime: new Date("2023-05-01T14:00:00"),
        capacity: 0,
        rsvp: 1,
        description: "Hello, please join us in playing badminton this Monday!"
    },
    {
        id: 3,
        location: {
            latitude: 43.550841,
            longitude: 79.664590,
        },
        title: "soccer playoffs",
        datetime: new Date("2023-05-05T17:30:00"),
        capacity: 22,
        rsvp: 11,
        description: "This Friday, we will have a friendly soccer playoff in front of MN."
    },
    {
        id: 4,
        location: {
            latitude: 43.547940,
            longitude: -79.660910,
        },
        title: "Basketball Game",
        datetime: new Date("2023-05-03T14:00:00"),
        capacity: 5,
        rsvp: 2,
        description: "We need players for our basketball game!"
    }
    
]


// Which announcements the user RSVP to
const RSVP = [0,]