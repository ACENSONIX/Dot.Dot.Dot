from skimage.metrics import structural_similarity
import cv2
from PIL import Image
import requests
# Idhar hagg raha hai
# kya error aa raha hai?file nahi mil rahi kya?
# haa file nahi mil raha absolute path kaise dhundhu
# acha ye chod mereko bata ye function verify kaise kar raha hai? mereko function dikha

# og = cv2.imread(r"/home/sahil/Desktop/Dot.Dot.Dot/ML/facematch/static/submitted/original.jpg")
# tampered = cv2.imread(r"/home/sahil/Desktop/Dot.Dot.Dot/ML/facematch/static/submitted/tampered.png")
# tampered_gray = cv2.cvtColor(tampered, cv2.COLOR_BGR2GRAY)
# original_gray = cv2.cvtColor(og, cv2.COLOR_BGR2GRAY)

class Tam:
  def tampered(self,original_gray,tampered_gray):
    # print(tampered_gray.size)
    # print(original_gray.size)
    (score, diff) = structural_similarity(original_gray, tampered_gray, full=True)
    diff = (diff * 255).astype("uint8")
    print(score,diff)
    accept = "The given pan card is original"
    reject = "The given pan card is tampered"
    print(score)
    if score >= 0.8:
      return accept
    else:
      return reject
 
#  structural_similarity ???? cosine similarity sunna hai nahaa haa malum hai 
# arre cosine similarity jaise hi image similarity check karne use hota hai

# print(x)
