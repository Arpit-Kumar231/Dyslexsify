const PORT = 8000;
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Or specific origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());
// add your own api keys

let textData = "";

app.post("/completions", async (req, res) => {
  if (req.body.service === "ChatGPT") {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `${req.body.message}`,
          },
        ],
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
  }
  if (req.body.service === "Mistral") {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY2}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-inst-v0-1-32k",
        messages: [
          {
            role: "user",
            content: `${req.body.message} summarize and simplify under 40 words `,
          },
        ],
        max_tokens: 500,
      }),
    };
    try {
      const response = await fetch(
        "https://chat.tune.app/api/chat/completions",
        options
      );
      const data = await response.json();

      // const data2 = {choices : [{mes}]}
      // if (set === "hi") {
      //   res.send(
      //     "Hello , Dyslexify AI here your friendly neighbourhood dyslexic assistant"
      //   );
      // }
      res.send(data);
    } catch (err) {
      console.error(err);
    }
  }
  if (req.body.service === "Gemma") {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY3}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma-7b-it",
        messages: [
          {
            role: "user",
            content: `${req.body.message}  `,
          },
        ],
        max_tokens: 500,
      }),
    };
    try {
      const response = await fetch(
        "https://chat.tune.app/api/chat/completions",
        options
      );
      const data = await response.json();
      res.send(data);
    } catch (err) {
      console.error(err);
    }
  }
  if (req.body.service === "Code-Llama") {
    const response = await fetch(
      "https://api.deepinfra.com/v1/openai/chat/completions",
      {
        method: "POST",
        body: JSON.stringify({
          model: "Phind/Phind-CodeLlama-34B-v2",
          messages: [
            {
              role: "user",
              content: `${req.body.message} `,
            },
          ],
          max_tokens: 500,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${API_KEY5}`,
        },
      }
    );
    const data = await response.json();
    res.send(data);
  }
  if (req.body.service === "openhermes-2-5-m7b-4k") {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY4}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openhermes-2-5-m7b-4k",
        messages: [
          {
            role: "user",
            content: `${req.body.message}  `,
          },
        ],
        max_tokens: 500,
      }),
    };
    try {
      const response = await fetch(
        "https://chat.tune.app/api/chat/completions",
        options
      );
      const data = await response.json();
      res.send(data);
    } catch (err) {
      console.error(err);
    }
  }

  if (req.body.service === "DALL-E") {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "Chrome",
      },
      body: JSON.stringify({
        prompt: `${req.body.message} `,
        n: 1,
        size: "512x512",
      }),
    };
    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        options
      );
      const data = await response.json();
      console.log(data.data[0].url);
      res.send(data);
    } catch (err) {
      console.error(err);
    }
  }
  if (req.body.service === "stable-diffusion") {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY5}`,
        "Content-Type": "application/json",
        "User-Agent": "Chrome",
      },
      body: JSON.stringify({
        prompt: `${req.body.message} `,
      }),
    };
    try {
      const response = await fetch(
        "https://api.deepinfra.com/v1/inference/stabilityai/stable-diffusion-2-1",
        options
      );
      const data = await response.json();
      console.log(data.images[0]);
      res.send(data.images);
    } catch (err) {
      console.error(err);
    }
  }
  if (req.body.service === "DreamShaper") {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY5}`,
        "Content-Type": "application/json",
        "User-Agent": "Chrome",
      },
      body: JSON.stringify({
        prompt: `${req.body.message} `,
      }),
    };
    try {
      const response = await fetch(
        "https://api.deepinfra.com/v1/inference/Lykon/DreamShaper",
        options
      );
      const data = await response.json();
      console.log(data.images[0]);
      res.send(data.images);
    } catch (err) {
      console.error(err);
    }
  }
});
app.post("/", (req, res) => {
  textData = req.body.text; // Store the received text
  console.log("Received text: ", textData);
  return res
    .status(200)
    .json({ message: "Data received successfully", textData: textData });
});
app.get("/", (req, res) => {
  return res.status(200).json({ text: textData });
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
