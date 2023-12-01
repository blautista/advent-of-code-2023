import { printSolutions, readInput } from "../utils.js";
import { EOL } from "os";

const rawInput = readInput(import.meta.url);

function parseInput(input: string) {
  return input.split(EOL);
}

function solve1(rows: string[]): number {
  return rows
    .map((row) => {
      const onlyDigits = row.replaceAll(/[^0-9]/g, "");

      const firstDigit = onlyDigits.at(0);
      const lastDigit = onlyDigits.at(-1) ?? firstDigit;

      return Number(`${firstDigit}${lastDigit}`);
    })
    .reduce((prev, curr) => prev + curr, 0);
}

const numberMap: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function getFirstDigit(str: string): number {
  let temp = "";

  for (let i = 0; i < str.length; i++) {
    const c = str[i];

    if (Number.isInteger(Number(c))) {
      return Number(c);
    }

    temp += c;

    for (const key of Object.keys(numberMap)) {
      if (temp.includes(key)) {
        return numberMap[key];
      }
    }
  }

  throw new Error(`problem parsing ${str}`);
}

function getLastDigit(str: string): number {
  let temp = "";

  for (let i = str.length - 1; i >= 0; i--) {
    const c = str[i];

    if (Number.isInteger(Number(c))) {
      return Number(c);
    }

    temp = c + temp;

    for (const key of Object.keys(numberMap)) {
      if (temp.includes(key)) {
        return numberMap[key];
      }
    }
  }

  throw new Error(`problem parsing ${str}`);
}

function solve2(rows: string[]) {
  return rows
    .map((row) => Number(`${getFirstDigit(row)}${getLastDigit(row)}`))
    .reduce((prev, curr) => prev + curr, 0);
}

const parsedInput = parseInput(rawInput);

const firstSolution = solve1(parsedInput);
const secondSolution = solve2(parsedInput);

printSolutions(firstSolution, secondSolution);
