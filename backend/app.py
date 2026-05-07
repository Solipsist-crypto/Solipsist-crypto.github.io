from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Дозволяємо запити з фронтенду

# Telegram Bot налаштування
TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
TELEGRAM_CHAT_ID = os.getenv('TELEGRAM_CHAT_ID')

@app.route('/api/contact', methods=['POST'])
def contact():
    """Обробка форми зв'язку"""
    try:
        data = request.json

        name = data.get('name', '')
        email = data.get('email', '')
        subject = data.get('subject', '')
        message = data.get('message', '')

        # Валідація
        if not all([name, email, subject, message]):
            return jsonify({
                'success': False,
                'message': 'Всі поля обов\'язкові'
            }), 400

        # Формуємо повідомлення для Telegram
        telegram_message = f"""
🔔 <b>Нове повідомлення з сайту!</b>

👤 <b>Ім'я:</b> {name}
📧 <b>Email:</b> {email}
📝 <b>Тема:</b> {subject}

💬 <b>Повідомлення:</b>
{message}
        """

        # Відправляємо в Telegram
        telegram_url = f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage'
        telegram_data = {
            'chat_id': TELEGRAM_CHAT_ID,
            'text': telegram_message,
            'parse_mode': 'HTML'
        }

        response = requests.post(telegram_url, json=telegram_data)

        if response.status_code == 200:
            return jsonify({
                'success': True,
                'message': 'Повідомлення успішно відправлено!'
            }), 200
        else:
            return jsonify({
                'success': False,
                'message': 'Помилка відправки. Спробуйте пізніше.'
            }), 500

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({
            'success': False,
            'message': 'Сталася помилка. Спробуйте пізніше.'
        }), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Перевірка роботи API"""
    return jsonify({
        'status': 'ok',
        'message': 'API працює'
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)