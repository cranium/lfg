from autobahn.twisted.websocket import WebSocketServerFactory, WebSocketServerProtocol
from twisted.internet import reactor
import json
import txredisapi as redis
from twisted.internet.protocol import ClientCreator


class LFGSubscriber(redis.SubscriberProtocol):
    def connectionMade(self):
        self.subscribe("main")

    def messageReceived(self, pattern, channel, message):
        print("pattern=%s, channel=%s message=%s" % (pattern, channel, message))


class LFGSubscriberFactory(redis.SubscriberFactory):
    maxDelay = 120
    continueTrying = True
    protocol = LFGSubscriber


class LFGServerProtocol(WebSocketServerProtocol):
    clients = set()  # type: set[LFGServerProtocol]

    def onConnect(self, request):
        self.clients.add(self)

    def onMessage(self, payload, isBinary):
        message = payload.decode('utf8')
        for client in self.clients:
            client.sendMessage(message)
        print(message)

    def sendMessage(self,
                    payload,
                    isBinary=False,
                    fragmentSize=None,
                    sync=False,
                    doNotCompress=False):
        super(LFGServerProtocol, self).sendMessage(json.dumps(payload, ensure_ascii=False).encode('utf8'))

    @classmethod
    def newLfg(cls):
        for client in cls.clients:
            client.sendMessage({"message": "a new lfg was created"})


if __name__ == '__main__':
    ws_factory = WebSocketServerFactory()
    ws_factory.protocol = LFGServerProtocol

    redis_factory = LFGSubscriberFactory()

    reactor.connectTCP('localhost', 6379, LFGSubscriberFactory())

    reactor.listenTCP(9000, ws_factory)
    reactor.run()
