<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quick Polls</title>
    <style>
        body {
            margin: 0;
            font-family: 'Arial Black', Gadget, sans-serif;
            background-color: #000;
            color: #fff;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .header {
            width: 100%;
            background-color: #ff0000;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5em;
        }
        .header p {
            margin: 0;
            font-size: 1.2em;
        }
        .poll-container {
            background-color: #111;
            padding: 40px;
            border-radius: 10px;
            width: 50%;
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.2);
            margin: 20px 0;
        }
        .poll-container h2 {
            text-align: center;
            color: #ff0000;
            font-size: 2em;
        }
        .option {
            background-color: #222;
            color: #ff0000;
            padding: 15px;
            margin: 15px 0;
            border: none;
            text-align: left;
            width: 100%;
            font-size: 1.2em;
            border-radius: 5px;
            cursor: pointer;
        }
        .option:hover {
            background-color: #333;
        }
        .footer {
            margin-top: 20px;
            color: #666;
            font-size: 1em;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Quick Polls</h1>
        <p>Your voice, your community</p>
    </div>
    <div class="poll-container">
        <h2>What is your favorite genre of music?</h2>
        <button class="option">Jazz</button>
        <button class="option">R&amp;B</button>
        <button class="option">Classical</button>
        <button class="option">Rap</button>
    </div>
    <div class="footer">
        &copy; 2024 Prism. All rights reserved.
    </div>
</body>
</html>
