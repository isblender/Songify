from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import requests
from io import BytesIO
import anthropic

# Load BLIP model and processor
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

def get_image_caption(image_url):
    # Download the image
    response = requests.get(image_url)
    image = Image.open(BytesIO(response.content))

    # Prepare the image for the model
    inputs = processor(images=image, return_tensors="pt")

    # Generate a caption
    caption_ids = model.generate(**inputs)
    caption = processor.decode(caption_ids[0], skip_special_tokens=True)
    return caption

# Example usage
caption = get_image_caption("https://image-to-song.s3.us-east-2.amazonaws.com/673166070c6dc3222c678157/1731905943389.jpg")
print(caption)