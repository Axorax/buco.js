<p align="center"><img src="https://raw.githubusercontent.com/Axorax/buco.js/main/buco.js.svg"/></p>

<p align="center">Simple fetch library for nodejs</p>

## ⚙️ Installation

```terminal
npm i buco
```

## 📘 Usage

#### • Import buco

```js
// ES6
import buco from 'buco';

// commonjs
const buco = require('buco');
```

#### • GET request

```js
async function test() {
    const data = await buco.get("https://zenquotes.io/api/random");
    console.log(JSON.parse(data));
}

test();
```

```js
buco.get("https://zenquotes.io/api/random").then(data => {
    console.log(JSON.parse(data));
});
```

#### • GET request and convert to json

```js
async function test() {
    const data = await buco.get("https://zenquotes.io/api/random").json();
    console.log(data);
}

test();
```

```js
async function test() {
    const data = await buco.get("https://zenquotes.io/api/random", {
        json: true
    });
    console.log(data);
}

test();
```

#### • POST request

```js
async function test() {
    const data = await buco.post(`https://is.gd/create.php?format=json&url=https://github.com/Axorax/buco.js`).json();
    console.log(data);
}

test()
```

---

[Support me on Patreon](https://www.patreon.com/axorax) - 
[Check out my socials](https://github.com/axorax/socials)
