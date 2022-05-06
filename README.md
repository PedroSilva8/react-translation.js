## react-translation.js
A translation library to help react applications managing, loading and applying translations.

## Usage
Simple example of translation

Add context on top of page
```javascript
import TranslationJSContext from "react-translation.js"
ReactDOM.render(<React.StrictMode><TranslationJSContext><App/></TranslationJSContext></React.StrictMode>, document.getElementById("root"))
```
Add translation
```javascript
import  { LoadTrans, useTranslation } from 'react-translation.js'
const translation = useTranslation();
LoadTrans("pt", { global: { missing: { text: "Texto em Falta" } } }, translation, true)
```
Use translation
```javascript
import  { T } from 'react-translation.js'
T("global.missing.text")
```

T will return ```Texto em Falta```

You can also directly load a ```JSON.parse()``` into the LoadTrans function  

## Development
To build the library all you have to do is run the following commands

```
  yarn
  yarn build
```
