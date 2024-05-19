import { describe, expect, it } from "vitest";
import {
  createScoreTableArray,
  createScoreTableDictionary,
} from "./dataTransform";

describe("createScoreTableArray", () => {
  const holes = 3;
  const playerList = ["one", "two", "test"];
  const result = [
    {
      one: { score: undefined },
      two: { score: undefined },
      test: { score: undefined },
    },
    {
      one: { score: undefined },
      two: { score: undefined },
      test: { score: undefined },
    },
    {
      one: { score: undefined },
      two: { score: undefined },
      test: { score: undefined },
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
      one: { score: undefined },
      two: { score: undefined },
      test: { score: undefined },
    },
    2: {
      one: { score: undefined },
      two: { score: undefined },
      test: { score: undefined },
    },
    3: {
      one: { score: undefined },
      two: { score: undefined },
      test: { score: undefined },
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
