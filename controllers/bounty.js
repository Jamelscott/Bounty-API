const res = require('express/lib/response')
const db = require('../models')



const router = require('express').Router()


// GET /bounties (index)
router.get('/', async (req, res)=>{
    
    try{
        //find all bounties
        const bounties = await db.Bounty.find({})
        res.json(bounties)
        //respond with all bounties
    } catch(err){
        //if there is an error we will send an error status w messagesn
        console.log(err)
        res.status(503).json({message: "the database or server room is on fire 🔥"})
    }
})


//GET /bounties/:id (show)

router.get('/:id', (req, res)=>{

    const {id} = req.params
    console.log(id) 

    db.Bounty.findById(id)
        .then(bounty =>{
            if(!bounty)return res.status(404).json({message: "bounty not found"})
            res.json(bounty)
        })
        .catch(err=>{
            console.log(err)
            res.status(503).json({message: 'server room has burned down'})
        })
})



//POST /bounties (insert a new bouint)
router.post('/', (req, res)=>{
    db.Bounty.create(req.body)
    .then(createdBounty =>{
        res.status(201).json(createdBounty)
    })
    .catch(err=>{
        if(err.name === 'ValidationError'){
            res.status(406).json({message: "Validation Error"})
        } else{
            res.status(503).json({message: 'Database or server error'})
        }
    })
})
// ASYNC AWAIT VERSION
// router.post('/', async (req,res) => {
//     try {
//         const createdBounty = await db.Bounty.create(req.body);
//         res.status(201).json(createdBounty);
//     } catch (err) {
//         if (err.name === 'ValidationError'){
//             res.status(406).json({message: 'Validation Error!'});
//         } else {
//             res.status(503).json({message: 'DB/Server Error!'})
//         }
//     }
// });

//PUT /bounties/:id  (update a bounty)

router.put('/:id', async (req, res)=>{

    try{
        //get the id from the params
        const id = req.params.id
        console.log('req.body', req.body)
        const options = {
            new: true
        }
        //find the bounty in db and update it
        const updatedBounty = await db.Bounty.findByIdAndUpdate({
            _id: id
        },
        req.body, 
        options
        )
        if (!updatedBounty) return res.status(404).json({ message: "incorrect ID"})
        res.json(updatedBounty)

    } catch(err){
        console.log(err)
        res.status(503).json({message: "the server isn't happy"})
    }

})

//DELETE /bounties/:id (destroy a bounty)
router.delete('/:id', (req, res)=>{

    // find the document with the req parms and delte it
    db.Bounty.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(204).json({message: "the bounty was deleted"})
    })
    
    // then send message that says it was deleted
.catch(err =>{
    console.log(err)
    res.status(503).json({message:"the server is on fire. run."})
})
    //handle any errors
})


module.exports = router