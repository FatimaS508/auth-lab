const router = require("express").Router()
const isSignedIn = require("../middleware/is-signed-in")
const Entry= require('../models/entry')
const entry= require('../models/entry')


router.get('/new',isSignedIn, async (req,res)=>{
    res.render('entries/new.ejs')
})

router.post('/',isSignedIn, async (req,res)=>{
    console.log(req.session.user)
    console.log(req.body)
    const entryCreate= await Entry.create({
        title: req.body.title,
        entryBody: req.body.entryBody,
        isPublic: Boolean(req.body.isPublic),
        owner: req.session.user._id
    })

    res.redirect('/entries')
})

// router.get('/entries',async(req,res)=>{ //testing the all entries
//     res.render('entries/all-entries.ejs')
// })

router.get('/',isSignedIn, async (req,res)=>{
    const foundEntries= await entry.find({isPublic: true})
    console.log(foundEntries)
    res.render('entries/all-entries.ejs', {entries: foundEntries})
})

router.get('/my-entries',isSignedIn, async (req,res)=>{
    const myEntries= await entry.find({owner: req.params._id})
    res.render('entries/my-entries.ejs', {entries: myEntries})
})

module.exports= router