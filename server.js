import express from 'express'
import fs from 'fs'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/bug', async (req, res) => {
    const bugs = JSON.parse(fs.readFileSync('data/bugs.json'))
    res.send(bugs)
})

app.get('/api/bug/save', async (req, res) => {
    const newBug = req.body
    const bugs = JSON.parse(fs.readFileSync('data/bugs.json'))
    bugs.push(newBug)
    fs.writeFileSync('data/bugs.json', JSON.stringify(bugs))
    res.send(newBug)
})

app.get('/api/bug/:bugId', async (req, res) => {
    const bugs = JSON.parse(fs.readFileSync('data/bugs.json'))
    const bug = bugs.find(b => b._id === req.params.bugId)
    res.send(bug)
})

app.get('/api/bug/:bugId/remove', async (req, res) => {
    const bugs = JSON.parse(fs.readFileSync('data/bugs.json'))
    const filteredBugs = bugs.filter(b => b._id !== req.params.bugId)
    fs.writeFileSync('data/bugs.json', JSON.stringify(filteredBugs))
    res.send({ removed: req.params.bugId })
})

const port = 3030
app.listen(port, () => console.log(`Server listening on port http://127.0.0.1:${port}/`))