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
    ListItemButton,
} from "@mui/material";
import { Link } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { RSVP, Announcements } from "../database/Announcements";
import { UserName } from "../database/Messages";

const MessageSideBar = ({messages, handleMessageSelect}) => {
    const [selected, setSelected] = React.useState(Object.keys(RSVP)[0]);
    const [announce, setAnnounce] = React.useState(Object.values(Announcements));

    const searchAnnouncements = (e) => {
        const name = e.target.value.toLowerCase();

        if (name == "") {
            setAnnounce(Object.values(Announcements));
            return;
        }

        const filtered = [];

        Object.values(Announcements).map((a) => {
            if (a.title.toLowerCase().includes(name)) {
                filtered.push(a);
            }
        });
        setAnnounce(filtered);
    };

    return (
        <List sx={{width: "100%"}}>
            <ListItem key="user" >
                <Link to="/">
                    <IconButton size="large"> <ArrowBackIcon /> </IconButton>
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
                return RSVP[a.id] ? (
                    <ListItemButton
                    key={a.id}
                    selected={a.id == selected}
                    onClick={(e) => {
                        setSelected(a.id);
                        handleMessageSelect(e, a.id);
                    }}
                    >
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
                                        {messages[a.id][messages[a.id].length - 1].message}
                                    </Typography>
                                    {` - ${messages[a.id][messages[a.id].length - 1].datetime.toUTCString()}`}
                                </React.Fragment>
                            }
                        />
                    </ListItemButton>
                ) : <div key={a.id}></div>;
            })}
        </List>
    );
};

export default MessageSideBar;
