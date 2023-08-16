import { io } from "socket.io-client";

let Socket = ''
let tempUrl = ''
let setIntervalWesocketPush = null

/**
 * 建立websocket连接
 * @param {string} url ws地址
 */
export const createSocket = url => {
    Socket && Socket.close()
    tempUrl = url
    if (!Socket) {
        console.log('建立websocket连接')
        Socket = new io(url);
        Socket.on("connect", onopenWS);
        Socket.on("message", onmessageWS);
        Socket.on("connect_error", onerrorWS);
        Socket.on("disconnect", oncloseWS);
        Socket.on("gameMap", ongameMap);
    } else {
        console.log('websocket已连接')
    }
}

/**打开WS之后发送心跳 */
const onopenWS = () => {
    // sendPing()
    console.log('websocket连接成功')
}

/**连接失败重连 */
const onerrorWS = () => {
    Socket.close()
    clearInterval(setIntervalWesocketPush)
    console.log('连接失败重连中')
    if (Socket.disconnected) {
        Socket = null
        createSocket(tempUrl)
    }
}

/**WS数据接收统一处理 */
const onmessageWS = e => {
    // console.log('message:', e);
    // window.addEventListener('onmessageWS',function(e){
    //     console.log(e)
    // })
    window.dispatchEvent(new CustomEvent('onmessageWS', {
        detail: e
    }))
}

const ongameMap = e => {
    window.dispatchEvent(new CustomEvent('ongameMapWs', {
        detail: e
    }))
}


/**
 * 发送数据但连接未建立时进行处理等待重发
 * @param {any} message 需要发送的数据
 */
const connecting = message => {
    setTimeout(() => {
        if (Socket.readyState === 0) {
            connecting(message)
        } else {
            Socket.send(JSON.stringify(message))
        }
    }, 1000)
}

/**
 * 发送数据
 * @param {any} message 需要发送的数据
 */
export const sendWSPush = message => {
    console.log(Socket, Socket.connected);
    if (Socket !== null && Socket.connected) {
        Socket.emit(message.key, message.value)
    } else {
        Socket = null
        Socket.close()
        createSocket(tempUrl)
    }
}

/**断开重连 */
const oncloseWS = (reason) => {
    clearInterval(setIntervalWesocketPush)
    console.log(reason, 'websocket已断开....正在尝试重连')
    if (reason === "io server disconnect") {
        Socket.connect();
    }
}
/**发送心跳
 * @param {number} time 心跳间隔毫秒 默认5000
 * @param {string} ping 心跳名称 默认字符串ping
 */
export const sendPing = (time = 5000, ping = 'ping') => {
    clearInterval(setIntervalWesocketPush)
    Socket.emit('ping', ping)
    setIntervalWesocketPush = setInterval(() => {
        Socket.emit('ping', ping)
    }, time)
}
