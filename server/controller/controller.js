const model = require('../models/model')

async function create_categories(req,res){
    const Create = new model.Categories({
        type:'Investment',
        colour:'#023020'
    })
    try{
    const result = await Create.save()
    res.json(result);
}
catch(err){
    return res.status(400).json({message:`Some error ${err}`});
}
}

async function get_categories(req,res){
    let data = await model.Categories.find({});
    let filter = await data.map(v => Object.assign({},{type:v.type,colour:v.colour}))
    return res.json(filter);
}

async function create_transaction(req,res){
    if(!req.body) return res.status(400).json("data not provided")
    let {name,type,amount} = req.body;
    const create = await new model.Transactions({
        name,type,amount,date:new Date()
    })
    try{
        const result = await create.save()
        res.json(result);
    }
    catch(err){
        return res.status(400).json({message:`Transaction error ${err}`});
    }
}

async function get_transaction(req,res){
    let data = await model.Transactions.find({});
    return res.json(data);
}

async function delete_transaction(req,res){
    if(!req.body) return res.status(400).json({message:`req body not found`});
    try{
    await model.Transactions.deleteOne(req.body)
    res.json('Record Deleted')
}catch(err){
    return res.json('Error while deleting Transaction')
}
}

async function get_labels(req,res){
    try{
   const result = await model.Transactions.aggregate([
        {
            $lookup:{
                from : "categories",
                localField: "type",
                foreignField:'type',
                as:'categories_info'
            }
        },
        {
            $unwind:"$categories_info"
        }
    ])
    let data = result.map(v => Object.assign({},{_id:v._id,name:v.name,type:v.type,amount:v.amount,colour:v.categories_info['colour']}))
    res.json(data)
}catch(err){
    return res.status(400).json('Lookup collection error')
}
}

module.exports = {
    create_categories,
    get_categories,
    create_transaction,
    get_transaction,
    delete_transaction,
    get_labels
}