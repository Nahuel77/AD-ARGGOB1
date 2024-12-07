import pandas as pd

def data_process_xyears(data):
    df = pd.DataFrame(data)
    years = []
    for i in range(9):
        filter_xyears = df.loc[df["fiscal_year"] == (2017+i)]
        num_reg = filter_xyears.shape[0]
        years.append(num_reg)
    return years