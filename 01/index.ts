import { printSolutions, readInput } from "../utils.js";
import { EOL } from "os";

const rawInput = readInput(import.meta.url);

function parseInput(input: string) {
  return input.split(EOL);
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

function getRowCalibrationValue(row: string): number {
  return Number(`${getFirstDigit(row)}${getLastDigit(row)}`);
}

function getCalibrationValues(rows: string[]): number[] {
  return rows.map(getRowCalibrationValue);
}

function solve1(input: string): number {
  return getCalibrationValues(parseInput(input)).reduce((prev, curr) => prev + curr, 0);
}

function solve2(input: string) {
  return solve1(input);
}

const firstSolution = solve1(rawInput);
const secondSolution = solve2(rawInput);

printSolutions(firstSolution, secondSolution);
