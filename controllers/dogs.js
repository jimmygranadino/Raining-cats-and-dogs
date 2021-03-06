let express = require('express')
let router = express.Router()
let fs = require('fs')


router.get('/', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogsData = JSON.parse(dogs)
    let nameFilter = req.query.nameFilter
    if(nameFilter) {
        dogsData = dogsData.filter(dogs => {
            return dogs.name.toLowerCase() === nameFilter.toLocaleLowerCase()
        })
    }

    res.render('dogs/index', {myDogs: dogsData})
})


router.get('/new', (req, res) => {
    res.render('dogs/new')
})


router.get('/edit/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    res.render('dogs/edit', {dogs: dogs[req.params.idx], dogsId: req.params.idx})
})


router.get('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogsData = JSON.parse(dogs)
    let dogsIndex = parseInt(req.params.idx)
    res.render('dogs/show', {myDogs: dogsData[dogsIndex]})
})


router.post('/', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    dogs.push(req.body)
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    res.redirect('/dogs')
})


router.delete('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    dogs.splice(req.params.idx, 1)
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    res.redirect('/dogs')
})


router.put('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    dogs[req.params.idx].name = req.body.name
    dogs[req.params.idx].type = req.body.type
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    res.redirect('/dogs')
})


module.exports = router