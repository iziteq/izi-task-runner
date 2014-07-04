(function () {
  'use strict';

  window.addEventListener('load', function () {

    var i, j,
      socket = io(),
      commandLinks = document.querySelectorAll('.available-command-link'),
      commandExecuteButtons = document.querySelectorAll('.available-command-trigger');

    function notifyTaskStatus(title, text, type) {
      var icon;

      if (type === 'succees') {
        icon = '/images/sign-check.png';
      } else {
        icon = '/images/sign-error.png';
      }

      function createNitification() {
        var message = new Notification(title, {body: text, icon: icon});
        message.onshow = function () {
          setTimeout(function() {
            message.close();
          }, 10000);
        };
      }

      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }

      else if (Notification.permission === "granted") {
        createNitification();
      }

      else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          if(!('permission' in Notification)) {
            Notification.permission = permission;
          }
          if (permission === "granted") {
            createNitification()
          }
        });
      }
    }

    function formRequest(element) {
      var params = [],
        command = element.dataset.command,
        commandList = element.dataset.list,
        paramInputs = document.querySelectorAll('input[name^='+command+']');
      for (i = 0; i < paramInputs.length; i++) {
        params.push(paramInputs[i].value);
      }
      if (params.length === 0) {
        params = [''];
      }
      return {
        taskGroup: commandList,
        task: command,
        params: params
      };
    }

    function linkClickHandler(event) {
      var details = this.nextSibling;
      event.preventDefault();
      details.classList.toggle('hidden');
      this.classList.toggle('opened');
    }

    function clearViewOnResponse(that, spinner, resultsText) {
      that.classList.remove('disabled');
      that.innerHTML = 'Re-run this task';
      spinner.classList.add('hidden');
      resultsText.classList.remove('hidden');
    }

    function buttonClickHandler(event) {
      var that, requestData, doneEvent, failEvent,
        results = this.previousSibling,
        spinner = results.firstChild,
        resultsText = spinner.nextSibling,
        disabled = this.classList.contains('disabled');
      event.preventDefault();
      that = this;
      if (disabled) {
        return false;
      } else {
        requestData = formRequest(that);
        resultsText.classList.add('hidden');
        results.classList.remove('hidden', 'error');
        spinner.classList.remove('hidden');
        this.innerHTML ='Task running...';
        this.classList.add('disabled');

        socket.emit('executeCommand', requestData);

        doneEvent = 'commandDone:'+that.dataset.command;
        failEvent = 'commandFail:'+that.dataset.command;

        socket.on(doneEvent, function (data){
          var html = data.output.replace(/\n/gi, '<br>');
          resultsText.innerHTML = html;
          clearViewOnResponse(that, spinner, resultsText);
          notifyTaskStatus(that.dataset.title + ' - ok!', data.output.substring(0, 40) + '...', 'succees');
          socket.off(doneEvent);
        });

        socket.on(failEvent, function (data){
          var html = data.errors.replace(/\n/gi, '<br>');
          resultsText.innerHTML = html;
          results.classList.add('error');
          clearViewOnResponse(that, spinner, resultsText);
          notifyTaskStatus(that.dataset.title + ' - error!', data.output.substring(0, 40) + '...', 'error');
          socket.off(failEvent);
        });

      }
    }

    for (i = commandLinks.length - 1; i >= 0; i--) {
      commandLinks[i].addEventListener('click', linkClickHandler);
    }

    for (j = commandExecuteButtons.length - 1; j >= 0; j--) {
      commandExecuteButtons[j].addEventListener('click', buttonClickHandler);
    }

  });

})();
