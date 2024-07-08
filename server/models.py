from services import * 

class Gratitude(db.Model, SerializerMixin):
    __tablename__ = 'gratitudes'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20),nullable=False)
    location = db.Column(db.String(20),nullable=False)
    message = db.Column(db.String(100), nullable=False)

    def __init__(self, name, location, message):
        self.name = name
        self.location = location
        self.message = message