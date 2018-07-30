const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
let app=express();

hbs.registerPartials(__dirname + "/views/partials")
hbs.registerHelper('curYear',()=>{
  return new Date().getFullYear()
})
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})
app.set('view-engine','hbs');
app.use((req,res,next)=>{
  let now = new Date().toString();
  let msg =`${now} : ${req.method} ${req.url}` + '\n'
  fs.appendFile('log.txt',msg,(err)=>{
    if (err){
      console.log(err) ;
    }
  })
  next();
});
// app.use((req,res,next)=>{
//   res.render('maint.hbs')
// });
app.use(express.static(__dirname + "/public"));

app.get("/",(req,res)=>{
  res.render('home.hbs',{
    pageTitle:'Home Page',
    pageName:'Amayalandias Page',
    messageOfTheDay:'Welcome to my site'
  });
});
app.get("/about",(req,res)=>{
  res.render('about.hbs',{
    pageTitel:'About Page',
    pageName:'About Page',
  });
});
app.get("/bad",(req,res)=>{
  res.send("<h1 align='center'>Work in progress, please visit us later</h1>");
});
app.listen(port,()=>{
  console.log(`App listening on port ${port}`);
});
