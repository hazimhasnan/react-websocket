import React,{ useEffect } from "react";
import WebSocket from 'ws';
import useWebSocket from 'react-use-websocket';


const URL = 'ws://localhost:8083/api/v1/pharmacist/list/socket/hazim'


const Websocket = () => {
    const {
        sendMessage,
        sendJsonMessage,
        lastMessage,
        lastJsonMessage,
        readyState,
        getWebSocket
      } = useWebSocket(URL, {
        onOpen: () => console.log('opened'),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
      });

    useEffect(() => {
       
    }, [])

    return (
        <>
        <h1>This is your websocket app!</h1>
        </>
    )
}

export default Websocket;