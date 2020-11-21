const knex = require('../database/connection');



exports.findById = (id) => {
  return knex
    .select('*')
    .from('uploads')
    .where('id', id)
    .first();
}

exports.all = () => {
  // Realiza la consulta dentro de knex
  return knex
    .select('*')
    .from('followers');
}

exports.findByUser = (username)=>{
  return knex
    .select('*')
    .from('followers')
    .where('user', username)
    
}

exports.findMostPopular = () =>{
  var date = new Date();
  var yesterday = new Date(date.getTime());
  yesterday.setDate(date.getDate() - 1);
  return knex
  .select('*')
  .from('followers')
  .where('created_at','>',yesterday)
  .orderBy('likes','desc')
  .limit(10)
}


exports.create = (follower,following) => {

  return knex('followers')
    .insert({ follower:following , followed:follower})
}
