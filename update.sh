cd manifests
npx json-diff -j 86657.20.08.23.1800-9__en.json 86657.20.08.23.1800-9__de.json >diff.json
sed '/"__new"/d' <diff.json >diff2.json

mv diff.json ./output
