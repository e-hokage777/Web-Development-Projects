import os
import torch
import torch.nn as nn
from torchvision.transforms import ToPILImage
import base64


models_path = os.path.join(os.getcwd(), "ml_tools", "utilities", "anime_faces_generator", "models")

latent_size = 150
image_size = 7500
image_dim = (3,50,50)

## creating generator
generator = nn.Sequential(
    nn.Linear(latent_size, 256),
    nn.LeakyReLU(0.2),
    nn.BatchNorm1d(256, momentum=0.7),
    nn.Linear(256, 512),
    nn.LeakyReLU(0.2),
    nn.BatchNorm1d(512, momentum=0.7),
    nn.Linear(512, 1024),
    nn.LeakyReLU(0.2),
    nn.BatchNorm1d(1024, momentum=0.7),
    nn.Linear(1024, image_size),
    nn.Tanh()
)

generator.load_state_dict(torch.load(os.path.join(models_path, "anime_face_generator.tm"), map_location=torch.device('cpu')))

## creating function to rescale data from -1 to 1 to 0 to 1
def img_rescale(img):
    return (img + 1) * 0.5

def genetate_anime_face():
    temp_name = "random_anime_image.png"
    generator.eval()
    generated_image = generator(torch.randn(1, latent_size)).reshape(*image_dim)
    generated_image = img_rescale(generated_image)

    # converting generated image into bytes array
    generated_image = ToPILImage()(generated_image)
    generated_image = base64.b64encode(generated_image.tobytes())

    # adding prefixes for javascript format
    generated_image

    return generated_image