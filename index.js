const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'feedbacks.json');

app.use(cors());
app.use(bodyParser.json());


const readData = () => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
            return [];
        }
        const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading data:", error);
        return [];
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error writing data:", error);
    }
};


app.get('/api/feedback', (req, res) => {
    const { status, eventName } = req.query;
    
    let data = readData();
    if (status) {
        data = data.filter(f => f.status === status);
    }
    if (eventName) {
        data = data.filter(f => f.eventName.toLowerCase().includes(eventName.toLowerCase()));
    }

    res.json({
        message: "Data fetched successfully",
        total: data.length,
        data: data
    });
});

app.post('/api/feedback', (req, res) => {
    const { name, email, eventName, division, rating, comment, suggestion } = req.body;

    if (!name || !email || !eventName || !division || !rating) {
        return res.status(400).json({ message: "Field wajib harus diisi!" });
    }

    const newFeedback = {
        id: uuidv4(),
        name,
        email,
        eventName,
        division,
        rating: parseInt(rating),
        comment: comment || "",
        suggestion: suggestion || "",
        createdAt: new Date().toISOString(),
        status: "open" 
    };


    const currentData = readData();
    currentData.push(newFeedback);
    writeData(currentData);

    res.status(201).json({
        message: "Feedback created successfully",
        data: newFeedback
    });
});

app.put('/api/feedback/:id', (req, res) => {
    const { id } = req.params;
    const { status, eventName, division, rating, comment, suggestion } = req.body;

    const currentData = readData();
    const index = currentData.findIndex(f => f.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Feedback not found" });
    }

    currentData[index] = {
        ...currentData[index],
        status: status || currentData[index].status,
        eventName: eventName || currentData[index].eventName,
        division: division || currentData[index].division,
        rating: rating || currentData[index].rating,
        comment: comment !== undefined ? comment : currentData[index].comment,
        suggestion: suggestion !== undefined ? suggestion : currentData[index].suggestion
    };

    writeData(currentData);

    res.json({
        message: "Feedback updated successfully",
        data: currentData[index]
    });
});

app.delete('/api/feedback/:id', (req, res) => {
    const { id } = req.params;
    
    let currentData = readData();
    const initialLength = currentData.length;

    currentData = currentData.filter(f => f.id !== id);

    if (currentData.length === initialLength) {
        return res.status(404).json({ message: "Feedback not found" });
    }

    writeData(currentData);

    res.json({ message: "Feedback deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("Data will be stored in 'feedbacks.json'");
});