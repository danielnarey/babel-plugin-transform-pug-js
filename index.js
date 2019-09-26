import { transform } from '@babel/core';
import { ast } from '@babel/template';
import { compileClient } from 'pug';


const isNotEmptyLine = (ln) => (
  Boolean(ln) && Boolean(ln.match(/^\s*$/g))
);


const trimLeft = (pattern) => (ln) => ln.replace(
  new RegExp(`^${pattern}`),
  '',
);


const prepareRaw = (node) => {
  const { raw } = node.quasi.quasis[0].value;
  const lines = raw.split('\n').filter(isNotEmptyLine);
  const rootIndent = /^\s*/.exec(lines[0])[0];

  return lines.map(trimLeft(rootIndent)).join('\n');
};


const plugin = function babelPluginTransformPugJs() {
  return {
    visitor: {
      TaggedTemplateExpression(path) {
        if (path.node.tag.name === 'pug') {
          const prepared = prepareRaw(path.node);
          const compiled = compileClient(prepared);
          const transformed = transform(compiled);
          const parsed = ast(transformed.code);
          path.replaceWith(parsed);
        }
      },
    },
  };
};


export default plugin;
