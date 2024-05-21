from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

app.debug = True

# Adding configuration for using a MySQL database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Unitario321@localhost:3306/fullstack_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Creating an SQLAlchemy instance
db = SQLAlchemy(app)

# Models
class Profile(db.Model):
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    nome = db.Column(db.String(20), nullable=False)
    endereco = db.Column(db.String(50), nullable=False)
    telefone = db.Column(db.String(20), nullable=False)

# Function to render index page
@app.route('/')
def index():
    return "Servidor no ar"

@app.route('/api/profiles', methods=['GET'])
def get_profiles():
    profiles = Profile.query.all()
    profiles_list = [{'id': profile.id, 'nome': profile.nome, 'endereco': profile.endereco, 'telefone': profile.telefone} for profile in profiles]
    return jsonify({'profiles': profiles_list})

@app.route('/api/profiles', methods=['POST'])
def add_profile():
    data = request.get_json()
    new_profile = Profile(nome=data['nome'], endereco=data['endereco'], telefone=data['telefone'])
    db.session.add(new_profile)
    db.session.commit()
    return jsonify({'id': new_profile.id, 'nome': new_profile.nome, 'endereco': new_profile.endereco, 'telefone': new_profile.telefone})

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=5050)
