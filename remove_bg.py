from PIL import Image
import sys

img = Image.open(sys.argv[1])
img = img.convert("RGBA")
datas = img.getdata()

newData = []
for item in datas:
    # If the pixel is very dark (black background), make it transparent
    # but be careful not to make the dark parts of the gold transparent
    if item[0] < 10 and item[1] < 10 and item[2] < 10:
        newData.append((0, 0, 0, 0))
    else:
        newData.append(item)

img.putdata(newData)
img.save(sys.argv[2], "PNG")
