const { DEV, VITE_LOCAL } = import.meta.env

//import {  makeId } from '../util.service'

import { carService as local } from './car.service.local'
import { carService as remote } from './car.service.remote'

function getEmptyCar() {
	return {
		msgs: [],
	}
}

function getDefaultFilter() {
    return {
        txt: '',
        sortField: '',
        sortDir: '',
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const carService = { getEmptyCar, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.carService = carService
