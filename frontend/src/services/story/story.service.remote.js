import { httpService } from '../http.service'

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

function getStorys() {
	return httpService.get(`story`)
}

async function getById(storyId) {
	const story = await httpService.get(`story/${storyId}`)
	return story
}

function remove(storyId) {
	return httpService.delete(`story/${storyId}`)
}

async function update({ _id, score }) {
	const story = await httpService.put(`story/${_id}`, { _id, score })

	// When admin updates other story's details, do not update loggedinStory
    const loggedinStory = getLoggedinStory() // Might not work because its defined in the main service???
    if (loggedinStory._id === story._id) saveLoggedinStory(story)

	return story
}

async function login(storyCred) {
	const story = await httpService.post('auth/login', storyCred)
	if (story) return saveLoggedinStory(story)
}

async function signup(storyCred) {
	if (!storyCred.imgUrl) storyCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
	storyCred.score = 10000

    const story = await httpService.post('auth/signup', storyCred)
	return saveLoggedinStory(story)
}

async function logout() {
	sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_STORY)
	return await httpService.post('auth/logout')
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
