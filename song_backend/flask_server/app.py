from flask import Flask, request, jsonify
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import requests
from io import BytesIO

# Initialize Flask app
app = Flask(__name__)

# Load BLIP model and processor
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

# Define a route for generating image captions
@app.route('/generate_caption', methods=['POST'])
def generate_caption():
    try:
        # Get the image URL from the request
        data = request.get_json()
        image_url = data.get("image_url")

        if not image_url:
            return jsonify({"error": "Image URL is required"}), 400

        # Download and process the image
        response = requests.get(image_url)
        image = Image.open(BytesIO(response.content))
        inputs = processor(images=image, return_tensors="pt")

        # Generate a caption
        caption_ids = model.generate(**inputs)
        caption = processor.decode(caption_ids[0], skip_special_tokens=True)

        return jsonify({"caption": caption})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)