import { denom } from  "https://deno.land/x/denom/denom.ts"


const ignore = {
  directories: [
    ".git",
  ],
  files: [
    ".DS_Store",
  ],
};



denom({
  restartable: "rs",
  clear: false,
  debug: false,
  timeout: 400, // ms

  watchFor: ["modify"],
  ignoreRoot: ignore.directories.map((_) => `**/${_}/**`)
    .concat(ignore.files.map((_) => `**/${_}`)),
  ignore: [],
  watch: ["*.*"],
  extensions: ["ts", "js", "json"],

  events: {},

  permissions: [],

  executableMap: {
    ts: ["deno"],
    js: ["deno"],
  },

  env: {},
  stdout: "inherit",
  stderr: "inherit",
  stdin: "inherit",
  signal: "SIGUSR2",

  file: "index.ts",
  fileArgs: [],
  executableArgs: [],
  executableCmds: [],
})
  .then((denom:any) => {
    // you can also listen to denom events
    denom.on("reload", () => {
      console.log("file was reloaded");
    });
  });