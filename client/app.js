/// <reference types="socket.io" />

(() => {
    const socket = new io('ws://192.168.1.3:9292');
    window.socket = socket;
    const messageList = document.getElementById("message-list");

    socket.on('action_keypress_client', (message) => {
        console.log(message);
        const li = document.createElement("li");
        li.innerText = message.code;
        messageList.append(li);
    });

    socket.on('action_keypress', (keyb) => {
        console.log(keyb);
    });

    window.onbeforeunload = () => {
        socket.disconnect();
    }

    const keypr = document.getElementById("keypr");

    keypr.onkeydown = (e) => {
        e.preventDefault();

        socket.emit('action_keypress', {
            key: e.key,
            keyCode: e.keyCode,
            code: e.code,
            altKey: e.altKey
        })
    }


    const right = document.getElementById("right");
    const left = document.getElementById("left");
    const space = document.getElementById("space");

    right.onclick = () => {
        socket.emit('action_keypress', {
            key: 'ArrowRight',
            keyCode: 39,
            code: 'ArrowRight',
            which: 39,
        })
    }

    left.onclick = () => {
        socket.emit('action_keypress', {
            key: 'ArrowLeft',
            keyCode: 37,
            code: 'ArrowLeft'
        });
    }

    space.onclick = () => {
        socket.emit('action_keypress', {
            key: 'Space',
            code: 'Space',
            keyCode: 32
        })
    }
})()
