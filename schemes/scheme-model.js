const knex = require('knex');
const db = knex(require("../knexfile").development);

const find = () => {
    // find all datas 
    // select * from schemes
    return db("schemes")
}

const findById = (id) => {
    // find schemes by id
    // select select * from schemes 
    // where schemes.id = 1;
    return db("schemes")
    .where({id})
    .first();
}

const findSteps = (id) => {
    // select steps.id, scheme_name, step_number, steps.instructions
    // from schemes 
    // join steps 
    // on schemes.id = steps.scheme_id 
    // where schemes.id = 1
    return db ("schemes")
    .join("steps", "schemes.id", "steps.scheme_id")
    .where({scheme_id: id })
    .select( "steps.id", "scheme_name", "step_number" , "steps.instructions" );
}

function add(scheme) {
    return db('schemes').insert(scheme).then(id =>({
        id:id[0]
    }))
}


function update(changes, id) {
    db('schemes').where({id:id}).update(changes)
    return db('schemes').where({id:id}).first()
}
function remove(id) {
    return db('schemes').where({id:id}).del()
}



module.exports = { 
    find,
    findById,
    findSteps,
    add,
    remove,
    update 
 }; 

