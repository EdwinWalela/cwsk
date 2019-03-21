const router = require('express').Router();
const Type = require('../../models/type');

//@ROUTE: get all types 
router.get('/', (req, res)=> {
  let type = Type.findAll({})

  Promise.all([type]).then(values=>{
    res.send({types:values[0]})
  }).catch(err=>{
    res.status(500).send({err})
  })
});
//@ROUTE: create new type
router.post('/',(req, res)=>{
 let newType = Type.create({
    name: req.body.name
  });

  Promise.all([newType]).then(values=>{
    res.status(201).send({msg:"OK"})
  }).catch(err=>{
    res.status(500).send({err})
  })
});
//@ROUTE: get type by PK
router.get('/:id', (req, res) => {
  let type = Type.findByPk(req.params.id);

  Promise.all([type]).then(values=>{
    if(values[0] !== null){
      res.send({type:values[0]});
    }else{
      res.status(404).send({msg:"Not Found"});
    }
  }).catch(err=>{
    res.status(500).send({err})
  })
});
//@ROUTE: update type by PK
router.put('/:id', (req, res) => {
  let newType = Type.update({
    name: req.body.name
  },{
    where: {
      id: req.params.id
    }
  });
  Promise.all([newType]).then(values=> {
    if(values[0] >= 1){
      res.send({msg:"OK"})
    }else{
      res.status(404).send({msg:"Not Found"});
    }
  }).catch(err=>{
    res.status(500).send({err})
  })
});
//@ROUTE: delete type by PK
router.delete('/:id', (req, res) => {
  let newType = Type.destroy({
    where: {
      id: req.params.id
    }
  });
  Promise.all([newType]).then(values=> {
    if(values[0] >= 1){
      res.status(204).send({})
    }else{
      res.status(404).send({msg:"Not Found"});
    }
  })
  .catch(err=>{
    res.status(500).send({err})
  })
});



module.exports = router;
