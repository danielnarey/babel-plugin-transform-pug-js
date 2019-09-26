import test from 'ava';
import { JSDOM } from 'jsdom';
import { transform } from '@babel/core';
import {
  setMergeable,
  setStatic,
  setUpdatable,
} from '@danielnarey/componentize';
import plugin from '../dist/index.cjs';


const dom = new JSDOM(`<!DOCTYPE html><div id="root"></div>`);
const doc = dom.window.document;

const transformer = (code) => {
  const out = transform(code, { plugins: [plugin] });
  
  return out.code;
};


test('basic', (t) => {
  const code = `pug\`
      p#pElem Hello,
        em= name
  \``;
  
  const template = transformer(code);
  
  doc.getElementById('root').innerHTML = template({ name: 'Daniel' });
  
  t.is(
    doc.getElementById('pElem').innerHTML.replace(/\s/g, ''),
    'Hello,<em>Daniel</em>',
  );
});
