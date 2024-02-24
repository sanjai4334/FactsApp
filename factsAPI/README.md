# factsAPI

factsAPI is an API that provides random facts from a list of facts using FastAPI.

## Features

- Provides random facts through an API.
- Facts are loaded from a text file.
- Facts are shuffled to ensure variety.
- Uses two Stacks to store facts.
- It prevents repetition of fact till all facts are returned.

## Table of Contents

- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
- [How to Contribute](#how-to-contribute)

## Dependencies

The application uses the following Python libraries:

- [FastAPI](https://pypi.org/project/fastapi/) - A modern, fast (high-performance), web framework for building APIs with Python.

- [Uvicorn](https://pypi.org/project/uvicorn/) - Uvicorn is an ASGI web server implementation for Python.

## Installation

   > **Note:** If you already have the web APP running in the terminal, open another terminal and skip to **Step 2**.

1. Clone the repository:

   ```bash
   git clone https://github.com/sanjai4334/FactsApp.git
   ```

2. Open the directory in your terminal.

   ```bash
   cd FactsApp/factsAPI
   ```

3. Install the dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the application:

    ```bash
    uvicorn main:app --reload
    ```


## Usage

- The app will run at: `http://127.0.0.1:8000/` by default.

- Go to `http://127.0.0.1:8000/get-fact` to get a random fact in JSON fromat.
- Add more facts to `facts.txt` to expand the list.

- Response Format :
```JSON
{"fact" : "A random interesting fact."}
```

## How to Contribute

Contributions to the project are welcome! Here are some ways you can contribute:

- Report bugs and suggest new features by opening a GitHub issue.
- Fix bugs or add new features by opening pull requests.
- Improve documentation and add examples.
