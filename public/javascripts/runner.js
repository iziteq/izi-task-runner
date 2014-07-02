(function () {
  'use strict';

  window.addEventListener('load', function () {

    var i, j,
      socket = io().connect('http://tasks.dev.izi.travel/'),
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
        if (Notification.permission === 'granted') {
          var notification = new Notification(title, {body: text, icon: icon});
          notification.onshow = function () {
            setTimeout(notification.close, 5000);
          };
        }
      }

      if (!('Notification' in window)) {
        console.log('This browser does not support desktop notification');
        return false;
      }

      createNitification();

      if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          if(!('permission' in Notification)) {
            Notification.permission = permission;
          }
          createNitification();
        });
      }
    }

    function formRequest(element) {
      var params = [],
        command = element.dataset.command,
        paramInputs = document.querySelectorAll('input[name^='+command+']');
      for (i = 0; i < paramInputs.length; i++) {
        params.push(paramInputs[i].value);
      }
      if (params.length === 0) {
        params = [''];
      }
      return {
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
          notifyTaskStatus(that.dataset.title + ' - ok!', html.substring(0, 50) + '...', 'succees');
          socket.off(doneEvent);
        });

        socket.on(failEvent, function (data){
          var html = data.errors.replace(/\n/gi, '<br>');
          resultsText.innerHTML = html;
          results.classList.add('error');
          clearViewOnResponse(that, spinner, resultsText);
          notifyTaskStatus(that.dataset.title + ' - error!', html.substring(0, 50) + '...', 'error');
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
