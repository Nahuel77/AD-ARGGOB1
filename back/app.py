from flask import Flask, jsonify
from flask_cors import CORS
from src.scripts.dataAPI import get_data
from src.scripts.data_process import data_project_year, data_funds_year, data_practice_cate, data_practice_funds

app=Flask(__name__)
CORS(app, origins=[
    "https://ad-arggob1.netlify.app",  # Frontend
    "http://www.uptimerobot.com"  # Reloj que evita que se muera (inactividad del plan gratuito) Render
])

@app.route('/dataGET', methods=['GET'])
def dataPOST():
    raw_data = get_data()
    df_project_year = data_project_year(raw_data)
    df_funds_year = data_funds_year(raw_data)
    df_practice_cate = data_practice_cate(raw_data)
    df_practice_funds = data_practice_funds(raw_data)
    #print(df_process)
    return jsonify({
        'projects': df_project_year,
        'funds': df_funds_year,
        'practice': df_practice_cate,
        'practice_f': df_practice_funds,
    })

if __name__ == '__main__':
    app.run()
