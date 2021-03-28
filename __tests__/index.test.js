import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import genDiff from "../src/index.js";

const filePath = fileURLToPath(import.meta.url);
const dirPath = path.dirname(filePath);
const getFixturePath = (filename) =>
  path.join(dirPath, "..", "__fixtures__", filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), "utf-8");

test("gendiff", () => {
  const json1 = readFile("file1.json");
  const json2 = readFile("file2.json");
  const expected12 = readFile("expected12.txt");
  const expected21 = readFile("expected21.txt");
  expect(genDiff(json1, json2)).toEqual(expected12);
  expect(genDiff(json2, json1)).toEqual(expected21);
});
