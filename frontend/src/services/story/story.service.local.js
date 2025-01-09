import { storageService } from '../async-storage.service'

const STORAGE_KEY_LOGGEDIN_STORY = 'loggedinStory'

export const storyService = {
    login,
    logout,
    signup,
    getStorys,
    getById,
    remove,
    update,
    getLoggedinStory,
    saveLoggedinStory,
}

async function getStorys() {
    const storys = await storageService.query('story')
    return storys.map(story => {
        delete story.password
        return story
    })
}

async function getById(storyId) {
    return await storageService.get('story', storyId)
}

function remove(storyId) {
    return storageService.remove('story', storyId)
}

async function update({ _id, score }) {
    const story = await storageService.get('story', _id)
    story.score = score
    await storageService.put('story', story)

	// When admin updates other story's details, do not update loggedinStory
    const loggedinStory = getLoggedinStory()
    if (loggedinStory._id === story._id) saveLoggedinStory(story)

    return story
}

async function login(storyCred) {
    const storys = await storageService.query('story')
    const story = storys.find(story => story.storyname === storyCred.storyname)

    if (story) return saveLoggedinStory(story)
}

async function signup(storyCred) {
    if (!storyCred.imgUrl) storyCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    storyCred.score = 10000

    const story = await storageService.post('story', storyCred)
    return saveLoggedinStory(story)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_STORY)
}

function getLoggedinStory() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_STORY))
}

function saveLoggedinStory(story) {
	story = { 
        _id: story._id, 
        fullname: story.fullname, 
        imgUrl: story.imgUrl, 
        score: story.score, 
        isAdmin: story.isAdmin 
    }
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_STORY, JSON.stringify(story))
	return story
}

// To quickly create an admin story, uncomment the next line
// _createAdmin()
async function _createAdmin() {
    const story = {
        storyname: 'admin',
        password: 'admin',
        fullname: 'Mustafa Adminsky',
        imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
        score: 10000,
    }

    const newStory = await storageService.post('story', storyCred)
    console.log('newStory: ', newStory)
}