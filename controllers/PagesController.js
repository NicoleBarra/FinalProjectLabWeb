
let ProductModel = require('../models/Upload');
let UserModel = require('../models/User');
let LikesModel = require('../models/Likes')

exports.homepage = (req, res) => {
   
    ProductModel.findMostPopular()
    .then((data) => {
      // Guardamos los productos en una variable
      let images = data;
      // Enviamos los datos a la vista
      if(req.isAuthenticated()){
        res.render('pages/homepage', { layout: 'style', username:req.user.name, images: images, logged:true });
      }
      else{
        res.render('pages/homepage', { layout: 'style', images: images, logged:false });
      }
      
    });
    
}

exports.homepageunlogged = (req, res) => {
    ProductModel.findMostPopular()
    .then((data) => {
      // Guardamos los productos en una variable
      let images = data;
      // Enviamos los datos a la vista
      res.render('pages/homepage', { layout: 'style', images: images, logged:false });
    });
}

exports.timeline = (req, res) => {
    //gets your followers
    //gets art from your followers
    //gets your own art
    //orders them by date
    var users = []

    UserModel.findByEmail(req.user.email)
    .then((data) => {
      users.push(data.name)
      // Guardamos los productos en una variable
      
      UserModel.findFollowing(data.id)
      .then((resdata) =>{
        console.log("resdata follows")
        console.log(resdata)
        resdata.forEach(element => users.push(element.name));
        console.log("users id")
        console.log(users)

        ProductModel.findForTimeline(users)
        .then((dataimages) => {
          let images = dataimages
          res.render('pages/timeline', { layout: 'style', images: images, username:req.user.name, user:req.user.email });
        })

      })
    });


    
}

exports.gallery = (req, res) => {
    ProductModel.findByUser(req.user.name)
    .then((data) => {
      // Guardamos los productos en una variable
      let images = data;
       console.log(images)
      // Enviamos los datos a la vista
      res.render('pages/mygallery', { layout: 'style', username:req.user.name, images: images });
    });
}

exports.image = (req, res) => {
    res.render('pages/uploadImg', { layout: 'style', user:req.user.email});
}

exports.profile = (req,res) => {
  console.log(req)
  var profile_id = req.params.profileId
  ProductModel.findByUser(profile_id)
  .then((data) => {
    // Guardamos los productos en una variable
    let images = data;
     console.log(images)
    // Enviamos los datos a la vista

    if(req.isAuthenticated()){
      res.render('pages/profile', { layout: 'style', profilename: profile_id, username:req.user.name, images: images, logged:true });
    }
    else{
      res.render('pages/profile', { layout: 'style', profilename: profile_id, images: images, logged:false });
    }
  });
}
exports.follows= (req, res) => {
  UserModel.findByEmail(req.user.email)
    .then((data) => {
      console.log("data of user")
      console.log(data.id)
      console.log(data)
      UserModel.findFollowing(data.id)
      .then((resdata) =>{
        console.log("resdata follows")
        console.log(resdata)
        let follows = resdata
        res.render('pages/myfollows', { layout: 'style', username:req.user.name, user:req.user.email, follows:follows});
      })
      
      
    });
}

exports.followers = (req, res) => {
  UserModel.findByEmail(req.user.email)
    .then((data) => {
      console.log("data of user")
      console.log(data.id)
      console.log(data)
      UserModel.findFollowers(data.id)
      .then((resdata) =>{
        console.log("resdata followers")
        console.log(resdata)
        let followers = resdata
        res.render('pages/myfollowers', { layout: 'style', username:req.user.name, user:req.user.email, followers:followers});
      })
      
      
    });
  
}

exports.likes = (req, res) => {
  LikesModel.likesTimeline(req.user.id)
  .then((data) => {
    // Guardamos los productos en una variable
    let images = data;
    console.log(images);
    // Enviamos los datos a la vista
    res.render('pages/mylikes', { layout: 'style', username:req.user.name, images: images });
  })
}

exports.addLikes = (req, res) => {
  LikesModel.addLike(req.upload.id, req.user.id)
  .then((data) => {
    req.upload.likes += 1;
  })
}

/*exports.details = (req,res) => {
  console.log(req)
  var upload_id = req.params.uploadId
  ProductModel.findById(upload_id)
  .then((data) => {
    // Guardamos los productos en una variable
    let images = data;
     console.log(images)
    // Enviamos los datos a la vista

    if(req.isAuthenticated()){
      res.render('pages/imagedetail', { layout: 'style', username:req.user.name, images: images, logged:true });
    }
    else{
      res.render('pages/imagedetail', { layout: 'style', images: images, logged:false });
    }
  });
} */

exports.details = (req, res) => {
  console.log(req.params.uploadId);
  ProductModel.findById(req.params.uploadId)
  .then((data) => {
    // Guardamos los productos en una variable
    let images = data;
    console.log("image data")
    console.log(images)
     //console.log(images)
    // Enviamos los datos a la vista
    res.render('pages/imagedetail', { layout: 'style', images: images });
  });
}