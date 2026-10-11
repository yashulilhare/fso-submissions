# Part 0: Fundamentals of how web application works Exercise submissions

## Exercise 0.4: New Note diagram - solution

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note right of browser: Clicking Save button triggers post request to send new note to the server
    activate server
    server->>browser: Status code 302 - URL redirect
    deactivate server

    Note left of server: Server saves the note and responds with status code 302 which is url redirect and asks browser to perform a new HTTP GET request to address defined in headers Location which will be /notes

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML Document
    deactivate server

    Note right of browser: Request to /notes reloads the page which causes three more HTTP requests

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Note right of browser: Browser encounters <link> element which initiates request to get CSS file
    activate server
    server-->>browser: The CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    Note right of browser: Browser encounters <script> element which initiates request to get the Javascript file
    activate server
    server-->>browser: The Javascript File
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: The JSON data ex., [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```
## Exercise 0.5: Single Page App (SPA) diagram - solution

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: The CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: The Javascript file (spa.js)
    deactivate server
    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: The Json Data: ex., [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server
    Note right of browser: The browser takes JSON data and executes the callback function that renders the notes
```

## Exercise 0.6: New note in Single Page App diagram - solution

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Status code 201 (Created). Payload - JSON - Newly created note object
    deactivate server
    
    Note right of browser: Status code 201 indicates the new note has been created. Browser executes the code to render newly created note at last of the list.
```