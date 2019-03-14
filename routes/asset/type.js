const router = require('express').Router();
const dateFormat = require('dateformat');
const upload = require('../../config/fileStorage');
const Tps = require('../../models/tps');
const Type = require('../../models/type');
/* GET home page. */
router.get('/', function(req, res, next) {
  Type.build({
    name: "t mall",
    details: "bla bla"
  });
  var branches = Type.findAll().then((data) => {
    console.log(data);
    res.render('type/index', { title: 'Types', data: data });
  });
});

router.get('/create', function(req, res, next) {
  res.render('type/create', { title: 'Add Type' });
});

router.post('/create', function(req, res, next) {
  Type.create({
    name: req.body.name
  }).then((rst) => {
    res.redirect('/type');
  }).catch((x) => {
    res.redirect('/');
  })
});

router.get('/edit/:id', (req, res) => {
  Type.findByPk(req.params.id).then((data)=> {
    res.render('type/edit',{data: data, title: "edit "+ data.name})
  })
});

router.post('/update/:id', (req, res, next) => {
  Type.update({
    name: req.body.name
  },{
    where: {
      id: req.params.id
    }
  })
  .then((data)=> {
    res.redirect('/type')
  })
  .catch(next)
});

module.exports = router;
