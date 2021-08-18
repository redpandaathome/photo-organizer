var assert = require("assert");
const fs = require("fs");
const mock = require("mock-fs");
const path = require("path");
const chai = require("chai");
const deepEqualInAnyOrder = require("deep-equal-in-any-order");
const expect = chai.expect;
chai.use(deepEqualInAnyOrder);
const ellieOrganizer = require("../lib/ellie-organizer.js");
const helper = require("../lib/sort-helper.js");

describe("organizer test", () => {
  it("#1 ellie method...", function () {
    mock({
      test: {
        "IMG_2345.jpg": "# Hello world!",
        "captured.png": "# Hello world!",
        "IMG_1234.jpg": "# Hello world!",
        "b.mov": "# Hello world!",
        "randome.aae": "# Hello world!",
        "IMG_E1234.jpg": "# Hello world!",
        "a.mp4": "# Hello world!",
      },
    });

    const files = helper.getImageVideoFiles("test/");
    const beforePaths = helper.getImageVideoFullPaths("test/", files);
    console.log("🥁 beforePaths:", beforePaths);

    const expected = [
      // "test/IMG_2345.jpg",
      "test/captured/captured.png",
      "test/duplicated/IMG_1234.jpg",
      "test/video/b.mov",
      "test/captured/randome.aae",
      // "test/IMG_E1234.jpg",
      "test/video/a.mp4",
    ];

    const actual = ellieOrganizer.organizer("test/");
    expect(expected).to.deep.equalInAnyOrder(actual);
    mock.restore();
  });

  it("#2 screenshot method...", function () {
    mock({
      test: {
        "Screen Shot 2021-08-15 at 8.43.41 PM.png": "# Hello world!",
        "Screen Shot 2021-08-16 at 8.43.41 PM.png": "# Hello world!",
        "Screen Shot 2021-08-17 at 8.43.41 PM.png": "# Hello world!",
        "Screen Shot 2021-08-17 at 8.43.42 PM.png": "# Hello world!",
      },
    });

    const files = helper.getImageVideoFiles("test/");
    const beforePaths = helper.getImageVideoFullPaths("test/", files);

    const expected = [
       "organized-test/2021-08-15/Screen Shot 2021-08-15 at 8.43.41 PM.png",
       "organized-test/2021-08-16/Screen Shot 2021-08-16 at 8.43.41 PM.png",
       "organized-test/2021-08-17/Screen Shot 2021-08-17 at 8.43.41 PM.png",
       "organized-test/2021-08-17/Screen Shot 2021-08-17 at 8.43.42 PM.png",
    ];

    const actual = helper.organizer("test/", "organized-test/", "screenshot")
    expect(expected).to.deep.equalInAnyOrder(actual);
    mock.restore();
  });
});

