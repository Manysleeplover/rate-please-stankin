const parser = require('rector-schedule-parser');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require("axios");
const {
  log
} = require("debug");
const {
  response
} = require("express"); // Подключаем модуль fs для работы с файловой системой

const app = express();
const port = 3030;

// Настройка multer для сохранения файлов в папку 'uploads'
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Добавляем timestamp к имени файла
  }
});

/**
 * Конфигурация директории и именования выгрузки файлов
 * @type {Multer}
 */
const upload = multer({
  storage: storage
});

// Эндпоинт для обработки /upload роута, парсит файл, выводит в лог json
app.post('/upload', upload.single('pdfFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: 'Файл не был загружен'
    });
  }

  // Получаем путь к загруженному файлу
  const filePath = req.file.path;

  // Читаем содержимое файла
  fs.readFile(filePath, async (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Ошибка при чтении файла',
        error: err
      });
    }

    // Здесь data - это содержимое файла в виде Buffer
    // Вы можете передать его в парсер или обработать как-то иначе
    let json = await parser
        .parseBuffer(data)
        .then()

    let stringJSON = JSON.stringify(json);
    sendScheduleJsonToServer(stringJSON)

    // Пример использования парсера (если он поддерживает Buffer)
    // const parsedData = parser.parse(data);
    // console.log(parsedData);

    // Отправляем ответ с содержимым файла
    res.json({
      message: 'Файл успешно загружен и прочитан',
      file: req.file,
      content: data.toString('base64')
    });
  });
});


/**
 * Запуск сервера
 */
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

const sendScheduleJsonToServer = (scheduleJson) => {
  console.log("Совершаяется отправка на bakcend")
  console.log(scheduleJson)
  axios.post('http://localhost:8081/schedule', scheduleJson, {
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((response) => {
    console.log(response.status)
    console.log(response.data)
  }).catch((error) => {
    console.log(error.status)
  })
}