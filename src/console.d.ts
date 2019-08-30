// see also: https://github.com/microsoft/TypeScript/issues/30471
declare module "console" {
  const console: typeof import("console");
  export default console;
}
