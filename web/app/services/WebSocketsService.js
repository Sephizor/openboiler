angular.module('openboiler').factory('WebSocketsService', [ function() {
    var service = {};
    var ws;
    service.init = function(callback) {
        ws = new WebSocket('ws://192.168.1.180:8082');
        ws.onmessage = function(message) {
            callback(JSON.parse(message.data));
        };
        ws.onopen = function() {
            ws.send('subscribe');
        };
    }
    
    return service;
}]);