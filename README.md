# Image-to-Song App

This is the full-stack implementation for an **Image-to-Song** iOS app, which allows users to take a picture and then receive a song that resembles the vibe and content of the image. The backend is built with **Node.js** and **Express**, and it uses **MongoDB and AWS S3** for user data management and storage of image history and song recommendations. The frontend is built with React Native.
Although I didn't end up getting the song reccomendation algorithm deployed due to costs, it is a dockerized pipeline that utilizes a pretrained BLIP image-captioning model fed into OpenAI's ChatGPT 4 to reccomend a song.
## Features

- **Image Processing**: Receives image data from the iOS app for processing to generate song recommendations.
- **Song Recommendation**: Uses an algorithm to analyze the image and recommend a song that reflects the visual qualities of the image.
- **User Management**: Supports user data storage via MongoDB and AWS S3, including user authentication and personalized history of images and song responses.
- **Image and Song History**: Stores each user’s image-to-song history for easy retrieval and future reference.
