# IZI tasks runner

![alt text](http://habrastorage.org/files/726/e16/b51/726e16b51e2c4b0793ef115fe6f79659.png "IZI tasks runner")

## Deployment

```
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update && sudo apt-get install nodejs

git clone git@github.com:pomahtuk/izi-task-runner.git

cd ./izi-task-runner && sudo npm install

sudo npm i -g forever

forever start -w ./bin/www
```

## Configure tasks

Tasks can be set and configurured using `./config/config.js`

Example of command description:

```
task_name: {
  title: 'Directory listing',
  description: 'List all files in directory in which command was executed. Has optional command-line string argument.',
  cmd: 'ls {0}',
  params: [
    {
      default: '-la',
      title: 'Command line arguments'
    }
  ]
},
```

Where `task_name` is a JS object containing all iformation about task:

| Param | Description |
| ------------- |-------------|
| title | Will be displayed as link in interface|
| description | Detailed information about task which will be shown once task link clicked|
| cmd | Command, which will be executed in console. Usually can be found in crontab. All params will be put in corresponding placeholders - like `{0}`. Where numbers corresponds to array index|
| params | JS array containing all params for the task|

Each param has two properties:

| Param | Description |
| ------------- |-------------|
| default | Default value for param|
| title | Field title in interface|

