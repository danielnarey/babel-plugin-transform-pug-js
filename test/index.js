import test from 'ava';
import { transform } from '@babel/core';
import plugin from '../dist/index';


const toFunction = (code) => {
  const out = transform(code, { plugins: [plugin] });
  
  return eval(out.code);
};


test('basic', (t) => {
  const render = `(data) =>
    pug\`
      p#pElem Hello,
        em= name
    \`(data)
  `;
  
  const template = toFunction(render);
  
  t.is(
    template({ name: 'Daniel' }),
    '<p id="pElem">Hello,<em>Daniel</em></p>',
  );
});
