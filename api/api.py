
import uuid
from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
import requests
import secrets 

#####################
###API REALISATION###
#####################
import chatgpt as ch
import gemini as gm
import deepl as dp
import news as nw
####################


app = Flask(__name__)


app.config['JWT_SECRET_KEY'] = secrets.token_hex(32)

bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app, resources={r"/*": {"origins": "*"}})

# Имитация базы данных
users = {
    "admin": {
        "userId": "1",
        "userName": 'USER ADMIN',
        "password": bcrypt.generate_password_hash("user123").decode('utf-8'),  # Пароль: admin123
        "role": "admin"
    },
    "user1": {
        "userId": "2",
        "userName": 'USER USER1',
        "password": bcrypt.generate_password_hash("user123").decode('utf-8'),  # Пароль: user123
        "role": "user"
    },
}

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    if email in users:
        return jsonify({"message": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user_id = str(uuid.uuid4())
    users[email] = {'userId': user_id,'userName': email, 'password': hashed_password}

    return jsonify({"userId": user_id,"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = users.get(email)
    if not user or not bcrypt.check_password_hash(user['password'], password):
        return jsonify({"message": "Invalid email or password"}), 401
    userId = user['userId']
    userName = user['userName']
    access_token = create_access_token(identity=email)
    return jsonify({"userId":userId,'userName':userName,"access_token": access_token}), 200


@app.route('/gemini', methods=['POST'])
@jwt_required()
def gemini():
    data = request.get_json()
    prompt = data.get("request", "")
    print(data)
    if prompt:
        response = gm.response(prompt)
        return jsonify({"response": response})
    else:
        return jsonify({"error": "No prompt provided"}), 400

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    if(get_jwt_identity()):
        return jsonify({"IsAuth": "YES"}), 200
    else:
        return jsonify({"IsAuth": "NO"}), 400

@app.route('/chat-gpt', methods=['POST'])
@jwt_required()
def chat():
    data = request.get_json()
    prompt = data.get("request", "")
    print(data)
    if prompt:
        response = ch.get_response(prompt)
        return jsonify({"response": response})
    else:
        return jsonify({"error": "No prompt provided"}), 400
    
@app.route('/deepl', methods=['POST'])
@jwt_required()
def deepl():
    data = request.get_json()
    prompt = data.get("text", "")
    source_lang = data.get("source_lang","")
    target_lang = data.get("target_lang", "")
    print(data)
    if prompt:
        response,detected_source_lang = dp.translate_text(prompt,source_lang,target_lang)
        print(response)
        return jsonify({"response": response,"detected_source_lang": detected_source_lang})
    else:
        return jsonify({"error": "No prompt provided"}), 400
    
@app.route('/news', methods=['GET'])
@jwt_required()
def news():
    try:
        raw_data, processed_articles = nw.get_news1()
        return jsonify({
                "status": raw_data.get("status", "error"),
                "totalResults": raw_data.get("totalResults", 0),
                "articles": processed_articles
            })
    except requests.RequestException as e:
        return jsonify({"error": "Failed to fetch news", "details": str(e)}), 500


@app.route('/profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    current_email = get_jwt_identity()
    user = users.get(current_email)
    if user:
        return jsonify({
            'userId': user['userId'],
            'userName': user['userName'],
            'email': current_email
        }), 200
    else:
        return jsonify({"message": "User not found"}), 404


@app.route('/profile', methods=['PUT'])
@jwt_required()
def update_user_profile():
    current_email = get_jwt_identity()
    user = users.get(current_email)
    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.get_json()
    new_email = data.get('email', current_email)
    new_userName = data.get('userName', user['userName'])
    new_password = data.get('password')

    
    if new_email != current_email and new_email in users:
        return jsonify({"message": "Email already in use"}), 400

  
    user['userName'] = new_userName


    if new_password:
        user['password'] = bcrypt.generate_password_hash(new_password).decode('utf-8')

    if new_email != current_email:
        users[new_email] = user
        del users[current_email]
        current_email = new_email 

    return jsonify({"message": "Profile updated successfully"}), 200


@app.route('/profile', methods=['DELETE'])
@jwt_required()
def delete_user_profile():
    user_id = get_jwt_identity()
    user = users.get(user_id)
    if user:
        del users[user_id]
        return jsonify({"message": "Account deleted successfully"}), 200
    else:
        return jsonify({"message": "User not found"}), 404




if __name__ == "__main__":
    app.run(port=5000)
