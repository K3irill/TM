# 🚀 Настройка Directus для TARIMI

## Быстрый старт

### 1. Запуск Directus

```bash
cd directus/tarimi/directus
docker compose up -d
```

Directus будет доступен по адресу: `http://localhost:8055`

### 2. Первый вход

1. Открой `http://localhost:8055`
2. Создай администратора (email и пароль)

### 3. Создание Static Access Token

1. В Directus перейди в **Settings** → **Access Tokens**
2. Нажми **Create Token**
3. Укажи:
   - **Name**: `Frontend API`
   - **Permissions**: `Read` (для публичного доступа)
   - Или `Full Access` (если нужны права на запись)
4. Скопируй токен и добавь в `.env.local`:
   ```
   DIRECTUS_STATIC_TOKEN=твой_токен
   ```

### 4. Создание коллекций

В Directus создай следующие коллекции:

#### Products (Товары)

1. **Settings** → **Data Model** → **Create Collection**
2. **Collection Name**: `products`
3. Добавь поля:

| Field Name | Type | Options |
|------------|------|---------|
| `name` | String | Required |
| `slug` | String | Required, Unique |
| `img` | File | Single file |
| `category` | Dropdown | Values: sets, ramen, snacks, figures, sweets, drinks, clothes, sweet-sets |
| `price` | Decimal | Required |
| `oldPrice` | Decimal | Optional |
| `desc` | Text | Required |
| `hot` | Boolean | Default: false |
| `new` | Boolean | Default: false |
| `salePercent` | Integer | Optional |
| `limited` | Boolean | Default: false |
| `comingSoon` | Boolean | Default: false |
| `outOfStock` | Boolean | Default: false |
| `dateAdded` | Date | Required |
| `wbUrl` | String | Optional |
| `ozonUrl` | String | Optional |

#### RamenSets (Наборы TARIMI)

1. **Create Collection**: `ramen_sets`
2. Сначала создай **Component** `label`:
   - **Settings** → **Data Model** → **Components** → **Create Component**
   - **Component Name**: `label`
   - Поля:
     - `text` (String, Required)
     - `tone` (Dropdown: hot, new, sale, limited, mild, Required)
3. Вернись к `ramen_sets` и добавь поля:

| Field Name | Type | Options |
|------------|------|---------|
| `name` | String | Required |
| `link` | String | Required |
| `img` | File | Single file, Required |
| `desc` | Text | Required |
| `wbUrl` | String | Optional |
| `ozonUrl` | String | Optional |
| `topLabel` | Component | Component: `label`, Optional |
| `labels` | Component | Component: `label`, Repeatable, Optional |

#### AboutBrand (О бренде TARIMI)

1. **Create Collection**: `about_brand` (тип: **Singleton**)
2. Сначала создай **Component** `paragraph`:
   - **Component Name**: `paragraph`
   - Поле: `content` (Text, Required)
3. Вернись к `about_brand` и добавь поля:

| Field Name | Type | Options |
|------------|------|---------|
| `title` | String | Required |
| `images` | Files | Multiple files, Required |
| `heading` | String | Required |
| `paragraphs` | Component | Component: `paragraph`, Repeatable, Required |
| `highlight` | String | Optional |

### 5. Настройка прав доступа

1. **Settings** → **Roles & Permissions** → **Public**
2. Для каждой коллекции (`products`, `ramen_sets`, `about_brand`) разреши:
   - **Read Access**: `All Access` или `Use Custom Permission`
   - Для `products` и `ramen_sets`: можно читать все записи
   - Для `about_brand`: можно читать singleton

### 6. Установка зависимостей в основной проект

```bash
npm install @directus/sdk
```

### 7. Настройка переменных окружения

Создай `.env.local` в корне проекта:

```env
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
DIRECTUS_STATIC_TOKEN=твой_статический_токен
```

### 8. Проверка работы

После настройки проверь API:

- `http://localhost:8055/items/products`
- `http://localhost:8055/items/ramen_sets`
- `http://localhost:8055/items/about_brand`

Должен вернуться JSON с данными.

## Управление контентом

После настройки ты сможешь управлять контентом через админ-панель Directus:

- **Товары**: Добавляй, редактируй и удаляй товары на странице `/goods`
- **Наборы TARIMI**: Управляй секцией "Наборы TARIMI" на главной странице
- **О бренде TARIMI**: Редактируй секцию "О бренде TARIMI" на главной странице

Все изменения будут автоматически отображаться на сайте!
