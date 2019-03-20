const router = require('express').Router();
const Type = require('../../models/type');

router.get('/', (req, res)=> {
  let type = Type.findAll({})

  Promise.all([type]).then(values=>{
    res.send({types:values[0]})
  }).catch(err=>{
    res.status(500).send({err})
  })
});

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

router.get('/:id', (req, res) => {
  let type = Type.findByPk(req.params.id);

  Promise.all([type]).then(values=>{
    res.send({type:values[0]})
  }).catch(err=>{
    res.status(500).send({err})
  })
});

router.put('/:id', (req, res) => {
  let newType = Type.update({
    name: req.body.name
  },{
    where: {
      id: req.params.id
    }
  });
  Promise.all([newType])
  .then(values=> {
    res.send({msg:"OK"})
  })
  .catch(err=>{
    res.status(500).send({err})
  })
});

router.delete('/:id', (req, res) => {
  let newType = Type.destroy({
    where: {
      id: req.params.id
    }
  });
  Promise.all([newType])
  .then(values=> {
    res.status(204).send({})
  })
  .catch(err=>{
    res.status(500).send({err})
  })
});



module.exports = router;
