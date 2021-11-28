# Deployment - Docker

<hr>

MAKE SURE YOU RUN `yarn build` BEFORE DEPLOYING THIS APP USING DOCKER

<hr>

### Build container
`docker build -t adventnavyzva-react_image .`

### Run container from image
`docker run --rm --net host -it --name adventnavyzva-react adventnavyzva-react_image`
<br />
If you want to run it in detached mode, add `-d` flag.

#### Output in detached mode
`docker logs adventnavyzva-react`
