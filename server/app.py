from models import *
from services import *

@app.route('/')
def index():
    return 'Hello, from the backend'

@app.route('/gratitudes', methods=['GET'])
def get_gratitudes():
    gratitudes = Gratitude.query.all()
    return jsonify([{'name': gratitude.name, 'location': gratitude.location, 'message': gratitude.message} for gratitude in gratitudes])

@app.route('/gratitudes', methods=['POST'])
def add_gratitude():
    data = request.get_json()
    name = data.get('name')
    location = data.get('location')
    message = data.get('message')
    
    print(f"Received data: name={name}, location={location}, message={message}")
    
    if not name or not location or not message:
        return jsonify({'error': 'Missing required fields'}), 400
    
    new_gratitude = Gratitude(name=name, location=location, message=message)
    db.session.add(new_gratitude)
    db.session.commit()
    
    print("Gratitude added successfully")
    return jsonify({'message': 'Gratitude added successfully'}), 201

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)