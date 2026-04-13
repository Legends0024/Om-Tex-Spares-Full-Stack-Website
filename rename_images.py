import os

img_dir = r"c:\Users\manav\DBMS PROJECT\omtexspares\frontend\public\images\products"
if not os.path.exists(img_dir):
    print(f"Error: {img_dir} does not exist")
    exit(1)

files = [f for f in os.listdir(img_dir) if os.path.isfile(os.path.join(img_dir, f))]
# Sort them to keep the same order as before
files.sort()

print(f"Found {len(files)} files. Renaming...")

for i, filename in enumerate(files, start=1):
    old_path = os.path.join(img_dir, filename)
    new_name = f"p{i}.png"
    new_path = os.path.join(img_dir, new_name)
    
    try:
        os.rename(old_path, new_path)
        print(f"Renamed: {filename} -> {new_name}")
    except Exception as e:
        print(f"Failed to rename {filename}: {e}")

print("Done!")
