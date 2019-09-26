import template from '@babel/template';
import { transform } from '@babel/core';
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
          const compiled = compileClient(
            prepared,
            { inlineRuntimeFunctions: false },
          );
          const transformed = transform(compiled);
          const parsed = template.ast(transformed.code);
          path.replaceWithMultiple(parsed);
        }
      },
    },
  };
};


export default plugin;
