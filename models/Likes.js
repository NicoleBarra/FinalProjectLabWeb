const knex = require('../database/connection');

exports.addLike = (post_id) => {
    return knex('uploads')
    .insert({post_id: post_id, user_id: user_id})
}

exports.likesTimeline = (id) => {
    return knex
        .select('*')
        .from('likes')
        .where('user_id', id)
}

exports.numberOfLikes = (id) => {
    return knex
    .select('*')
    .from('likes')
    .whereIn('post_id', id)
}