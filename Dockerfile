FROM node:6-slim
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install -g forever
ADD . /deploy/
WORKDIR /deploy
RUN npm install && npm run build
CMD forever --spinSleepTime 5000 --fifo server.js
