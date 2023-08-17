const MarkovMachine = require('./markov');

describe("MarkovMachine", () => {
  test("constructor splits the text into words", () => {
    let mm = new MarkovMachine("the cat in the hat");
    expect(mm.words).toEqual(["the", "cat", "in", "the", "hat"]);
  });

  test("makeChains method constructs correct chains", () => {
    let mm = new MarkovMachine("the cat in the hat");
    let chains = {
      "the": ["cat", "hat"],
      "cat": ["in"],
      "in": ["the"],
      "hat": [null]
    };
    expect(mm.chains).toEqual(chains);
  });

  test("makeText method generates text of correct length", () => {
    let mm = new MarkovMachine("the cat in the hat");
    let text = mm.makeText(3);
    // Splitting by spaces to get the number of words
    expect(text.split(' ').length).toBeLessThanOrEqual(3);
  });

  test("makeText method handles empty input", () => {
    let mm = new MarkovMachine("");
    let text = mm.makeText();
    expect(text).toEqual("");
  });
});
