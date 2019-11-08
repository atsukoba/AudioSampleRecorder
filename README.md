# AudioSampleRecorder

Audio recording on the Web using Web Audio API for remote real-time environmental sound collection.

![animation screenshot](https://i.gyazo.com/6825cb4c65c8d1c4e7f8f7a3a6a357d4.gif)

## packages/dependencies

- python3 and packages listed in `requirements.txt`
- nodejs and packages listed in `package.json`
- tmux
- ngrok
- [recorder-js](https://www.npmjs.com/package/recorder-js)

## setup

```shell
git clone -r https://github.com/atsukoba/AudioSampleRecorder.git
npm install
sh ngrok-install.sh
```

then put your ngrok auth-token

## run

if using `pip` and `HomeBrew`, run this prepared script. if NOT, rewrite the script suitably (e.g. `pip` -> `conda`, `brew` -> `apt-get`).

```shell
bash run.sh
```

when do not use tmux sessions, build a server, make a tunnel and generate qr code manually.

```shell
gunicorn service.app:app -b :YOUR_PORT_NUMBER
```

```shell
ngrok http http://127.0.0.1:YOUR_PORT_NUMBER
```

```shell
python -c "import qr; qr.generate(NGROK_DISTRIBUTED_URL)"
```

share and access generated QR code !

## sounds

`.wav` files are saved in `sounds/`

sound file path will be sent as osc message (to address `/`)

## settings

edit settings (`config.json`) suitably.

```javascript
{
    "ip" : "127.0.0.1",
    "port" : 8888, // listening port number
    "debug" : true,
    "talking": false, // toggle talking mode
    "workers": 2, // gunicorn worker for server
    "use-osc": true, // send osc message when receive the sound
    "osc-port": 5050 // osc poert number
}
```

## develop

front-end dev

```shell
npm run watch
```

check Python flask process

```shell
tmux a -t
```

## UI design

<https://www.figma.com/file/nRi4YNe3WGXpCxocEcpN35/x-sampling-recorder?node-id=0%3A1>
