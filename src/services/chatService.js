export default class ChatService {

    static async sendMessage(message, context){
        const response = await fetch(`${process.env.REACT_APP_API_CHAT}/query`, {
            method:'post',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                text:message,
                context:context
            }),
            redirect:'follow'
        })
        const { choices, id, created } = await response.json()
        
        return choices ? choices[0].message : { role:'assistant', content:'--hubo un error--' }
    }
}