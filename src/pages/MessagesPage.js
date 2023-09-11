import * as React from "react";
import {
    Stack,
    InputLabel,
    FormControl,
    Divider,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Paper
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

import { Announcements, RSVP } from "../database/Announcements";
import { UserName, Messages } from "../database/Messages";
import MessageSideBar from "../components/MessageSideBar";

const MessagesPage = () => {
    const [messages, setMessages] = React.useState(Messages);
    const [selected, setSelected] = React.useState(Object.keys(RSVP)[0]);

    const sendMessage = (e) => {
        console.log(document.getElementById("sendmessage").target);
        const msg = e.target.value;
        
        Messages[selected].push({
            datetime: new Date(),
            user: UserName,
            message: msg
        });
        setMessages(Messages);

        console.log(Messages[selected]);

        // e.target.value = '';
    }

    return (
        <Stack direction="row" height="100vh">
            <Stack maxHeight="100vh" width="500px" overflow="scroll">
                <MessageSideBar
                    messages={messages}
                    handleMessageSelect={(e, message_id) =>
                        setSelected(message_id)
                    }
                />
            </Stack>

            <Divider orientation="vertical" flexItem />

            <Stack width="100%" direction='column'>
                <Stack direction='column' height='100%' width='100%'>
                    {messages[selected].map(m => {
                        return <Stack key={m.datetime.toUTCString()} width='100%' direction={m.user == UserName ? 'row-reverse' : 'row'}>
                            <Paper
                            elevation={12}>
                                {m.message}
                            </Paper>
                        </Stack>
                    })}
                </Stack>

                <FormControl  sx={{padding: '10px'}}  variant="outlined">
                    <InputLabel htmlFor="sendmessage">
                        Type Message
                    </InputLabel>
                    <OutlinedInput
                        id="sendmessage"
                        type='text'
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Send Message"
                                    title="Send Message"
                                    onClick={sendMessage}
                                    edge="end"
                                >
                                    <SendIcon/>
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
            </Stack>
        </Stack>
    );
};

export default MessagesPage;
