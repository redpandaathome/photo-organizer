const mock = require("mock-fs");
const chai = require("chai");
const deepEqualInAnyOrder = require("deep-equal-in-any-order");
const expect = chai.expect;
chai.use(deepEqualInAnyOrder);
const ellieOrganizer = require("../lib/ellie-organizer.js");
const helper = require("../lib/sort-helper.js");

// ready to run test? 🧪🏃🏻‍♀️ npm test
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
    expect(actual).to.deep.equalInAnyOrder(expected);
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

    const expected = [
       "organized-test/2021-08-15/Screen Shot 2021-08-15 at 8.43.41 PM.png",
       "organized-test/2021-08-16/Screen Shot 2021-08-16 at 8.43.41 PM.png",
       "organized-test/2021-08-17/Screen Shot 2021-08-17 at 8.43.41 PM.png",
       "organized-test/2021-08-17/Screen Shot 2021-08-17 at 8.43.42 PM.png",
    ];

    const actual = helper.organizer("test/", "organized-test/", "screenshot")
    expect(actual).to.deep.equalInAnyOrder(expected);
    mock.restore();
  });

  it("#3 daily method...", function () {
    mock({
      test: {
        "P1010794.jpg": mock.file({
          content:"# 2020-10-25",
          birthtime: new Date('2020-10-25')
        }),
        "bbb.png": mock.file({
          content:"# 2021-05-05",
          birthtime: new Date('2021-05-05')
        }),
        "captured.png": mock.file({
          content:"# 2021-05-05",
          birthtime: new Date('2021-05-05')
        }),
        "aaa.png": mock.file({
          content:"# 2021-08-11",
          birthtime: new Date('2021-08-11')
        }),
        "Screen Shot 2021-08-17 at 8.43.42 PM.png": mock.file({
          content:"# 2021-08-17",
          birthtime: new Date('2021-08-17')
        }),
      },
    });

    const expected = [
       "organized-test/2020-10-25/P1010794.jpg",
       "organized-test/2021-05-05/bbb.png",
       "organized-test/2021-05-05/captured.png",
       "organized-test/2021-08-11/aaa.png",
       "organized-test/2021-08-17/Screen Shot 2021-08-17 at 8.43.42 PM.png",
    ];

    const actual = helper.organizer("test/", "organized-test/", "daily")
    expect(actual).to.deep.equalInAnyOrder(expected);
    mock.restore();
  });
});

