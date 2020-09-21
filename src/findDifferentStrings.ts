import { traverseObject } from '@d2api/manifest-patcher';
import { allManifest, load, setLanguage, verbose } from '@d2api/manifest/node';
import _ from 'lodash';

(async () => {
  const output: [string, string][] = [];

  //load two manifests
  verbose();
  await load();
  const manifestEN = allManifest! as any;
  setLanguage('de');
  await load();
  const manifestDE = allManifest! as any;

  // ok lets go

  traverseObject(manifestEN, (foundValue, foundAtPath) => {
    if (typeof foundValue === 'string') {
      const stringDE = _.get(manifestDE, foundAtPath);
      if (typeof stringDE === 'string' && stringDE !== foundValue) {
        output.push([foundAtPath.join('.'), foundValue]);
      }
    }
  });
  console.log(output.length);
  console.log(JSON.stringify(output.slice(0, 3), null, 2));
})();
