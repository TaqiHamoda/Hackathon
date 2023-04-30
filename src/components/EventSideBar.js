import * as React from "react";
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    IconButton,
    Typography,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
} from "@mui/material";
import { Link } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import ForumIcon from "@mui/icons-material/Forum";

import { RSVP } from "../database/Announcements";
import { UserName } from "../database/Messages";

const EventSideBar = ({ announcements, rsvpEvent }) => {
    const [eventsRSVP, setEventsRSVP] = React.useState(RSVP);
    const [announce, setAnnounce] = React.useState(
        Object.values(announcements)
    );

    const RSVPtoEvent = (e, event_id) => {
        RSVP[event_id] = true;
        rsvpEvent(event_id);
        setEventsRSVP(RSVP);
    };

    const searchAnnouncements = (e) => {
        const name = e.target.value.toLowerCase();

        if (name == "") {
            setAnnounce(Object.values(announcements));
            return;
        }

        const filtered = [];

        Object.values(announcements).map((a) => {
            if (a.title.toLowerCase().includes(name)) {
                filtered.push(a);
            }
        });
        setAnnounce(filtered);
    };

    return (
        <List sx={{width: "100%"}}>
            <ListItem key="user" >
                <ListItemText primary='Announcer' />
                <Link to="messages">
                    <IconButton size="large"> <ForumIcon /> </IconButton>
                </Link>
            </ListItem>

            <ListItem>
                <FormControl variant="outlined" fullWidth id="searchbarvalue">
                    <InputLabel htmlFor="searchbar">Search</InputLabel>
                    <OutlinedInput
                        id="searchbar"
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                        label="Search"
                        onChange={searchAnnouncements}
                    />
                </FormControl>
            </ListItem>

            {announce.map((a) => {
                return (
                    <ListItem key={a.id}>
                        <ListItemAvatar>
                            <Avatar>
                                <SportsScoreIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={a.title}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: "inline" }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {a.datetime.toUTCString()}
                                    </Typography>
                                    {` - ${a.rsvp}/${a.capacity}`}
                                </React.Fragment>
                            }
                        />
                        <IconButton
                            edge="end"
                            aria-label="RSVP to event"
                            title="RSVP to event"
                            disabled={eventsRSVP[a.id] || a.rsvp >= a.capacity}
                            onClick={(e) => RSVPtoEvent(e, a.id)}
                        >
                            <AddCircleIcon />
                        </IconButton>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default EventSideBar;
