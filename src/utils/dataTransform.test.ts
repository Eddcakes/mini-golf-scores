import { describe, expect, it } from "vitest";
import {
  createScoreTableArray,
  createScoreTableDictionary,
} from "./dataTransform";

describe("createScoreTableArray", () => {
  const holes = 3;
  const playerList = [
    { name: "one", color: "#f00" },
    { name: "two", color: "f00" },
    { name: "test", color: "#f00" },
  ];
  const result = [
    {
      one: null,
      two: null,
      test: null,
    },
    {
      one: null,
      two: null,
      test: null,
    },
    {
      one: null,
      two: null,
      test: null,
    },
  ];
  it("should return an array of length equal to the number of holes", () => {
    const tableArray = createScoreTableArray(holes, playerList);
    expect(tableArray.length).toBe(holes);
  });

  it("should return the expected result", () => {
    const tableArray = createScoreTableArray(holes, playerList);
    expect(tableArray).toEqual(result);
  });
});

describe("createScoreTableDictionary", () => {
  const holes = 3;
  const playerList = ["one", "two", "test"];
  const result = {
    1: {
      one: null,
      two: null,
      test: null,
    },
    2: {
      one: null,
      two: null,
      test: null,
    },
    3: {
      one: null,
      two: null,
      test: null,
    },
  };
  it("should return an object with keys equal to the number of holes", () => {
    const tableDictionary = createScoreTableDictionary(holes, playerList);
    expect(Object.keys(tableDictionary).length).toBe(holes);
  });

  it("should return the expected result", () => {
    const tableDictionary = createScoreTableDictionary(holes, playerList);
    expect(tableDictionary).toEqual(result);
  });
});
