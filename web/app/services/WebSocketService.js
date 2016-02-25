angular.module('openboiler').factory('WebSocketService', [ 'WebSocketUrl', function(WebSocketUrl) {
    var service = {};
    var ws;
    service.init = function (callback) {
        ws = new WebSocket(WebSocketUrl);

        ws.onmessage = function (message) {
            callback(JSON.parse(message.data));
        };
        
        ws.onopen = function() {
            ws.send('subscribe');
        };
    }
    
    return service;
}]);