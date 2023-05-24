import express from 'express';

const { Router } = express;

const router = Router();

/* GET home page. */
// Quitamos la palabra function sustitullendo la flecha =>
router.get('/', (req, res) => {
  const iconSet = ['🐱‍👤', '✌', '🙌'];
  const icon = iconSet[Math.floor(Math.random() * 3)];
  res.render('index', { title: 'DWPCII-2023A', icon });
});

router.get('/author', (req, res) => {
  const author = {
    name: 'Mirna',
    lastname: 'Sanchez',
    twitter: '@Mirna',
    job: 'ITGAM',
  };
  // Seding the view-model to be rendered by a View
  res.render('author', author);
});
export default router;
