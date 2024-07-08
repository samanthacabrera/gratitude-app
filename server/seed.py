from models import *
from services import *

def seed_gratitude_logs():
    logs = [
        {"name": "Blair", "location": "New York", "message": "I am thankful for the opportunities to learn and grow."},
        {"name": "Serena", "location": "Boston", "message": "I appreciate the kindness of strangers."},
    ]

    for log in logs:
        new_gratitude = Gratitude(name=log["name"], location=log["location"], message=log["message"])
        db.session.add(new_gratitude)

    db.session.commit()
    print("Gratitude logs inserted successfully")

if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()
        seed_gratitude_logs()
