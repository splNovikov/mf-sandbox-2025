# Module Federation Sandbox 2025

Этот проект демонстрирует использование Module Federation для создания микрофронтенд архитектуры.

## Структура проекта

- `apps/channel/` - Channel приложение, которое импортирует и встраивает виджет
- `apps/widget/` - Widget приложение, которое экспортирует виджет через module federation

## Запуск приложений

### 1. Запуск Widget App (порт 3001)

```bash
cd apps/widget
npm install
npm start
```

### 2. Запуск Channel App (порт 3000)

```bash
cd apps/channel
npm install
npm start
```

## Как это работает

1. **Widget App** экспортирует компонент `Widget` через Module Federation
2. **Channel App** импортирует виджет и отображает его внутри себя
3. Оба приложения используют общие зависимости (React, React-DOM) для избежания дублирования

## Особенности

- Интерактивный виджет с счетчиком и текстовым вводом
- Поддержка тем (светлая/темная)
- Динамическая загрузка компонентов
- Обработка ошибок при недоступности remote модулей
- Совместное использование зависимостей
- CORS настройки для cross-origin запросов

## Технологии

- React 19
- TypeScript
- Webpack 5
- Module Federation
- HTML Webpack Plugin
