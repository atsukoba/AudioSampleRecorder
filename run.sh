if !(type "pip3" > /dev/null 2>&1); then
  echo "install pip..."
  brew install python
fi

pip3 install -r requirements.txt
echo "Create tmux session for python api"
tmux new-session -d -s python_api 'python3 run.py'

if !(type "jq" > /dev/null 2>&1); then
  echo "install jq..."
  brew install jq
fi

ip=`jq '.ip' config.json`
echo "ip address is: ${ip}"
port=`jq '.port' config.json`
echo "port num is: ${port}"

if !(type "ngrok" > /dev/null 2>&1); then
  echo "install ngrok: exec ngrok-install.sh"
else
  # eval "ngrok http https://${ip}:${port}"
  echo "Create tmux session for ngrok"
  tmux new-session -d -s ngrok "ngrok http https://${ip}:${port}"
fi

while [$(curl -LI ${ip}:4040 -o /dev/null -w '%{http_code}\n' -s) != 200]
  do
    sleep 1000
  done

url=$(eval "curl ${ip}:4040/api/tunnels  | jq '.tunnels[0].public_url'")

echo "URL is ${url}"
python3 -c "import qr; qr.generate(${url})..."

sleep 1000
tmux a -t ngrok
