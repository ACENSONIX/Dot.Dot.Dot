import cv2
from deepface import DeepFace

verification = DeepFace.verify(img1_path = r"C:\Users\ARYAN\Desktop\loc\backend\static\submitted\left.jpg", img2_path = r"C:\Users\ARYAN\Desktop\loc\backend\static\submitted\testface.jpg")
x = verification['verified']
print(x)
