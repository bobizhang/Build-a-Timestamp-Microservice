import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

app.get("/api", (req, res) => {
  const now = new Date();
  const unixTime = Math.floor(now.getTime());
  const utcTime = now.toUTCString();
  res.json({
    unix: unixTime,
    utc: utcTime
  });
})

app.get("/api/:date", (req, res) => {
  let param = req.params.date;

  if (typeof param === "string" && param.trim() !== "" && !isNaN(param)) {
    param = Number(param);
  }

  const date = new Date(param);

  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
})

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
