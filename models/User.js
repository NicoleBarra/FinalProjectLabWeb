const knex = require('../database/connection');
const bcrypt = require('bcryptjs');

/**
 * Encuentra al usuario que tenga el correo indicado
 */
exports.findById = (id) => {
  return knex
    .select('*')
    .from('users')
    .where('id', id)
    .first();
}

exports.findByName = (name) => {
  return knex
    .select('*')
    .from('users')
    .where('name', name)
    .first();
}

/**
 * Encuentra al usuario que tenga el correo indicado
 */
exports.findByEmail = (email) => {
  return knex
    .select('*')
    .from('users')
    .where('email', email)
    .first();
}

exports.all = () => {
  return knex
    .from('users')
    .select('*');
}

exports.create = (user) => {
  let pass = user.password;
  pass = bcrypt.hashSync(pass, 10);
  return knex('users')
    .insert({ name: user.name, email: user.email, password: pass, role: 'user' })
}

exports.findFollowers = (followed) => {
  //find user and get id
  
  return knex
  .select('*')
  .from('users')
  .join('followers','users.id','=','followers.follower')
  .where('followers.followed',followed);

}

exports.findFollowing = (following) => {

  return knex
  .select('*')
  .from('users')
  .join('followers','users.id','=','followers.followed')
  .where('followers.follower',following);

}