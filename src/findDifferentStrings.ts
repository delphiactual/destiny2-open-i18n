import { traverseObject } from '@d2api/manifest-patcher';
import { allManifest, load, setLanguage } from '@d2api/manifest/node';
import _ from 'lodash';
import { writeFile } from './helpers';

(async () => {
  const output: [string, string][] = [];
  const i18nMe: Record<string, string> = {};

  //load two manifests
  await load();
  const manifestEN = allManifest! as any;
  setLanguage('de');
  await load();
  const manifestDE = allManifest! as any;

  // ok lets go

  traverseObject(manifestEN, (foundValue, foundAtPath) => {
    if (typeof foundValue === 'string') {
      // if we found a string, get the corresponding location from DE manifest and compare
      const stringDE = _.get(manifestDE, foundAtPath);
      if (typeof stringDE === 'string' && stringDE !== foundValue) {
        output.push([foundAtPath.join('.'), foundValue]);
        i18nMe[foundValue] = foundValue;
      }
    }
  });
  // all string/path combos
  console.log(output.length);
  // unique translation-needed strings
  console.log(new Set(output.map((a) => a[1]).filter(Boolean)).size);
  // sample data
  console.log(JSON.stringify(output.slice(0, 3), null, 2));
  writeFile('./output/diff.json', output);
  writeFile('./output/i18n.json', i18nMe);
})();
