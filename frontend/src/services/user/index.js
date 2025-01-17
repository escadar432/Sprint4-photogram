const { DEV, VITE_LOCAL } = import.meta.env

import { storyService as local } from './story.service.local'
import { storyService as remote } from './story.service.remote'

function getEmptyStory() {
    return {
        storyname: '', 
        password: '', 
        fullname: '',
        isAdmin: false,
        score: 100,
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const storyService = { ...service, getEmptyStory }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if(DEV) window.storyService = storyService