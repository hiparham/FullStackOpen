import { expect, test, describe } from "@jest/globals";
import { UniReducer } from "./UnicafeReducer";
import deepfreeze from "deep-freeze";
describe("Unicafe Redux", () => {
  test("Proper Return", () => {
    const initialState = {
      good: 0,
      bad: 0,
      neutral: 0,
    };
    deepfreeze(initialState);
    const badStore = UniReducer(undefined, { type: "Do_Nothing" });
    expect(badStore).toStrictEqual(initialState);
  });

  test("Good Review", () => {
    const state = {
      good: 0,
      bad: 0,
      neutral: 0,
    };
    deepfreeze(state);
    const MyStore = UniReducer(state, {
      type: "GOOD",
    });

    expect(MyStore).toStrictEqual({ good: 1, bad: 0, neutral: 0 });
  });

  test("Neutral Review", () => {
    const state = {
      good: 0,
      bad: 0,
      neutral: 0,
    };
    deepfreeze(state);
    const MyStore = UniReducer(state, {
      type: "NEUTRAL",
    });

    expect(MyStore).toStrictEqual({ good: 0, bad: 0, neutral: 1 });
  });
  test("Bad Review", () => {
    const state = {
      good: 0,
      bad: 0,
      neutral: 0,
    };
    deepfreeze(state);
    const MyStore = UniReducer(state, {
      type: "BAD",
    });

    expect(MyStore).toStrictEqual({ good: 0, bad: 1, neutral: 0 });
  });
  test("Resetting The App", () => {
    const AddReviews = UniReducer(
      { good: 5, bad: 3, neutral: 2 },
      { type: "Do_Nothing" }
    );
    expect(AddReviews.good).toEqual(5);
    const ResetApp = UniReducer(AddReviews, { type: "RESET" });
    expect(ResetApp).toStrictEqual({ good: 0, bad: 0, neutral: 0 });
  });
});
