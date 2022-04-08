import { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
const API_ENDPOINT = 'http://localhost:3001';
const RandomNumberSocket = () => {
    const [number, setNumber] = useState('');
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        setSocket(socketIOClient(API_ENDPOINT));
        const destructFunction = () => {
            console.log(socket);
            socket.disconnect();
            alert('component removed');
        };
        return destructFunction;
    }, []);
    useEffect(() => {
        connectSocketConnection(socket);
    }, [socket]);
    const connectSocketConnection = (socket) => {
        if (socket != null) {
            socket.on('GetNumber', (data) => {
                setNumber(data);
                console.log(number);
            });
        }
    };
    const socketConnect = () => {
        setSocket(socketIOClient(API_ENDPOINT));
    };
    const socketDisconnect = () => {
        socket.disconnect();
    };
    return (
        <div className="container-fluid text-center">
            <h1 className="mt-3">The randomly generated number is {number}</h1>
            <button className="btn btn-outline-primary" onClick={socketConnect}>
                {' '}
                Connect{' '}
            </button>
            <br />
            <button
                className="btn btn-outline-primary"
                onClick={socketDisconnect}
            >
                {' '}
                Disconnect{' '}
            </button>
        </div>
    );
};
export default RandomNumberSocket;
