import { createContext, useContext, useState } from "react";
import ChatService from "../services/chatService";

const ContextChat = createContext();

function useChat() {
    return useContext(ContextChat)
}

function ProviderChat({ children }){
    const [conversation, setConversation] = useState([])
    const [message, _setMessage] = useState('')

    const setMessage = (event) => {
        _setMessage( prev => event.target.value )
    }

    const sendMessage = async () => {
        if( message!=='' ) {
            const responseMessage = await ChatService.sendMessage(message, conversation)
            setConversation( prev => [
                ...prev,
                { role:'user', content: message },
                responseMessage
            ])
            _setMessage('')
        }
    }

    return <ContextChat.Provider value={{
        message, setMessage, conversation, sendMessage
    }}>{ children }</ContextChat.Provider>

}

export { ProviderChat, useChat}