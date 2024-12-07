import pandas as pd

#Nota: se recorren los años con un for -> i=0, range(9), siendo 9 la cantidad de años. Desde 2017 al 2025 actualmente
#Cambiar luego con una funcion que cuente la cantidad de años distintos en los datos
#La Api se ira actualizando agregando años.

def data_project_year(data):
    df = pd.DataFrame(data)
    years = []
    for i in range(9):
        filter_xyears = df.loc[df["fiscal_year"] == (2017+i)]
        unique_projects = filter_xyears["project_id"].nunique()
        years.append({"fiscal_year": (2017+i), "num_reg": unique_projects})
    return years

def data_funds_year(data):
    df = pd.DataFrame(data)
    funds_by_year = df.groupby('fiscal_year')['supplier_contract_amount_usd'].sum().reset_index()
    years = funds_by_year.to_dict(orient='records')
    return years