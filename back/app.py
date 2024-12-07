from flask import Flask, jsonify
from flask_cors import CORS
from app.scripts.dataAPI import get_data
from app.scripts.data_process import data_project_year, data_funds_year

app = Flask(__name__)
CORS(app)

@app.route('/dataGET', methods=['GET'])
def dataPOST():
    raw_data = get_data()
    df_project_year = data_project_year(raw_data)
    df_founds_year = data_funds_year(raw_data)
    #print(df_process)
    return jsonify({
        'projects': df_project_year,
        'funds': df_founds_year
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)