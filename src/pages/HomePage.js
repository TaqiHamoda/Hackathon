import * as React from "react";
import { ReactBingmaps } from "react-bingmaps";
import {
    Stack,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Button,
} from "@mui/material";

import { Announcements, RSVP } from "../database/Announcements";
import EventSideBar from "../components/EventSideBar";

const HomePage = () => {
    const [announce, setAnnounce] = React.useState(Announcements);
    const [open, setOpen] = React.useState(false);
    const [coor, setCoor] = React.useState([null, null]);

    var MaxAnnouncementID = Math.max(...Object.keys(Announcements));

    const handleClickOpen = (e) => {
        setOpen(true);
        setCoor([e.latitude, e.longitude])
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createAnnouncement = () => {
        Announcements[MaxAnnouncementID + 1] = {
            id: MaxAnnouncementID + 1,
            location: {
                latitude: coor[0],
                longitude: coor[1],
            },
            title: document.getElementById('title').value,
            datetime: new Date(),
            capacity: Number.parseInt(document.getElementById("capacity").value),
            rsvp: 0,
            description: document.getElementById('description').value
        };
        RSVP[MaxAnnouncementID + 1] = true;

        MaxAnnouncementID += 1;
        setAnnounce(Announcements);

        handleClose();
    };

    const rsvpEvent = (event_id) => {
        Announcements[event_id].rsvp += 1;
        setAnnounce(Announcements);
    }

    return (
        <Stack direction="row" height='100vh'>
            <>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Announce Event</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the following fields to anounce an
                            event at UTM
                        </DialogContentText>
                        <Stack direction="column">
                            <TextField
                                required
                                id="title"
                                label="Title"
                                margin="dense"
                                fullWidth
                            />
                            <Stack direction="row">
                                <TextField
                                    required
                                    id="latitude"
                                    defaultValue={coor[0]}
                                    label="Latitude"
                                    margin="dense"
                                    type="number"
                                    sx={{ mr: "5px" }}
                                />
                                <TextField
                                    required
                                    id="longitude"
                                    defaultValue={coor[1]}
                                    label="Longitude"
                                    margin="dense"
                                    type="number"
                                    sx={{ mr: "5px" }}
                                />
                                <TextField
                                    required
                                    id="capacity"
                                    label="Capacity"
                                    margin="dense"
                                    type="number"
                                />
                            </Stack>
                            <TextField
                                required
                                id="description"
                                label="Description"
                                margin="dense"
                                minRows={3}
                                multiline
                                fullWidth
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={createAnnouncement}>Announce</Button>
                    </DialogActions>
                </Dialog>
            </>

            <Stack maxHeight="100vh" width="500px" overflow="scroll">
                <EventSideBar announcements={announce} rsvpEvent={rsvpEvent}/>
            </Stack>

            <Stack width="100%">
                <ReactBingmaps
                    bingmapKey={process.env.REACT_APP_BING_MAPS_KEY}
                    center={[43.548828, -79.663986]}
                    zoom={17}
                    mapOptions={{
                        showMapTypeSelector: false,
                    }}
                    infoboxesWithPushPins={Object.values(announce).map((a) => {
                        return {
                            location: [
                                a.location.latitude,
                                a.location.longitude,
                            ],
                            addHandler: "mouseover",
                            infoboxOption: {
                                title: a.title,
                                description: a.description,
                            },
                            pushPinOption: {
                                color: "red",
                                title: a.title,
                                description: a.description,
                            },
                            infoboxAddHandler: {
                                type: "click",
                                callback: () => {},
                            },
                            pushPinAddHandler: {
                                type: "click",
                                callback: () => {},
                            },
                        };
                    })}
                    getLocation={{
                        addHandler: "click",
                        callback: handleClickOpen,
                    }}
                />
            </Stack>
        </Stack>
    );
};

export default HomePage;
