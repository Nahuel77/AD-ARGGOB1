import pandas as pd

def data_process(data):
    df = pd.DataFrame(data)
    #df_data = pd.json_normalize(df['data'])
    #df = pd.concat([df, df_data], axis=1)
    num_reg = df.shape[0]
    print(num_reg)
    return df