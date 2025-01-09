import { storageService } from "../async-storage.service";
import { makeId } from "../util.service";
import { userService } from "../user";

const STORAGE_KEY = "story";

export const storyService = {
  query,
  getById,
  save,
  remove,
  addStoryMsg,
};
window.cs = storyService;

async function query(filterBy = { txt: "", price: 0 }) {
  var storys = await storageService.query(STORAGE_KEY);
  const { txt } = filterBy;

  if (txt) {
    const regex = new RegExp(filterBy.txt, "i");
    storys = storys.filter(
      (story) => regex.test(story.vendor) || regex.test(story.description)
    )
  }

  return storys
}

function getById(storyId) {
  return storageService.get(STORAGE_KEY, storyId);
}

async function remove(storyId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, storyId);
}

async function save(story) {
  var savedStory;
  if (story._id) {
    const storyToSave = {
      _id: story._id,
    };
    savedStory = await storageService.put(STORAGE_KEY, storyToSave);
  } else {
    const storyToSave = {
      vendor: story.vendor,
      price: story.price,
      speed: story.speed,
      // Later, owner is set by the backend
      owner: userService.getLoggedinUser(),
      msgs: [],
    };
    savedStory = await storageService.post(STORAGE_KEY, storyToSave);
  }
  return savedStory;
}

async function addStoryMsg(storyId, txt) {
  // Later, this is all done by the backend
  const story = await getById(storyId);

  const msg = {
    id: makeId(),
    by: userService.getLoggedinUser(),
    txt,
  };
  story.msgs.push(msg);
  await storageService.put(STORAGE_KEY, story);

  return msg;
}
