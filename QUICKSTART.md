# 🚀 Швидкий старт Portfolio Site

## Крок 1: Перевірка структури

Переконайтесь, що у вас є така структура:

```
portfolio-site/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
└── README.md
```

## Крок 2: Налаштування Telegram Bot

### 2.1 Створіть бота

1. Відкрийте Telegram
2. Знайдіть [@BotFather](https://t.me/BotFather)
3. Відправте: `/newbot`
4. Введіть ім'я: `Solipsist Portfolio Bot`
5. Введіть username: `solipsist_portfolio_bot` (або інший доступний)
6. **Збережіть токен!** Виглядає так: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`

### 2.2 Отримайте Chat ID

1. Знайдіть [@userinfobot](https://t.me/userinfobot)
2. Натисніть Start
3. **Збережіть ваш ID!** Виглядає так: `123456789`

### 2.3 Активуйте бота

1. Знайдіть вашого бота в Telegram (за username)
2. Натисніть Start
3. Відправте будь-яке повідомлення

## Крок 3: Запуск бекенду

### Windows:

```bash
cd backend

# Створіть віртуальне оточення
python -m venv venv

# Активуйте його
venv\Scripts\activate

# Встановіть залежності
pip install -r requirements.txt

# Створіть .env файл
copy .env.example .env

# Відредагуйте .env (вставте ваші дані)
notepad .env
```

### Linux/Mac:

```bash
cd backend

# Створіть віртуальне оточення
python3 -m venv venv

# Активуйте його
source venv/bin/activate

# Встановіть залежності
pip install -r requirements.txt

# Створіть .env файл
cp .env.example .env

# Відредагуйте .env (вставте ваші дані)
nano .env
```

### Вміст .env файлу:

```env
TELEGRAM_BOT_TOKEN=ваш_токен_від_BotFather
TELEGRAM_CHAT_ID=ваш_chat_id
```

### Запустіть сервер:

```bash
python app.py
```

Ви побачите:
```
 * Running on http://0.0.0.0:5000
```

## Крок 4: Запуск фронтенду

### Варіант А: Просто відкрити файл

1. Відкрийте `index.html` у браузері
2. Готово!

### Варіант Б: Локальний сервер (рекомендовано)

**Python:**
```bash
# У корені portfolio-site
python -m http.server 8000
```

**Node.js (якщо встановлений):**
```bash
npx http-server -p 8000
```

**VS Code:**
- Встановіть розширення "Live Server"
- Правий клік на `index.html` → "Open with Live Server"

Відкрийте: `http://localhost:8000`

## Крок 5: Тестування

### 5.1 Перевірте бекенд

Відкрийте в браузері: `http://localhost:5000/api/health`

Повинно показати:
```json
{
  "status": "ok",
  "message": "API працює"
}
```

### 5.2 Перевірте форму

1. Відкрийте сайт
2. Прокрутіть до секції "Контакти"
3. Заповніть форму
4. Натисніть "Відправити"
5. Перевірте Telegram - повинно прийти повідомлення!

## 🐛 Вирішення проблем

### Помилка: "CORS policy"

**Проблема:** Браузер блокує запити до API

**Рішення:**
1. Переконайтесь, що бекенд запущений
2. Використовуйте локальний сервер для фронтенду (не просто відкривайте файл)
3. Перевірте, що в `app.py` є `CORS(app)`

### Помилка: "Connection refused"

**Проблема:** Бекенд не запущений або не доступний

**Рішення:**
1. Перевірте, чи запущений `python app.py`
2. Перевірте, чи правильний URL в `js/script.js` (має бути `http://localhost:5000`)

### Помилка: "Unauthorized" від Telegram

**Проблема:** Неправильний токен або Chat ID

**Рішення:**
1. Перевірте `.env` файл
2. Переконайтесь, що ви натиснули Start у вашого бота
3. Перевірте, що токен і Chat ID без пробілів

### Форма не відправляється

**Проблема:** JavaScript помилка

**Рішення:**
1. Відкрийте Console в браузері (F12)
2. Подивіться на помилки
3. Перевірте, чи правильний URL API в `script.js`

## 📝 Налаштування для продакшену

### 1. Змініть URL API

У `js/script.js` замініть:
```javascript
const response = await fetch('http://localhost:5000/api/contact', {
```

На:
```javascript
const response = await fetch('https://your-backend.herokuapp.com/api/contact', {
```

### 2. Додайте свої контакти

У `index.html` замініть:
- `@solipsist_dev` → ваш Telegram
- `solipsist.dev@gmail.com` → ваш Email
- `github.com/solipsist` → ваш GitHub

### 3. Додайте свої проєкти

У секції `#portfolio` додайте свої проєкти.

### 4. Налаштуйте SEO

Додайте у `<head>`:
- Meta description
- Open Graph теги
- Favicon

## 🌐 Деплой

### Фронтенд → GitHub Pages

```bash
# У корені portfolio-site
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/portfolio.git
git push -u origin main

# Увімкніть GitHub Pages в Settings → Pages
```

### Бекенд → Heroku

```bash
cd backend

# Створіть Procfile
echo "web: gunicorn app:app" > Procfile

# Деплой
heroku create solipsist-portfolio-api
heroku config:set TELEGRAM_BOT_TOKEN=your_token
heroku config:set TELEGRAM_CHAT_ID=your_chat_id
git init
git add .
git commit -m "Deploy backend"
git push heroku main
```

### Бекенд → Railway

1. Зареєструйтесь на [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Виберіть репозиторій
4. Додайте змінні оточення в Variables
5. Готово!

## ✅ Чеклист

- [ ] Створив Telegram бота
- [ ] Отримав Chat ID
- [ ] Налаштував .env файл
- [ ] Запустив бекенд (http://localhost:5000)
- [ ] Запустив фронтенд (http://localhost:8000)
- [ ] Протестував форму
- [ ] Отримав повідомлення в Telegram
- [ ] Змінив контакти на свої
- [ ] Додав свої проєкти
- [ ] Готовий до деплою!

## 📞 Потрібна допомога?

Якщо щось не працює:
1. Перевірте Console в браузері (F12)
2. Перевірте логи бекенду в терміналі
3. Перечитайте інструкції
4. Напишіть мені: @solipsist_dev

---

**Успіхів! 🚀**