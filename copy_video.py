import shutil
import sys

src = sys.argv[1]
dst = sys.argv[2]
shutil.copy2(src, dst)
print("Copy successful")
