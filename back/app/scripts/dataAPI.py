import requests
url = 'https://datacatalogapi.worldbank.org/dexapps/fone/api/view?viewId=DS01129&top=100&type=json'

def call():
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        print(data)
        return data
    except requests.RequestException as e:
        print(f'Error: {e}')