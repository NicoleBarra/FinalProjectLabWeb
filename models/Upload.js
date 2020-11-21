const knex = require('../database/connection');



exports.findById = (id) => {
  return knex
    .select('*')
    .from('uploads')
    .where('id', id)
    .first();
}

exports.updateLikes = (id,likes) => {
  return knex('uploads')
  .where('id',id)
  .update('likes',likes)
}

exports.all = () => {
  // Realiza la consulta dentro de knex
  return knex
    .select('*')
    .from('uploads');
}

exports.findByUser = (username)=>{
  return knex
    .select('*')
    .from('uploads')
    .where('user', username)
    
}

exports.findMostPopular = () =>{
  var date = new Date();
  var yesterday = new Date(date.getTime());
  yesterday.setDate(date.getDate() - 1);
  return knex
  .select('*')
  .from('uploads')
  .where('created_at','>',yesterday)
  .orderBy('likes','desc')
  .limit(10)
}

exports.findForTimeline = (users) => {
  return knex
    .select('*')
    .from('uploads')
    .whereIn('user', users)
    .orderBy('created_at','desc')
}


exports.create = (upload, image, user) => {

  let url = 'http://localhost:3000/images/' + image.filename;
  return knex('uploads')
    .insert({ title: upload.title, description: upload.description, imgUrl: url, user: user.name })
}


