import test from 'ava';
import { transform } from '@babel/core';
import wrap from 'pug-runtime/wrap';
import plugin from '../dist/index';


const toFunction = (code) => {
  const out = transform(code, { plugins: [plugin] });
  
  return out.code;//wrap(out.code);
};


test('basic', (t) => {
  const code = `(data) =>
    pug\`
      p#pElem Hello,
        em= name
    \`(data)
  `;
  
  const template = toFunction(code);
  
  t.is(
    template,//({ name: 'Daniel' }),
    ''//'<p id="pElem">Hello,<em>Daniel</em></p>',
  );
});
