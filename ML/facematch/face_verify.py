import cv2  
from deepface import DeepFace
from cv2 import *

def face(img):
    h, w, channels = img.shape
    print(h,w)
    half = w//2
    left_part = img[:, :half]
    right_part = img[:, half:] 
    cv2.imwrite('/home/sahil/Desktop/Dot.Dot.Dot/ML/facematch/static/submitted/left.jpg', left_part)
    cv2.imwrite('/home/sahil/Desktop/Dot.Dot.Dot/ML/facematch/static/submitted/right.jpg', right_part)
    print("reached here")
    verification = DeepFace.verify(img1_path = r"right.jpg", img2_path = r"right.jpg")
    x = verification['verified']
    print(x)
    return x


