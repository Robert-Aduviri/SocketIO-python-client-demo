from socketIO_client_nexus import SocketIO, LoggingNamespace

with SocketIO('http://localhost', 3000, LoggingNamespace) as socketIO:
    socketIO.emit('chat message', 'greetings from python')
    socketIO.wait(seconds=1)