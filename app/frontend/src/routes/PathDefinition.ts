import { PathRouteProps } from "react-router";

type GenerateFn<P = undefined> = P extends undefined ? () => string : (params?: P) => string;

interface PathDefinitionConstructorParams<Params> {
  path: Exclude<PathRouteProps["path"], undefined>;
  generate: GenerateFn<Params>;
  fullPath: string;
}

export default class PathDefinition<Params = undefined> {
  public readonly generate: GenerateFn<Params>;
  public readonly path: Exclude<PathRouteProps["path"], undefined>;
  public readonly fullPath: string;

  constructor({
    generate, path, fullPath,
  }: PathDefinitionConstructorParams<Params>) {
    this.fullPath = fullPath;
    this.generate = generate;
    this.path = path;
  }
}
