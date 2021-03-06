## Прохождение курса Node.js: серверный JavaScript на https://loftschool.com
### Задание -  Корпоративная система "LoftSystem"
В папке ./dist находится подготовленная frontend-часть проекта, ваша задача - реализовать backend.

1. Выберите фреймворк - Express.js или Koa.js.
2. Выберите базу данных - MongoDB (рекомедуемая ORM - Mongoose) или PostgreSQL (рекомедуемая ORM - Sequelize).
3. Подготовьте http-сервер, который на любой get-запрос вернет index.html (маршрутизация выполняется на frontend'e средствами бибилиотеки vue-router).
4. Реализуйте логику обработки 12 различных запросов:
   - POST-запрос на /api/saveNewUser - создание нового пользователя (регистрация). Необходимо вернуть объект созданного пользователя.
   - POST-запрос на /api/login - авторизация после пользователького ввода. Необходимо вернуть объект авторизовавшегося пользователя.
   - Автоматический POST-запрос на /api/authFromToken - авторизация при наличии токена. Необходимо вернуть объект авторизовавшегося пользователя.
   - PUT-запрос на /api/updateUser/:id - обновление информации о пользователе. Необходимо вернуть объект обновленного пользователя.
   - DELETE-запрос на /api/deleteUser/:id - удаление пользователя.
   - POST-запрос на /api/saveUserImage/:id - сохранение изображения пользователя. Необходимо вернуть объект со свойством path, которое хранит путь до сохраненного изображения.
   - Автоматический GET-запрос на /api/getNews - получение списка новостей. Необходимо вернуть список всех новостей из базы данных.
   - POST-запрос на /api/newNews - создание новой новости. Необходимо вернуть обновленный список всех новостей из базы данных.
   - PUT-запрос на /api/updateNews/:id - обновление существующей новости. Необходимо вернуть обновленный список всех новостей из базы данных.
   - DELETE-запрос на /api/deleteNews/:id - удаление существующей новости. Необходимо вернуть обновленный список всех новостей из базы данных.
   - Автоматический GET-запрос на /api/getUsers - получение списка пользователей. Необходимо вернуть список всех пользоватлей из базы данных.
   - PUT-запрос на /api/updateUserPermission/:id - обновление существующей записи о разрешениях конкретного пользователя. (Более подробную информацию о url, дополнительных параметрах и передаваемых данных запроса вы можете получить через средства разработчика при взаимодействии с интерфейсом).
5. Реализуйте логику взаимодействия frontend и backend частей между собой с помощью socket. Необходимо для реализации чата.
6. Обеспечьте при необходимости сжатие картинок, загружаемых пользователями, и их обрезку до квадратных пропорций.
7. Обеспечьте возможность работы приложения в 2 режимах - development и production. В development режиме приложение должно быть подключено к локальной базе данных, в то время как в production режиме - к удаленной, которая и будет использоваться при работе на хостинге.
