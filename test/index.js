import test from 'ava';
import { transform } from '@babel/core';
import { JSDOM } from 'jsdom';
import wrap from 'pug-runtime/wrap';
import plugin from '../dist/index.cjs';


const dom = new JSDOM(`<!DOCTYPE html><div id="root"></div>`);
const doc = dom.window.document;

const toFunction = (code) => {
  const out = transform(code, { plugins: [plugin] });
  
  return wrap(out.code);
};


test('basic', (t) => {
  const code = `pug\`
      p#pElem Hello,
        em= name
  \``;
  
  const template = toFunction(code);
  
  doc.getElementById('root').innerHTML = template({ name: 'Daniel' });
  
  t.is(
    doc.getElementById('pElem').innerHTML.replace(/\s/g, ''),
    'Hello,<em>Daniel</em>',
  );
  
  t.is(transform(code, { plugins: [plugin] }).code, '');
});
