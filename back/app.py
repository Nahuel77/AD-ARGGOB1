from flask import Flask, jsonify
from app.scripts.dataAPI import get_data
from app.scripts.data_process import data_process

app = Flask(__name__)

@app.route('/')
def home():
    data = get_data()
    df_process = data_process(data)
    print(df_process)
    return jsonify(data)

#data = get_data()
#df_process = data_process(data)

if __name__ == '__main__':
    app.run(debug=True)