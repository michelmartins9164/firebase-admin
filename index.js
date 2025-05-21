const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();

// Habilita CORS para todas as origens
app.use(cors());

app.use(express.json());

app.post("/send-notification", async (req, res) => {
  const { token, title, body } = req.body;

  const message = {
    notification: { title, body },
    token,
  };

  try {
    const response = await admin.messaging().send(message);
    res.status(200).send(`Mensagem enviada com sucesso: ${response}`);
  } catch (error) {
    res.status(500).send(`Erro ao enviar: ${error}`);
  }
});

app.listen(3000, () => {
  console.log("🔥 Servidor rodando em http://localhost:3000");
});