from models import *
from services import *

def seed_gratitude():
    gratitudes = [
        "I am grateful for the support of my family and friends.",
        "I appreciate the beauty of nature around me.",
        "I am thankful for the opportunities to learn and grow.",
        "I am grateful for my health and well-being.",
        "I appreciate the kindness of strangers.",
        "I am thankful for the comfort of my home.",
        "I am grateful for the experiences that have shaped me.",
        "I appreciate the love and companionship of my pets.",
        "I am thankful for the peace and quiet of the early morning.",
        "I am grateful for the ability to pursue my passions."
    ]

    for gratitude_sentence in gratitudes:
        new_gratitude = Gratitude(message=gratitude_sentence)
        db.session.add(new_gratitude)

    db.session.commit()
    print("Gratitude sentences inserted successfully")

if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()
        seed_gratitude()
