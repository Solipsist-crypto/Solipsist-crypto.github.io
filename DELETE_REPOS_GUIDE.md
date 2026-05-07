# 🗑️ Як видалити всі репозиторії з GitHub

## Варіант 1: Вручну (якщо їх мало)

1. Відкрити https://github.com/твій_username?tab=repositories
2. Для кожного репозиторію:
   - Відкрити репозиторій
   - Settings (внизу справа)
   - Прокрутити вниз до "Danger Zone"
   - Delete this repository
   - Ввести назву репозиторію для підтвердження
   - Натиснути "I understand the consequences, delete this repository"

## Варіант 2: Через GitHub CLI (швидше)

### Встановити GitHub CLI:
```bash
# Windows (через winget)
winget install --id GitHub.cli

# Або скачати з https://cli.github.com/
```

### Авторизуватись:
```bash
gh auth login
# Вибрати: GitHub.com → HTTPS → Yes → Login with a web browser
```

### Видалити всі репозиторії:
```bash
# Показати список всіх репозиторіїв
gh repo list --limit 1000

# Видалити всі (ОБЕРЕЖНО!)
gh repo list --limit 1000 --json name -q '.[].name' | xargs -I {} gh repo delete {} --yes

# Або по одному:
gh repo delete username/repo-name --yes
```

## Варіант 3: Через скрипт (найшвидше)

Створити файл `delete_all_repos.sh`:

```bash
#!/bin/bash

# Твій GitHub username
USERNAME="твій_username"

# Отримати список всіх репозиторіїв
REPOS=$(gh repo list $USERNAME --limit 1000 --json name -q '.[].name')

# Видалити кожен
for repo in $REPOS; do
    echo "Видаляю $repo..."
    gh repo delete "$USERNAME/$repo" --yes
done

echo "✅ Всі репозиторії видалено!"
```

Запустити:
```bash
chmod +x delete_all_repos.sh
./delete_all_repos.sh
```

## ⚠️ ВАЖЛИВО:

- Видалення НЕЗВОРОТНЄ!
- Всі дані, issues, wiki будуть втрачені
- Краще спочатку зробити backup важливих проєктів

## 🔄 Альтернатива: Зробити приватними

Якщо не хочеш видаляти, можна зробити приватними:

```bash
# Зробити всі репозиторії приватними
gh repo list --limit 1000 --json name -q '.[].name' | xargs -I {} gh repo edit {} --visibility private
```

---

**Рекомендація:** Видали все і почни з чистого аркуша з portfolio репозиторієм!