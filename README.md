# BlackHawk
bok bok bekah

# Overview
* This project is a full stack, in house solution for facilitating the application process, onboarding, internal organization functions, etc. 
* Client Side:
  * We are using HTMl/CSS/JS on the Client Side, with Bootstrap and JQuery
  * `dropzone.js` is used to create the drop zone and customization
  * `Materialize.css` is used to style `/form`
  * `Bootstrap Tables` are used for `/table`
* Server Side:
  * We are using Node.js with Express, MongoDB, and Jade. 
  * Express serves as middleware
  * Jade is the templating language that compiles to HTML that works with express. 
  * For `/table`, Express pulls data from mongodb and sends it to the table; jade renders it for variable size/length.
  * Express works with `multer` to store files on disk. This will auto-generate new names to prevent collisions
  * Mongodb is a nosql database
  * Mongodb uses bson (binary json) with a cap of 16mb/file. Our size cap is much lower, so we can use normal bson instead of `GridFS` to store files


# Program Flow
* The user starts at `/form` and fills out the form. The form has two submitting portions - the file and the general info. The file must be submitted first,
and should be a resume/image, etc. This file must be of `image/*` or `application/pdf` type. 
* The uploader will adapt to compatible browsers client-side. After upload (cap of 1mb; 1 file), the image/pdf will auto-submit to the server (post; multipart encrypted). 
The server will store the image in `/uploads`, and return the name used to store the image.
* The name, as well as the general information, is then sent back to the server (post) on final submit. The user is redirected to a "thankyou" page.
* Admins will look over results at `/table`. The table is sortable and there will be a pdfreader so resumes can be read. 

# Dependencies
   ```
   npm install mongodb
   ``` 

# Developmental Processes

* Database Back-up
  * To get the dump file:
  ```
  mongodump
  ```
  * This command will dump data into "/dump" of current directory.
  * To restore database using dump file:
  ```
  mongorestore --db BlackHawk dump/BlackHawk/documents.bson 
  ```

* MongoDB
  * To start database server:
  ```
  brew services start mongo
  ```
  * To end database server:
  ```
  brew services stop mongo
  ```
  * To restart database server:
  ```
  brew services restart mongo
  ```

# To Start
* Start MySQL Server
  ```
  mysql.server start
  ```
* Start node server
  ``` 
  node bin/www
  ```
* Pages can be found on localhost:3000/[page]

# Relevant Links:
* [Setting up Node.js, Express, Jade, with MongoDB](http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/)
* [Mongodb Node.js tutorial](https://mongodb.github.io/node-mongodb-native/2.2/quick-start/)
* [JavaScript in Pug](https://pugjs.org/language/inheritance.html)

