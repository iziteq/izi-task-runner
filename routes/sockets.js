var exec = require('child_process').exec,
  Config = require('config-js'),
  config = new Config('./config/config.js');

if (!String.prototype.formatArray) {
  String.prototype.formatArray = function(array) {
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof array[number] != 'undefined'
        ? array[number]
        : match
      ;
    });
  };
}

var sockets = function (socket) {
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('executeCommand', function(data){
    var command, options, commandString, spawnCommand, commands,
      safeOptions = [],
      commandList = config.get('commands'),
      doneEvent, failEvent;

    commandGroup = commandList[data.taskGroup];
    command = commandGroup.commands[data.task];
    options = data.params;
    // check for possible attacks and delete all text right to && and ; sumbols
    options.forEach(function (option, index) {
      safeOptions.push(option.split('&&')[0].split(';')[0].split('|')[0]);
    });
    commandString = command.cmd.formatArray(safeOptions).replace(/{(\d+)}/g, '').trim();

    doneEvent = 'commandDone:'+data.task;
    failEvent = 'commandFail:'+data.task;

    console.log('received user command:' + commandString);

    exec(commandString, function (error, stdout, stderr) {
      console.log('command was executed');
      if (error) {
        socket.emit(failEvent, {output: stdout, errors: stderr});
      } else {
        socket.emit(doneEvent, {output: stdout, errors: stderr});
      }
    });
  });

};

module.exports = sockets;
