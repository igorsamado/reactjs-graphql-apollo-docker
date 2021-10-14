FROM node:14
WORKDIR /
COPY . /

RUN yarn
RUN yarn prisma generate
RUN yarn prisma db seed

EXPOSE 4000