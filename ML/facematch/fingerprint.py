import cv2
import numpy as np
img1 = cv2.imread(r"C:\Users\ARYAN\Desktop\loc\backend\static\submitted\test1.bmp")
img2 = cv2.imread(r"C:\Users\ARYAN\Desktop\loc\backend\static\submitted\test1match.bmp")
img3 = cv2.imread(r"C:\Users\ARYAN\Desktop\loc\backend\static\submitted\test2.bmp")
destination_image = cv2.absdiff(img1, img2)
destination_image1 = cv2.absdiff(img1, img3)
#print((destination_image))
# print((destination_image1))
all_zeros = not np.any(destination_image1)
print(all_zeros)