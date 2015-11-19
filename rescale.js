    var filewalker = require('filewalker'),
        mkdirp      = require('mkdirp'),
        gm          = require('gm');

    mkdirp("images/products");

    filewalker('src/img')
      .on('dir', function(p) {
        console.log('dir:  %s', p);
      })
      .on('file', function(p, s) {
        var file = p;
        var pattern = new RegExp(".*jpg","i");

        if (pattern.test(file)) {
        
        console.log("Resizing "+file);
        var newimage = "images/products/"+file.substr(0, file.lastIndexOf(".")) + ".jpg";
        gm('src/img/'+file)
             .crop(400, 400,100,0)
             .autoOrient()
             .write(newimage, function (err) {
               if (err) console.log(err);
             });
        } else {
             console.log(file+" doesn't match")
        }
      })
      .on('error', function(err) {
        console.error(err);
      })
      .on('done', function() {
        console.log('%d dirs, %d files, %d bytes', this.dirs, this.files, this.bytes);
      })
    .walk();
    
  mkdirp("images/slider");
  filewalker('src/slider')
    .on('dir', function(p) {
      console.log('dir:  %s', p);
    })
    .on('file', function(p, s) {
      var file = p;
      var pattern = new RegExp(".*jpg","i");

      if (pattern.test(file)) {
      
      console.log("Resizing "+file);
      var newimage = "images/slider/"+file.substr(0, file.lastIndexOf(".")) + ".jpg";
      gm('src/slider/'+file)
           .scale(1600,2000)
           .crop(1600,660,0,300)
           .write(newimage, function (err) {
             if (err) console.log(err);
           });
      var newthumb = "images/slider/thumb"+file.substr(file.lastIndexOf(".")-1,1) + ".jpg";
      gm('src/slider/'+file)
         .scale(170,200)
         .crop(170,80)
         .write(newthumb, function (err) {
           if (err) console.log(err);
         });
      } else {
         console.log(file+" doesn't match")
      }
      
    })
    .on('error', function(err) {
      console.error(err);
    })
    .on('done', function() {
      console.log('%d dirs, %d files, %d bytes', this.dirs, this.files, this.bytes);
    })
  .walk();