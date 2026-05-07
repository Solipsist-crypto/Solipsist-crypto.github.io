# Backend для Portfolio Site

Flask API для обробки форми зв'язку через Telegram Bot.

## 🚀 Швидкий старт

### 1. Встановіть залежності

```bash
cd backend
pip install -r requirements.txt
```

### 2. Створіть Telegram Bot

1. Відкрийте Telegram і знайдіть [@BotFather](https://t.me/BotFather)
2. Відправте команду `/newbot`
3. Введіть ім'я бота (наприклад: "Solipsist Portfolio Bot")
4. Введіть username бота (наприклад: "solipsist_portfolio_bot")
5. Скопіюйте токен, який надасть BotFather

### 3. Отримайте свій Chat ID

1. Відкрийте [@userinfobot](https://t.me/userinfobot)
2. Натисніть Start
3. Скопіюйте ваш Chat ID

### 4. Налаштуйте .env файл

```bash
cp .env.example .env
```

Відредагуйте `.env` та вставте свої дані:

```env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

### 5. Запустіть сервер

```bash
python app.py
```

Сервер запуститься на `http://localhost:5000`

## 📡 API Endpoints

### POST /api/contact

Відправка повідомлення з форми зв'язку.

**Request:**
```json
{
  "name": "Іван Петренко",
  "email": "ivan@example.com",
  "subject": "Питання про проєкт",
  "message": "Привіт! Хочу обговорити проєкт..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Повідомлення успішно відправлено!"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Помилка відправки. Спробуйте пізніше."
}
```

### GET /api/health

Перевірка роботи API.

**Response:**
```json
{
  "status": "ok",
  "message": "API працює"
}
```

## 🔧 Інтеграція з фронтендом

Оновіть `js/script.js` у вашому фронтенді:

```javascript
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            alert('✅ ' + result.message);
            contactForm.reset();
        } else {
            alert('❌ ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('❌ Помилка з\'єднання з сервером');
    }
});
```

## 🌐 Деплой

### Heroku (безкоштовно)

1. Створіть `Procfile`:
```
web: gunicorn app:app
```

2. Деплой:
```bash
heroku create your-app-name
heroku config:set TELEGRAM_BOT_TOKEN=your_token
heroku config:set TELEGRAM_CHAT_ID=your_chat_id
git push heroku main
```

### Railway (безкоштовно)

1. Зареєструйтесь на [railway.app](https://railway.app)
2. Створіть новий проєкт з GitHub
3. Додайте змінні оточення в Settings
4. Автоматичний деплой!

### PythonAnywhere (безкоштовно)

1. Зареєструйтесь на [pythonanywhere.com](https://www.pythonanywhere.com)
2. Завантажте файли
3. Налаштуйте WSGI
4. Додайте змінні оточення

### VPS (DigitalOcean, AWS, etc.)

```bash
# Встановіть залежності
pip install -r requirements.txt

# Запустіть з gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

Або використайте systemd service:

```ini
[Unit]
Description=Portfolio Backend
After=network.target

[Service]
User=www-data
WorkingDirectory=/path/to/backend
Environment="PATH=/path/to/venv/bin"
ExecStart=/path/to/venv/bin/gunicorn -w 4 -b 0.0.0.0:5000 app:app

[Install]
WantedBy=multi-user.target
```

## 🔒 Безпека

### CORS

За замовчуванням дозволені запити з будь-яких доменів. Для продакшену обмежте:

```python
CORS(app, origins=['https://yoursite.com'])
```

### Rate Limiting

Додайте обмеження запитів:

```bash
pip install flask-limiter
```

```python
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

@app.route('/api/contact', methods=['POST'])
@limiter.limit("5 per hour")
def contact():
    # ...
```

### Валідація Email

```bash
pip install email-validator
```

```python
from email_validator import validate_email, EmailNotValidError

try:
    valid = validate_email(email)
    email = valid.email
except EmailNotValidError as e:
    return jsonify({'success': False, 'message': str(e)}), 400
```

## 🧪 Тестування

Перевірте API за допомогою curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Відправка повідомлення
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "Test message"
  }'
```

Або використайте Postman/Insomnia для тестування.

## 📊 Логування

Додайте логування для відстеження помилок:

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

@app.route('/api/contact', methods=['POST'])
def contact():
    logger.info(f"New contact form submission from {request.remote_addr}")
    # ...
```

## 🔄 Альтернативи

Якщо не хочете використовувати Flask:

### 1. Serverless (Vercel/Netlify Functions)

```javascript
// api/contact.js
export default async function handler(req, res) {
  const { name, email, subject, message } = req.body;
  
  // Відправка в Telegram
  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: process.env.CHAT_ID,
      text: `New message from ${name} (${email})\n\n${subject}\n\n${message}`
    })
  });
  
  res.json({ success: true });
}
```

### 2. EmailJS (без бекенду)

Використайте [EmailJS](https://www.emailjs.com/) для відправки email прямо з фронтенду.

### 3. FormSpree

Використайте [FormSpree](https://formspree.io/) - просто вкажіть action у формі.

## 📞 Підтримка

Якщо виникли питання:
- Telegram: @solipsist_dev
- Email: solipsist.dev@gmail.com

---

**Створено by Solipsist**