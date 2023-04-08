const MOCK_FB_DATA = {
  name: "Facebook Jack",
  followers: 200,
  following: 20,
  date: new Date(Date.now()).toDateString(),
};

const MOCK_IN_DATA = {
  name: "Instagram Jack",
  followers: 350,
  following: 80,
  date: new Date(Date.now()).toDateString(),
};

const MOCK_LN_DATA = {
  name: "LinkedIn Jack",
  followers: 902,
  following: 22,
  date: new Date(Date.now()).toDateString(),
};

const MOCK_COURSE_DATA = [
  {
    name: "React",
    price: 200,
  },
];

module.exports = {
  MOCK_FB_DATA,
  MOCK_IN_DATA,
  MOCK_LN_DATA,
  MOCK_COURSE_DATA,
};
