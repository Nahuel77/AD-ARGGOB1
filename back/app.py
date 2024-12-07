from flask import Flask, jsonify
from flask_cors import CORS
from app.scripts.dataAPI import get_data
from app.scripts.data_process import data_process_xyears

app = Flask(__name__)
CORS(app)

@app.route('/dataGET', methods=['GET'])
def dataPOST():
    raw_data = get_data()
    df_process = data_process_xyears(raw_data)
    #print(df_process)
    return jsonify(df_process)

if __name__ == '__main__':
    app.run(debug=True, port=5000)