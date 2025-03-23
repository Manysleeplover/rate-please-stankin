const parser = require('rector-schedule-parser');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const cron = require('node-cron'); // Подключаем node-cron для шедулера

const app = express();
const port = 3030;

// Настройка multer для сохранения файлов в папку 'uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Добавляем timestamp к имени файла
    }
});

/**
 * Конфигурация директории и именования выгрузки файлов
 * @type {Multer}
 */
const upload = multer({ storage: storage });

// Функция для очистки директории uploads
function clearUploadsDirectory() {
    const uploadDir = path.join(__dirname, '../uploads');

    // Проверяем, существует ли директория
    if (!fs.existsSync(uploadDir)) {
        console.log(`Директория ${uploadDir} не существует.`);
        return;
    }

    // Читаем содержимое директории
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            console.error(`Ошибка при чтении директории: ${err.message}`);
            return;
        }

        // Удаляем каждый файл в директории
        for (const file of files) {
            const filePath = path.join(uploadDir, file);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Ошибка при удалении файла ${filePath}: ${err.message}`);
                } else {
                    console.log(`Файл ${filePath} успешно удалён.`);
                }
            });
        }
    });
}

// Настройка шедулера (например, каждую минуту)
cron.schedule('0 1 * * *', () => {
    console.log('Запуск задачи очистки директории uploads...');
    clearUploadsDirectory();
});

// Эндпоинт для обработки /upload роута, парсит файл, выводит в лог json
app.post('/upload', upload.single('pdfFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Файл не был загружен' });
    }

    // Получаем путь к загруженному файлу
    const filePath = req.file.path;

    // Читаем содержимое файла
    fs.readFile(filePath, async (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Ошибка при чтении файла', error: err });
        }

        // Здесь data - это содержимое файла в виде Buffer
        // Вы можете передать его в парсер или обработать как-то иначе
        let json = await parser.parseBuffer(data).then();

        let stringJSON = JSON.stringify(json);
        sendScheduleJsonToServer(stringJSON);

        // Отправляем ответ с содержимым файла
        res.json({
            message: 'Файл успешно загружен и прочитан',
            file: req.file,
            content: data.toString('base64'),
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
    console.log('Совершается отправка на backend');
    console.log(scheduleJson);
    axios
        .post('http://localhost:8081/schedule', scheduleJson, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log(response.status);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error.status);
        });
};