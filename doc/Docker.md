# Adventna Vyzva React

<hr>

### Build container
`sudo -S docker build -t adventnavyzva-react_image .`

### Run container from image
`sudo -S docker run --rm --net host -it adventnavyzva-react_image`
<br />
If you want to run it in detached mode, add `-d` flag.

#### Output
If you ran docker container in detached mode, use `sudo -S docker logs adventnavyzva-react` to see logs
