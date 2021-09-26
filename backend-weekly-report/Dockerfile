FROM node

RUN mkdir backend-weekly-report

WORKDIR /backend-weekly-report

COPY  . ./

RUN npm i

ENTRYPOINT [ "node", "app.js" ]

