var Promise = require('bluebird');
var telnet = require('telnet-client');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var util = require('util');
var moment = require('moment');
var EventEmitter = require('events').EventEmitter;
var openvpnEmitter = false;
var connection = false;
var logpath = null;

module.exports.destroy = function() {
    if (connection) {
        connection.removeAllListeners();
        connection.end();
        connection.destroy();
        connection = false;
    }
}

module.exports.connect = function(params) {

   
}

module.exports.connectAndKill = function(params) {
  
}

module.exports.authorize = function(auth) {
   
}

module.exports.disconnect = function() {
    return disconnectOpenVPN();
}

module.exports.cmd = function(cmd) {
    return OpenVPNManagement(cmd);
}

function establishConnection(params) {

    connection = new telnet();
    openvpnEmitter = new EventEmitter();

    connection.on('end', function() {
        openvpnEmitter.emit('end');
    });
    connection.on('close', function() {
        openvpnEmitter.emit('close');
    });
    connection.on('error', function(error) {
        console.log(error);
        openvpnEmitter.emit('error', error);
    });

    return new Promise(function(resolve) {
        params = _.defaults(params, {
            host: '127.0.0.1',
            port: 1337,
            shellPrompt: '',
            timeout: 2
        });
        resolve(connection.connect(params));
    });
}

function disconnectOpenVPN() {
    return OpenVPNManagement('signal SIGTERM');
}

function OpenVPNManagement(cmd) {

}

function OpenVPNLog() {
  
}