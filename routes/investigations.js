
const userRoutes = (app, fs) => {

  // variables
  const dataPath = './data/investigations.json';
  // helper methods
  const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
      fs.readFile(filePath, encoding, (err, data) => {
          if (err) {
              throw err;
          }

          callback(returnJson ? JSON.parse(data) : data);
      });
  };

  const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

      fs.writeFile(filePath, fileData, encoding, (err) => {
          if (err) {
              throw err;
          }

          callback();
      });
  };

  // READ ...GET /enquetes/
  app.get('/investigations', (req, res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
         res.send(JSON.parse(data));
      });
  });

  //GET /enquetes/:id

app.get('/investigations/:id',(req,res)=>{
  fs.readFile(dataPath, 'utf8', (err, data) => {
    const investigations = JSON.parse(data);
  const enquete = investigations.find(c => c.id === parseInt(req.params.id));
  if(!enquete) res.status(404).send("erreur 404 / Cette  enquete  n'existe pas");
  res.send(enquete);
});
  });

  // CREATE ...app.post

  const enquetes =require('../data/investigations.json');
const ID = (tab) => {
    if (tab.length > 0) {
        return tab[tab.length - 1].id + 1
    } else {
        return 1
    }
}
  app.post('/investigations',(req,res)=>{
    enquetes.push({
     id: ID(enquetes),
    name: req.body.name,
    city: req.body.city,
    age: req.body.age,
    voiture: req.body.voiture,
    type: req.body.type,
    marque: req.body.marque

   });
   
   var json = JSON.stringify(enquetes , null, 2);
   fs.writeFile('./data/investigations.json', json, err => {
       if (err) {
         console.error(err)
         return
       }else{
         res.send("nouvelle enquette ajouté avec succés");
       }
     })
   });
   


//PUT /enquetes/:id


// UPDATE
app.put('/investigations/:id',(req,res)=>{
  fs.readFile('./data/investigations.json', 'utf8', (err, jsonString) => {
    const enqId = Number(req.params.id);
    const body = req.body;
    const account = enquetes.find((account) => account.id === enqId);
    const index = enquetes.indexOf(account);
     
    if (!account) {
      res.status(500).send('Account not found.');
    } else {
        const updatedAccount = { ...account, ...body };
        enquetes[index] = updatedAccount;
      var json = JSON.stringify(enquetes , null, 2);
      fs.writeFile('./data/investigations.json', json, err => {
      
      res.send(updatedAccount);
      });
    }

  }, true);
});

   
   //DELETE /enquetes/:id
app.delete('/investigations/:id',(req,res)=>{
fs.readFile('./data/investigations.json', 'utf8', (err, jsonString) => {
const enqId = Number(req.params.id);

const account = enquetes.find((account) => account.id === enqId);
 
const enquetes1 = enquetes.filter((account) => account.id != enqId);

const index = enquetes.indexOf(account);

if (!account) {
res.status(500).send('Account not found.');
} else {
//delete enquetes[index];
var json = JSON.stringify(enquetes1 , null, 2);

 

fs.writeFile('./data/investigations.json', json, err => {

res.status(200).send('enquette deleted ');
});
}

 

}, true);

});
};
module.exports = userRoutes;
