# Курсовой проект

- Курсовой проект (КП) студента специальности 09.02.07 Информационные системы и программирование, квалификация разработчик веб- и -мультимедийных приложений
- Тема: Веб-приложение электронных книг "Фантастика"
- Студент, группы Веб-21-1: Нестерук Анатолий Сергеевич

# Структура
- [DOC017.pdf](https://github.com/user-attachments/files/15593177/DOC017.pdf)
- [Курсовой проект (Нестерук) (нет пути домой) — копия.docx](https://github.com/user-attachments/files/15593185/default.docx)
- [Курсовой проект (Нестерук) (нет пути домой) — копия.pdf](https://github.com/user-attachments/files/15593212/default.pdf)
- [Презентация.pptx](https://github.com/user-attachments/files/15593383/default.pptx)

## Oбновление гита:

- $ git add .
- $ git commit -m ""
- $ git push -u origin main

## Установка

- GIT (https://git-scm.com/downloads) - любую говую версию
- Node.js (https://nodejs.org/en) - минимальная версия 18.16.0 
- PostgresSql (https://www.postgresql.org/download/) - минимальная версия 12 стабильная

После установки nodejs и postgres, необходимо скачать репозиторий с ветками проекта. Открываем свою папку и создаём в ней две папки front и back


### Front:
Открываем терминал и пишем:
```
git clone https://github.com/AnacondazNS/kurs.git

cd front # - переходим в папку в терминале

npm i # - Устанавливаем nodejs-модули (зависимости)
npm run dev # - запускаем проект
```

### Back:
Открываем ещё один терминал в нашей папке и пишем туда для бека:
```
cd back # - переходим в папку в терминале
```

После этого, создаём в папке back файл .env и пишем туда следующее:

```
PORT=3000

DB_NAME=" " # - Указываем название своей бд
DB_USER="postgres" # - Указываем название юзера (изначально postgres)
DB_PASS=" " # - Указываем пароль от юзера (изначально postgres)
DB_HOST="localhost"
DB_PORT=5432

SECRET_KEY="secret_123"
```

После, создаём в папке back папку static, где внутри папки создаём ещё три папки:
```
- books
- genre-previews
- previews
```
Далее, возвращаемся в терминал для бэка и пишем это:
```
npm i # - Устанавливаем nodejs-модули (зависимости)
npm run dev # - запускаем проект
```
В терминале для front переходим по ссылке Local: 
```
http://localhost:8000/
```
