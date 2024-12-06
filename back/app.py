from flask import Flask, jsonify
from app.scripts.dataAPI import call

app = Flask(__name__)

@app.route('/')
def home():
    data = call()
    return jsonify(data)

def datacall():
    data=call()
    return f'data'

if __name__ == '__main__':
    app.run(debug=True)