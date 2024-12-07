from flask import Flask, request, jsonify
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import requests
from io import BytesIO
import openai

# Initialize Flask app
app = Flask(__name__)

# Load BLIP model and processor
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base", low_cpu_mem_usage=True)
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
openai.api_key = "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"

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
        caption_ids = model.generate(**inputs, num_beams=3, max_length=20)
        caption = processor.decode(caption_ids[0], skip_special_tokens=True)
        chat_prompt = (
            f"I have an image captioned as follows: '{caption}'. "
            "Please recommend a song whose vibe or lyrics best match this description, "
            "and respond strictly in the format: 'Song Title - Artist'"
        )
        chatgpt_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Use the desired model, such as "gpt-4" or "gpt-3.5-turbo"
            messages=[
                {"role": "system", "content": "You are an assistant providing detailed image descriptions."},
                {"role": "user", "content": chat_prompt}
            ]
        )

        chatgpt_reply = chatgpt_response['choices'][0]['message']['content']
        return jsonify({"caption": caption, "chatgpt_response": chatgpt_reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)