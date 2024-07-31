import { strings } from '@angular-devkit/core';
import {
  MergeStrategy,
  Rule,
  SchematicContext,
  Tree,
  apply,
  applyTemplates,
  chain,
  filter,
  mergeWith,
  move,
  renameTemplateFiles,
  url,
} from '@angular-devkit/schematics';

export function reactScaffoldingFactory({ root = 'src' }: { root: string }): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const folders = [
      'adapters',
      'assets',
      'components',
      'context',
      'hooks',
      'interceptors',
      'models',
      'pages',
      'pages/Login',
      'pages/Login/components',
      'pages/Login/adapters',
      'pages/Login/context',
      'pages/Dashboard',
      'pages/Dashboard/components',
      'pages/Dashboard/adapters',
      'pages/Dashboard/context',
      'redux',
      'redux/actions',
      'redux/reducers',
      'services',
      'styles',
      'utilities',
    ];

    const rules: Rule[] = folders.map((folder) => createFolderWithIndex(`${root}/${folder}`));

    return chain(rules);
  };
}

function createFolderWithIndex(path: string): Rule {
  return () => {
    const urlTemplates = ['index.ts.template'];
    const template = apply(url('./files'), [
      filter((filePath) => urlTemplates.some((urlTemplate) => filePath.includes(urlTemplate))),
      applyTemplates({
        ...strings,
      }),
      renameTemplateFiles(),
      move(path),
    ]);

    return mergeWith(template, MergeStrategy.Overwrite);
  };
}
