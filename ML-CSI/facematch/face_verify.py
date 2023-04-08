import cv2  
from deepface import DeepFace
from cv2 import *

def face(img):
    h, w, channels = img.shape
    half = w//2
    left_part = img[:, :half]
    right_part = img[:, half:] 
    cv2.imwrite('left.jpg', left_part)
    cv2.imwrite('right.jpg', right_part)
    verification = DeepFace.verify(img1_path = r"right.jpg", img2_path = r"left.jpg")
    x = verification['verified']
    return x


