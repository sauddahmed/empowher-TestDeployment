from flask import Flask, render_template, request, jsonify
import base64
import cv2
import numpy as np

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')  # Serve the main HTML page

@app.route('/process_frame', methods=['POST'])
def process_frame():
    data = request.json
    image_data = data['image']
    
    # Decode the base64 image
    header, encoded = image_data.split(',', 1)
    img_data = base64.b64decode(encoded)

    # Convert image data to a NumPy array
    nparr = np.frombuffer(img_data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Process the image using OpenCV (e.g., pose detection)
    # ...

    return jsonify({"status": "success"})

if __name__ == '__main__':
    app.run(debug=True)
