var assert = require("assert");
const fs = require("fs");
const mock = require("mock-fs");
const path = require("path");
const chai = require("chai");
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const expect = chai.expect;
chai.use(deepEqualInAnyOrder);
var ellieOrganizer = require("../lib/ellie-organizer.js");

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

    const files = ellieOrganizer.getImageVideoFiles("test/");
    const beforePaths = ellieOrganizer.getImageVideoFullPaths("test/", files);
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
});
