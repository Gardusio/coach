from flask import Flask
from coach.utils import *
from coach.prompts.routes import prompts_bp
from coach.recommendations.routes import recommendations_bp
from coach.users.routes import users_bp
from coach.chats.routes import chats_bp


import flask_cors


app = Flask(__name__)
flask_cors.CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.register_blueprint(prompts_bp, url_prefix="/settings")
app.register_blueprint(recommendations_bp, url_prefix="/coach")
app.register_blueprint(users_bp, url_prefix="/users")
app.register_blueprint(chats_bp, url_prefix="/chats")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
