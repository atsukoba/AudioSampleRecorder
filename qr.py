import qrcode


def generate(url):
    if url[4] == "s":
        print("QR will be made with `https` url")
        url = "https" + url[4:]
    img = qrcode.make(url)
    print("Generating QR Code...")
    img.show()
