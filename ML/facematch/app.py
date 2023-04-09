import cv2 
from deepface import DeepFace
from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
import os
import numpy as np
import keras
import keras.utils as image 
from face_verify import face
from pancard import Tam
import numpy as np
import pytesseract
import matplotlib.pyplot as plt
import pandas as pd
from PIL import Image
import string
import re
from aadhaar.secure_qr import extract_data
import xmltodict
import json

# import cv2
# from pyzbar.pyzbar import decode
# from pyaadhaar.utils import isSecureQr
# from pyaadhaar.deocde import AadhaarSecureQr
# important: set the path to your tesseract.exe file
pytesseract.pytesseract.tesseract_cmd = r"C:/Program Files/Tesseract-OCR/tesseract.exe"

UPLOAD_FOLDER = os.getcwd()+'/static/submitted'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg','.bmp'])
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
@app.route('/')
def web():
    return render_template("index.html")

@app.route('/YOLO')
def web1():
    return render_template("newRedirect.html")


@app.route('/aadharfaceverification', methods=['POST'])
def home():
    if request.method == 'POST':
        # Getting image and checking for method
        img = request.files['image']
        if img:
            img_loc = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(img.filename))
            img.save(img_loc)
            # test_image = image.load_img(img_loc, target_size=(64, 64))
            # test_image = image.img_to_array(test_image)
            # test_image = np.expand_dims(test_image, axis=0) 
            test_image = './static/submitted/' + secure_filename(img.filename)
            y = cv2.imread(test_image)
            x = face(y)
            # print(x)

        
        return jsonify({"response" : str(x)});

@app.route('/aadharocr', methods=['POST'])
def home2():
    if request.method == 'POST':
        # Getting image and checking for method
        img = request.files['image']
        if img:
        #   img_loc = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(img.filename))
        #   img.save(img_loc)
        #   test_image = './static/submitted/' + secure_filename(img.filename)
        #   y = cv2.imread(test_image)
          img = cv2.imread(r"C:\Users\ARYAN\Desktop\loc\backend\static\submitted\front.jpg")
          crop_img = img[100:250,250:550] #enter image here
          gray = cv2.cvtColor(crop_img, cv2.COLOR_BGR2GRAY)
          th, threshed = cv2.threshold(gray, 127,255, cv2.THRESH_BINARY)
          text2 = pytesseract.image_to_string(threshed) 
          text2 = re.sub(r'[^\w\s]', '', text2) 
          list1 = text2.split()
          fname = list1[0]
          mname = list1[1]
          lname = list1[2]
          bdate = list1[(list1.index("BirthDOB") + 1)]
          gender = list1[(list1.index("BirthDOB") + 2)]
          bday = bdate[:2] + '/' + bdate[2:4]+ '/' + bdate[4:]
          query = {'firstname':fname,'middlename':mname,'lastname':lname,'bday':bday,'gender':gender}
        
        return jsonify({"response":query})

@app.route('/fakepan', methods=['POST'])
def home3():
    if request.method == 'POST':
        # Getting image and checking for method
        img = request.files['image']
        if img:
            img_loc = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(img.filename))
            img.save(img_loc)
            # test_image = image.load_img(img_loc, target_size=(64, 64))
            # test_image = image.img_to_array(test_image)
            # test_image = np.expand_dims(test_image, axis=0) 
            test_image = './static/submitted/' + secure_filename(img.filename)
            tampered = cv2.imread(test_image)
            
            # tampered = cv2.resize(tampered,(250,160))
            # cv2.imwrite()
            
            og = cv2.imread(r"/home/sahil/Desktop/Dot.Dot.Dot/ML/facematch/static/submitted/PanCard.jpg")
            # h, w, channels = og.shape
            # print(h,w)
            tampered_gray = cv2.cvtColor(tampered, cv2.COLOR_BGR2GRAY)
            original_gray = cv2.cvtColor(og, cv2.COLOR_BGR2GRAY)
            func = Tam()
            x = func.tampered(original_gray,tampered_gray)
        
        return jsonify({"response":x})
 
@app.route('/fingerprint', methods=['POST'])
def home4():
    if request.method == 'POST':
        # Getting image and checking for method
        img = request.files['image']
        if img:
            img_loc = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(img.filename))
            img.save(img_loc)
            img1 = cv2.imread(r"C:\Users\ARYAN\Desktop\loc\backend\static\submitted\test1.bmp")
            test_image = './static/submitted/' + secure_filename(img.filename)
            img2 = cv2.imread(test_image)
            destination_image = cv2.absdiff(img1, img2)
            match = "Fingerprints Matched!"
            unmatch = "Fingerprints Not Matched!"
            all_zeros = not np.any(destination_image)
            if all_zeros == True:
                x = match
            if all_zeros == False:
                x = unmatch
        
        return jsonify({"response":x})

@app.route('/face', methods=['POST'])
def home5():
    if request.method == 'POST':
        # Getting image and checking for method
        img = request.files['image']
        img1 = request.files['image1']
        if img:
            img_loc = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(img.filename))
            img.save(img_loc)
            img1_loc = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(img.filename))
            img1.save(img1_loc)

            # test_image = image.load_img(img_loc, target_size=(64, 64))
            # test_image = image.img_to_array(test_image)
            # test_image = np.expand_dims(test_image, axis=0) 
            test_image = './static/submitted/' + secure_filename(img.filename)
            test1_image = './static/submitted/' + secure_filename(img1.filename)

            verification = DeepFace.verify(img1_path = test_image, img2_path = test1_image);
            x = verification['verified']
            print(x)

        return jsonify({"response":"true"})

@app.route("/verify", methods=["POST"])
def verify():
    try:
        file = request.files['image']
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        dfs = DeepFace.find(img_path=file_path,db_path="/home/sahil/Documents/Dot.Dot.Dot/public/user/face",model_name="Facenet512",distance_metric="euclidean_l2")
        print(type(dfs))
        # print(len(dfs))
        res =  str(dfs[0].iloc[0]['identity'])
    

        return jsonify({"response":res})
    except Exception as e:
        print(e)
        return jsonify({"msg":"An error has occured"})



@app.route("/verify-aadhar", methods=["POST"])
def verifyAadhar():
    img = request.files['image']
    if img:
        img_loc = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(img.filename))
        img.save(img_loc)
        test_image = './static/submitted/' + secure_filename(img.filename)
        tampered = cv2.imread(test_image)
    
    
    detect = cv2.QRCodeDetector()
    value, points, straight_qrcode = detect.detectAndDecode(tampered)
    xml_dict = xmltodict.parse(value)

# convert the dictionary to a JSON object
    json_data = json.dumps(xml_dict)

# print the JSON data
    print(json_data)
    # print(value)
    # data = int(value)
    
    # received_qr_code_data = 12345678
    # extracted_data = extract_data(data)
    # print(extracted_data.to_dict())

    # aadhar = jsonify()
    


    return jsonify({"msg":json_data})