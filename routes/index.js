const Router = require('koa-router');
const router = new Router();

const isAuthenticated = require('../controllers/isAuthenticated');
const index = require('../controllers/index');
const login = require('../controllers/login');
const logout = require('../controllers/logout');
const loginFromToken = require('../controllers/loginFromToken');
const userApi = require('../controllers/userApi');
const permissionApi = require('../controllers/permissionApi');
const newsApi = require('../controllers/newsApi');
const { multipart } = require('../middlewares/bodyParser');

// До проверки isAuthenticated - иначе пользователи не смогут войти на сайт
router.post('/api/login', login.post);
router.post('/api/saveNewUser', userApi.post);

router.use('/*', isAuthenticated);

router.post('/api/authFromToken', loginFromToken.post);
router.post('/api/logout', logout.post);

router.get('/api/getUsers', userApi.get);
router.post('/api/saveUserImage/:id', userApi.checkDir, multipart, userApi.checkId, userApi.postImage);
router.put('/api/updateUser/:id', userApi.checkId, userApi.put);
router.delete('/api/deleteUser/:id', userApi.checkId, userApi.delete);

router.put('/api/updateUserPermission/:id', permissionApi.checkId, permissionApi.put);

router.get('/api/getNews', newsApi.get);
router.post('/api/newNews', newsApi.post);
router.put('/api/updateNews/:id', newsApi.checkId, newsApi.put);
router.delete('/api/deleteNews/:id', newsApi.checkId, newsApi.delete);

router.get('*', index.getIndex);

module.exports = router;
