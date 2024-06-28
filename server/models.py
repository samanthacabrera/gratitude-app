from services import * 

class Gratitude(db.Model, SerializerMixin):
    __tablename__ = 'gratitudes'
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(100), nullable=False)

    def __init__(self, message):
        self.message = message