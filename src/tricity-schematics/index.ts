import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

const tricityHeaderText = `
/**
 * This file was modified by tricity schematics !
 */
`;

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function tricitySchematics(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    tree.getDir(options.sourceDir)
      .visit(filePath => {
        if (!filePath.endsWith('.ts')) {
          return;
        }
        const content = tree.read(filePath);
        if (!content) {
          return;
        }

        if (content.indexOf(tricityHeaderText) == -1) {
          tree.overwrite(filePath, tricityHeaderText + content);
        }
      });
    return tree;
  };
}
