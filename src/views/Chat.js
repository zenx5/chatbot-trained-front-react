import { useEffect, useRef, useState } from 'react'
import { Box, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material'
import { Send } from '@mui/icons-material'
import { useChat } from '../tools/ConversationProvider'


export default function ChatView() {
    const [scroll, setScroll] = useState(0)
    const listRef = useRef(null)
    const {
        message,
        setMessage,
        conversation,
        sendMessage
    } = useChat()

    useEffect(()=>{
        if( conversation.length >= 10 ) {
            console.log(listRef.current.scrollHeight)
            setScroll( prev => listRef.current.scrollHeight - 450 )
        }
    },[conversation])

    return <Box sx={{ height:'100vh' }}>
        <Box sx={{
            width: 400,
            borderRadius:4,
            backgroundColor:'#f0f0f0',
            boxShadow:'0 0 5px',
            marginLeft:'auto',
            marginRight:'auto',
            overflow:'hidden'
        }}>
            <Box sx={{
                display:'flex',
                justityContent:'center',
                alignItems:'center',
                px:10,
                height: 70,
                border:'1px solid #a0a0a0'
            }}>
                <Typography>Scroll: { scroll }</Typography>
            </Box>
            <Box sx={{ height:500, overflow:'hidden' }}>
                <List sx={{ height: 500, bottom: scroll }} ref={listRef}>
                    {conversation.map( (messageContent, index) => 
                    <ListItem key={index} sx={{ height:50, p:2, m:0 }}>
                        <ListItemText primary={messageContent.content} />
                    </ListItem>)}
                </List>
            </Box>
            <TextField 
                sx={{ width:'100%', m:0, backgroundColor:'#fff' }}
                value={message}
                onChange={setMessage}
                onClick={sendMessage}
                InputProps={{
                    endAdornment: <IconButton><Send /></IconButton>
                }}
                />
        </Box>
    </Box>
}