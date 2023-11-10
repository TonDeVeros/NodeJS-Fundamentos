import fs from "node:fs/promises";
// import { dirname } from "node:path"; nao funciona com module

const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  // #database = {}; //com a hashtag vira uma propriedade privada
  database = {};

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.database));
  }

  select(table, search) {
    let data = this.database[table] ?? [];

    console.log(data)
    if (search) {
      data = data.filter( row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        })
      })
    }

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.database[table])) {
      this.database[table].push(data);
    } else {
      this.database[table] = [data];
    }

    this.#persist();

    return data;
  }

  Update(table, id, data) {
    //procura o id na tabela
    const rowIndex = this.database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      //splice remove o id encontrado
      this.database[table][rowIndex] = { id, ...data };
      this.#persist();
    }
  }

  Delete(table, id) {
    //procura o id na tabela
    const rowIndex = this.database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      //splice remove o id encontrado
      this.database[table].splice(rowIndex);
      this.#persist();
    }
  }
}
