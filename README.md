# Weather back

## Antes de ejecutar
Instalar:
```
npm i
```
Configurar las variables de entorno:
```
IP_API_URL = <url de ip-api>
WEATHER_URL = <url de Open Weather Map>
BASE_ROUTE = <ruta base>
WEATHER_API_KEY = <api key de Open Weather Map>
PORT = <puerto de la api>
```

## Para ejecutar
Utilizar los siguientes comandos:
```
// Ejecutar:
npm start

// Correr pruebas:
npm test
// .. con covertura:
npm run test:cover

// Revisión con Eslint:
npm run eslint
```

## API
Los siguientes son los endpoints de la aplicación:
### /v1
Ruta base.
### /v1/openapi
Muestra la documentación de la API.
### /location
Devuelve los datos de ubicación city según ip-api.
### /current(/city)
City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según ip- api y el estado del tiempo actual.
### /forcast(/city)
City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según ip-api y el estado del tiempo a 5 días.