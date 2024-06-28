from models import *
from services import *

@app.route('/')
def index():
    return 'Hello, from the backend'

@app.route('/gratitudes', methods=['GET'])
def get_gratitudes():
    gratitudes = Gratitude.query.all()
    return jsonify([gratitude.message for gratitude in gratitudes])

@app.route('/gratitudes', methods=['POST'])
def add_gratitude():
    data = request.get_json()
    new_gratitude = Gratitude(message=data['message'])
    db.session.add(new_gratitude)
    db.session.commit()
    return jsonify({'message': 'Gratitude added successfully'}), 201

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)