# JSON Schema Generator from TypeScript Types

This project generates a JSON Schema from TypeScript types using `ts-json-schema-generator`.

## 📌 Prerequisites
Ensure you have **Node.js** and **npm** installed.

## 🚀 Installation
Install `ts-json-schema-generator` globally:
```sh
npm install -g ts-json-schema-generator
```

## ⚡ Generate JSON Schema
Run the following command to generate a schema.json file:

```sh
ts-json-schema-generator --path lib/sentenceData.ts --type Sentence > lib/schema.json
```