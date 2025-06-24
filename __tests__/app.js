import { describe, it, beforeEach, vi } from "vitest";
import { join, basename } from "path";
import { strictEqual, file, JSONFileContent, fileContent } from "yeoman-assert";
import { run } from "yeoman-test";
import {
  dependencies as _dependencies,
  devDependencies as _devDependencies,
} from "../package.json";

vi.hoisted(()=> { 
  require.cache[require.resolve('superb')] = { exports: { random: () => "cat's meow" } };
  require.cache[require.resolve('npm-name')] = { exports: () => Promise.resolve(true) };
});

describe("generator:app", () => {
  describe("defaults", () => {
    beforeEach(() => {
      return run(join(__dirname, "../app")).withPrompts({
        name: "generator-temp",
        description: "A node generator",
        homepage: "http://yeoman.io",
        githubAccount: "yeoman",
        authorName: "The Yeoman Team",
        authorEmail: "hi@yeoman.io",
        authorUrl: "http://yeoman.io",
        keywords: [],
        license: "MIT",
      });
    });

    it("created and CD into a folder named like the generator", () => {
      strictEqual(basename(process.cwd()), "generator-temp");
    });

    it("creates files", () => {
      const expected = [
        ".eslintignore",
        "README.md",
        "package.json",
        "generators/app/index.js",
        "generators/app/templates/dummyfile.txt",
        "__tests__/app.js",
      ];

      file(expected);
    });

    it("fills package.json with correct information", () => {
      // eslint-disable-next-line new-cap
      JSONFileContent("package.json", {
        name: "generator-temp",
        dependencies: {
          "yeoman-generator": _dependencies["yeoman-generator"],
          chalk: _dependencies.chalk,
          yosay: _dependencies.yosay,
        },
        devDependencies: {
          "yeoman-test": _devDependencies["yeoman-test"],
          "yeoman-assert": _devDependencies["yeoman-assert"],
        },
        keywords: ["yeoman-generator"],
      });
    });

    it("fills the README with project data", () => {
      fileContent("README.md", "# generator-temp");
      fileContent("README.md", "npm install -g yo");
      fileContent("README.md", "npm install -g generator-temp");
      fileContent("README.md", "yo temp");
      fileContent("README.md", "yeoman/generator-temp");
    });

    it("fills the .eslintignore with correct content", () => {
      fileContent(".eslintignore", "**/templates\n");
    });
  });

  describe("scoped name", () => {
    beforeEach(() => {
      return run(join(__dirname, "../app")).withPrompts({
        name: "@yeoman/generator-temp",
        description: "A node generator",
        homepage: "http://yeoman.io",
        githubAccount: "yeoman",
        authorName: "The Yeoman Team",
        authorEmail: "hi@yeoman.io",
        authorUrl: "http://yeoman.io",
        keywords: [],
        license: "MIT",
      });
    });

    it("created and CD into a folder named like the generator", () => {
      strictEqual(basename(process.cwd()), "generator-temp");
    });

    it("fills package.json with correct information", () => {
      // eslint-disable-next-line new-cap
      JSONFileContent("package.json", {
        name: "@yeoman/generator-temp",
      });
    });

    it("fills the README with project data", () => {
      fileContent("README.md", "# @yeoman/generator-temp");
      fileContent("README.md", "npm install -g yo");
      fileContent("README.md", "npm install -g @yeoman/generator-temp");
      fileContent("README.md", "yo @yeoman/temp");
    });
  });
});
