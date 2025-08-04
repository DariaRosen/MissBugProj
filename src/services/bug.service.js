
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'bugDB'
const bugs = utilService.readJsonFile('./data/bugs.json')

export const bugService = {
    query,
    getById,
    remove,
    save,
}


function query() {
    // return storageService.query(STORAGE_KEY)
    return bugs
}
function getById(bugId) {
    // return storageService.get(STORAGE_KEY, bugId)
    return bugs.find(b => b._id === bugId)
}
async function remove(bugId) {
    // return storageService.remove(STORAGE_KEY, bugId)
    const idx = bugs.findIndex(b => b._id === bugId)
    bugs.splice(idx, 1)

    return _saveBugs()
}
async function save(bugToSave) {
    if (bugToSave._id) {
        // return storageService.put(STORAGE_KEY, bugToSave)
        const idx = bugs.findIndex(b => b._id === bugToSave._id)
        bugs.splice(idx, 1, bugToSave)
    } else {
        // return storageService.post(STORAGE_KEY, bugToSave)
        bugToSave._id = utilService.makeId()
        bugs.push(bugToSave)
    }
    await _saveBugs()
    return bugToSave
}
function _saveBugs() {
    return utilService.writeJsonFile('data/bugs.json', bugs)
}