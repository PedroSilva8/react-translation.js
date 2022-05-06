## translation.js
A translation library to help applications managing, loading and applying translations.

## Usage
Simple example of translation

```javascript
import TranslationJS, { T } from "@pedro_s/translation.js"
TranslationJS.LoadTranslation("pt", { user: { name: "nome" } }, true)
T("user.name")
```
T will return ```nome```

You can also directly load a ```JSON.parse()``` into the LoadTranslation function  

## Development
To build the library all you have to do is run the following commands

```
  yarn
  yarn build
```
