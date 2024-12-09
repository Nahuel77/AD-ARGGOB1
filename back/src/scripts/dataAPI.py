import requests

urlfst = 'https://datacatalogapi.worldbank.org/dexapps/fone/api/view?viewId=DS01129&top=1000&type=json'
urlscd = 'https://datacatalogapi.worldbank.org/dexapps/fone/api/view?viewId=DS01129&top=1000&skip=1000&type=json'
urltrh = 'https://datacatalogapi.worldbank.org/dexapps/fone/api/view?viewId=DS01129&top=1000&skip=2000&type=json'
urlfrt = 'https://datacatalogapi.worldbank.org/dexapps/fone/api/view?viewId=DS01129&top=1000&skip=3000&type=json'
urlfft = 'https://datacatalogapi.worldbank.org/dexapps/fone/api/view?viewId=DS01129&top=1000&skip=4000&type=json'

def get_data():
    urls = [urlfst, urlscd, urltrh, urlfrt, urlfft]
    all_data = []
    for url in urls:
        try:
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()
            if 'data' in data:
                #num_records = len(data['data'])
                #print(f"Registros obtenidos: {num_records}")
                all_data.extend(data['data'])
            else:
                print(f"Advertencia: no se encontró 'data' en la respuesta de {url}")
        except requests.RequestException as e:
            print(f'Error: {e}')
    print(f"Total de registros obtenidos: {len(all_data)}")
    return all_data