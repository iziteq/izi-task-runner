izi-task-runner
===============

izi-task-runner

sudo add-apt-repository ppa:chris-lea/node.js 
sudo apt-get update && sudo apt-get install nodejs

git clone git@github.com:pomahtuk/izi-task-runner.git

cd ./izi-task-runner && sudo npm install

sudo npm i -g forever

forever start -w ./bin/www
