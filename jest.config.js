module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testEnvironment: "node",
  testRegex: "(/spec/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["d.ts", "ts", "tsx", "js", "jsx", "json", "node"]
};
