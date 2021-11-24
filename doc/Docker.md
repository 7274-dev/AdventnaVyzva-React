# Adventna Vyzva React

<hr>

MAKE SURE YOU RUN `yarn build` BEFORE DEPLOYING THIS APP

<hr>

### Build container
`docker build -t adventnavyzva-react_image .`

### Run container from image
`docker run --rm --net host -it -p 80:80 --name adventnavyzva-react adventnavyzva-react_image`
<br />
If you want to run it in detached mode, add `-d` flag.

#### Output
If you ran docker container in detached mode, use `docker logs adventnavyzva-react` to see logs
