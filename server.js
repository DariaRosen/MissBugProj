import express from 'express'
import fs from 'fs'
import { utilService } from './src/services/util.service.js'
import { bugService } from './src/services/bug.service.js'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/bug', async (req, res) => {
    const bugs = await bugService.query()
    res.send(bugs)
})

app.get('/api/bug/save', async (req, res) => {
    const { _id, title, severity, createdAt } = req.query
    const bugToSave = {
        _id,
        title,
        severity: +severity,
        createdAt
    }
    const savedBug = await bugService.save(bugToSave)
    res.send(savedBug)
})

app.get('/api/bug/:bugId', async (req, res) => {
    const bugId = req.params.bugId
    const bug = await bugService.getById(bugId)
    res.send(bug)
})

app.get('/api/bug/:bugId/remove', async (req, res) => {
    const bugId = req.params.bugId
    await bugService.remove(bugId)
    res.send({ msg: 'Removed successfully' })
})

const port = 3030
app.listen(port, () => console.log(`Server listening on port http://127.0.0.1:${port}/`))