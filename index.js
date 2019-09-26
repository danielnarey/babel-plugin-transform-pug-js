import { compileClient } from 'pug';
import { transform } from '@babel/core';


const isEmptyLine = (ln) => (
  ln === '' || !ln.match(/^\s*$/g)
);


const trimLeft = (pattern) => (ln) => ln.replace(
  new RegExp(`^${pattern}`),
  '',
);


const prepareRaw = (node) => {
  const { raw } = node.quasi.quasis[0].value;
  const lines = raw.split('\n').filter(!isEmptyLine);
  const rootIndent = /^\s*/.exec(lines[0])[0];

  return lines.map(trimLeft(rootIndent)).join('\n');
};


const plugin = function () {
  return {
    visitor: {
      TaggedTemplateExpression(path) {
        if (path.node.tag.name === 'pug') {
          const prepared = prepareRaw(path.node);
          const compiled = compileClient(prepared);
          const transformed = transform(compiled);
          path.replaceWithMultiple(transformed.ast.program.body);
        }
      },
    },
  };
};


export default plugin;
