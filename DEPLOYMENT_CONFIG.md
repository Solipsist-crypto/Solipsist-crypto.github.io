# 🔧 Налаштування після деплою

## Після деплою бекенду

Коли ви задеплоїте бекенд на Heroku/Railway/інший хостинг, вам потрібно оновити URL API у фронтенді.

### Крок 1: Отримайте URL вашого бекенду

**Heroku:**
```
https://your-app-name.herokuapp.com
```

**Railway:**
```
https://your-app-name.up.railway.app
```

**Інший хостинг:**
```
https://your-domain.com
```

### Крок 2: Оновіть js/script.js

Знайдіть рядок (приблизно лінія 210):

```javascript
const response = await fetch('http://localhost:5000/api/contact', {
```

Замініть на:

```javascript
const response = await fetch('https://your-backend-url.com/api/contact', {
```

**Приклад:**
```javascript
const response = await fetch('https://solipsist-api.herokuapp.com/api/contact', {
```

### Крок 3: Перевірте CORS

Переконайтесь, що у `backend/app.py` налаштований CORS:

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Дозволяє всі домени

# АБО для безпеки вкажіть конкретний домен:
CORS(app, origins=['https://yourusername.github.io'])
```

### Крок 4: Тестування

1. Відкрийте ваш сайт
2. Відкрийте Console (F12)
3. Заповніть форму
4. Натисніть "Відправити"
5. Перевірте Console на помилки
6. Перевірте Telegram - повинно прийти повідомлення

### Типові помилки

**CORS Error:**
```
Access to fetch at 'https://...' from origin 'https://...' has been blocked by CORS policy
```

**Рішення:** Додайте `CORS(app)` у `backend/app.py`

**Network Error:**
```
Failed to fetch
```

**Рішення:** 
- Перевірте, чи запущений бекенд
- Перевірте URL (має бути HTTPS для продакшену)
- Перевірте, чи немає помилок у логах бекенду

**401/403 Error:**
```
Unauthorized
```

**Рішення:** Перевірте змінні оточення на хостингу (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID)

## Швидке оновлення для різних середовищ

Якщо хочете мати різні URL для розробки та продакшену:

```javascript
// У js/script.js
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000'
    : 'https://your-backend-url.com';

const response = await fetch(`${API_URL}/api/contact`, {
    // ...
});
```

Тепер сайт автоматично використовуватиме:
- `http://localhost:5000` - локально
- `https://your-backend-url.com` - на продакшені

## Чеклист після деплою

- [ ] Backend задеплоєний і доступний
- [ ] Змінні оточення налаштовані (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID)
- [ ] URL API оновлений у js/script.js
- [ ] CORS налаштований у backend/app.py
- [ ] Frontend задеплоєний
- [ ] Форма працює (протестовано)
- [ ] Повідомлення приходять в Telegram
- [ ] Немає помилок у Console

## Додаткові налаштування

### Додати rate limiting (обмеження запитів)

У `backend/app.py`:

```python
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

@app.route('/api/contact', methods=['POST'])
@limiter.limit("5 per hour")  # Максимум 5 повідомлень на годину з одного IP
def contact():
    # ...
```

### Додати логування

У `backend/app.py`:

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)

@app.route('/api/contact', methods=['POST'])
def contact():
    logger.info(f"New contact from {request.remote_addr}")
    # ...
```

### Додати Google Analytics

У `index.html` перед `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

**Готово! Ваш сайт повністю налаштований і готовий до роботи! 🎉**