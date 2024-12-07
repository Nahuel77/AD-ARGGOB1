import pandas as pd

def data_process_xyears(data):
    df = pd.DataFrame(data)
    years = []
    for i in range(9):
        filter_xyears = df.loc[df["fiscal_year"] == (2017+i)]
        unique_projects = filter_xyears["project_id"].nunique()
        years.append({"fiscal_year": (2017+i), "num_reg": unique_projects})
    return years