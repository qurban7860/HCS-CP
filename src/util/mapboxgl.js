import * as workerURL from 'mapbox-gl/dist/mapbox-gl-csp-worker'
const worker = new Worker(workerURL)
mapboxgl.workerClass = worker
