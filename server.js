const PORT = 8000;
import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = "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";

app.post("/completions", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.message }],
      max_tokens: 500,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
