const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ['id','tag_name',],
    include: {
      model: Product
    }
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })

});

// GET one tag
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id','tag_name'],
    include: {
      model: Product
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({message: 'No tag found with that id!'})
      return
    }
    res.json(dbTagData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

// CREATE a new tag
router.post('/', (req, res) => {
  Tag.create({
    where: {
      tag_name: req.body.tag_name
    }
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    
  })
});

// UPDATE a tag's name
router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
})
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({message: 'No tag found with that ID'})
      return
    }
    res.json(dbTagData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

// DELETE a tag
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json(err)
      return
    }
    res.json(dbTagData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

module.exports = router;
