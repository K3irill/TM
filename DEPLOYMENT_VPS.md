# Деплой на чистый VPS: **Frontend (Next.js) на PM2** + **Directus (Docker)** + **Nginx** + **SSL**

Документ рассчитан на твой текущий проект (монорепа):

- **Frontend**: Next.js (`package.json` в корне), деплоим как Node-процесс через **PM2**.
- **Directus**: лежит в репозитории в `directus/tarimi/directus/` и запускается через **Docker Compose**.
- **База Directus**: PostgreSQL/PostGIS в Docker, переносим через **pg_dump/psql** (рекомендуется) или копированием папки `data/database` (быстро, но менее безопасно).

---

## 0) Что нужно заранее

- **VPS**: Ubuntu 22.04/24.04 (желательно), SSH-доступ.
- **Домен**:
  - `site.ru` → фронт
  - `admin.site.ru` → directus (админка/API)
- **DNS**:
  - A запись `site.ru` → IP VPS
  - A запись `admin.site.ru` → IP VPS
- **Репозиторий**: этот проект (Next.js `15.5.5`, `pnpm`) + директория Directus внутри репо.

---

## 1) Подготовка сервера (Ubuntu)

### 1.1 Обновление системы

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Установка базовых утилит

```bash
sudo apt install -y git curl ufw nginx
```

### 1.3 Firewall (UFW)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
sudo ufw status
```

---

## 2) Установка Docker + Docker Compose

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
newgrp docker
docker --version
docker compose version
```

---

## 3) Структура каталогов на VPS

Рекомендую держать проект в `/srv/tarimi/app`:

```bash
sudo mkdir -p /srv/tarimi
sudo chown -R $USER:$USER /srv/tarimi

mkdir -p /srv/tarimi/app /srv/tarimi/backups
```

---

## 4) Клонирование репозитория на VPS

```bash
cd /srv/tarimi/app
git clone <URL_ТВОЕГО_РЕПО> .
```

---

## 5) Directus (админка) — запуск в Docker

### 5.1 Создай `.env` для Directus (обязательно)

В твоём репо compose лежит тут: `directus/tarimi/directus/docker-compose.yaml` и использует переменные `${...}`.
Создай файл:

`/srv/tarimi/app/directus/tarimi/directus/.env`

Минимальный пример (замени `site.ru` и пароли):

```env
DIRECTUS_PORT=8055

DB_DATABASE=tarimi_db
DB_USER=tarimi_admin
DB_PASSWORD=tarimi237930

DIRECTUS_SECRET=tarimi237930tarimi237930tarimi23

ADMIN_EMAIL=admin@tarimi.ru
ADMIN_PASSWORD=tarimi237930
PUBLIC_URL=https://admin.tarimi.ru

CACHE_ENABLED=true
CACHE_AUTO_PURGE=true
WEBSOCKETS_ENABLED=true

# Если админка на отдельном домене — обычно ок включить
CORS_ENABLED=true
CORS_ORIGIN=true

REFRESH_TOKEN_COOKIE_SECURE=true
REFRESH_TOKEN_COOKIE_SAME_SITE=None
REFRESH_TOKEN_COOKIE_DOMAIN=admin.tarimi.ru

SESSION_COOKIE_SECURE=true
SESSION_COOKIE_SAME_SITE=None
SESSION_COOKIE_DOMAIN=admin.tarimi.ru

EXTENSIONS_PATH=./extensions
EXTENSIONS_AUTO_RELOAD=false
EXTENSIONS_ROLLDOWN=false
CONTENT_SECURITY_POLICY_DIRECTIVES__FRAME_SRC='self'
```

### 5.2 Запусти Directus

```bash
cd /srv/tarimi/app/directus/tarimi/directus
docker compose up -d
docker compose ps
curl -I http://127.0.0.1:8055/
```

> Примечание: в твоём compose БД и uploads примонтированы как папки репозитория:
>
> - `directus/tarimi/directus/data/database` — данные PostgreSQL
> - `directus/tarimi/directus/uploads` — файлы (картинки)

---

## 6) Frontend (Next.js) — сборка и запуск через PM2

### 6.1 Установи Node.js 20 + pnpm + pm2

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo corepack enable
sudo npm i -g pm2
node -v
pnpm -v
pm2 -v
```

### 6.2 ENV для фронта

В этом проекте Directus URL берётся из `NEXT_PUBLIC_DIRECTUS_URL` (см. `src/shared/services/directus/client.ts`).
Создай файл:

`/srv/tarimi/app/.env.production`

```env
NEXT_PUBLIC_DIRECTUS_URL=https://admin.site.ru
```

### 6.3 Сборка и запуск

```bash
cd /srv/tarimi/app
npm install
npm build

pm2 start "npm start -- -p 3000" --name tarimi-front
pm2 save
pm2 startup systemd -u $USER --hp $HOME
```

```bash
curl -I http://127.0.0.1:3000/
pm2 status
```

---

## 7) Nginx reverse proxy (site.ru + admin.site.ru)

### 7.1 Конфиг Nginx

Создай файл `/etc/nginx/sites-available/tarimi.conf`:

```nginx
server {
  listen 80;
  server_name site.ru www.site.ru;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}

server {
  listen 80;
  server_name admin.site.ru;

  client_max_body_size 50m;

  location / {
    proxy_pass http://127.0.0.1:8055;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Активируй:

```bash
sudo ln -s /etc/nginx/sites-available/tarimi.conf /etc/nginx/sites-enabled/tarimi.conf
sudo nginx -t
sudo systemctl reload nginx
```

---

## 8) SSL (Let’s Encrypt)

### 8.1 Установка certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 8.2 Выпуск сертификатов

```bash
sudo certbot --nginx -d site.ru -d www.site.ru -d admin.site.ru
```

Проверка автопродления:

```bash
sudo certbot renew --dry-run
```

---

## 9) Перенос данных Directus с dev на VPS

У тебя dev-Directus тоже в Docker. Правильный способ переноса БД — **pg_dump → restore**.

### 9.1 Дамп БД на dev

Перейди в папку Directus на dev и найди контейнер БД:

```bash
cd directus/tarimi/directus
docker ps

# Найди контейнер сервиса database (Postgres/PostGIS)
docker compose ps

# Дамп (выполняется внутри контейнера database)
docker compose exec -T database pg_dump -U "$DB_USER" -d "$DB_DATABASE" > directus_dump.sql
```

Скопируй дамп на VPS:

```bash
scp directus_dump.sql root@VPS_IP:/srv/tarimi/backups/directus_dump.sql
```

### 9.2 Restore на VPS

```bash
cd /srv/tarimi/app/directus/tarimi/directus
docker compose exec -T database psql -U "$DB_USER" -d "$DB_DATABASE" < /srv/tarimi/backups/directus_dump.sql
```

### 9.3 Перенос uploads (файлы/картинки)

На dev у тебя uploads — это папка `directus/tarimi/directus/uploads/`. Её нужно скопировать на VPS в ту же папку внутри репозитория:

```bash
rsync -av --progress directus/tarimi/directus/uploads/ root@VPS_IP:/srv/tarimi/app/directus/tarimi/directus/uploads/
```

После копирования на VPS:

```bash
cd /srv/tarimi/app/directus/tarimi/directus
docker compose restart directus
```

---

## 10) Обновления

### 10.1 Обновить фронт (PM2)

```bash
cd /srv/tarimi/app
git pull
pnpm install
pnpm build
pm2 restart tarimi-front
```

### 10.2 Обновить Directus

```bash
cd /srv/tarimi/app/directus/tarimi/directus
docker compose pull
docker compose up -d
```

---

## 11) Бэкапы (минимум)

- **DB**: ежедневный `pg_dump` в `/srv/tarimi/backups`
- **uploads**: rsync/архив директории uploads/volume

Пример cron для Postgres (псевдо):

```bash
crontab -e
```

```cron
0 3 * * * cd /srv/tarimi/app/directus/tarimi/directus && docker compose exec -T database pg_dump -U "$DB_USER" -d "$DB_DATABASE" > /srv/tarimi/backups/directus_$(date +\%F).sql
```

---

## 12) Частые проблемы

- **Пустые картинки на проде**: забыли перенести `uploads` или неправильный `PUBLIC_URL`.
- **CORS/доступ к API**: в Directus настрой `PUBLIC_URL`, а в Frontend `NEXT_PUBLIC_DIRECTUS_URL=https://admin.site.ru`.
- **Большие загрузки**: увеличь `client_max_body_size` в Nginx (пример выше: `50m`).

---

## 13) Что нужно подставить под твой проект

- Домены: `site.ru`, `admin.site.ru`
- Пароли/секреты Directus: `DIRECTUS_SECRET`, `DB_PASSWORD`, `ADMIN_PASSWORD`
- Проверь, что в `directus/tarimi/directus/.env` выставлены `PUBLIC_URL` и cookie domain под твой домен
