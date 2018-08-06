const spawn = require('./__helpers__/spawn');
const path = require('path');

const bin = (command) => path.relative(process.cwd(), path.join(__dirname, '..', 'bin', command));
const fixture = (name) => path.relative(process.cwd(), path.join(__dirname, '__fixtures__', name));


const testCommand = (cmdline) => {
  const [command, ...args] = cmdline.split(' ');

  test(`${command} ${args.join(' ')}`, () => {
    return spawn(bin(command), args).then(
      result => {
        expect(result).toMatchSnapshot();
      },
      result => {
          expect(result).toMatchSnapshot();
      }
    );
  });
};

testCommand(`prettier-package-json ${fixture('package-1.json')}`);
testCommand(`prettier-package-json --use-tabs ${fixture('package-1.json')}`);
testCommand(`prettier-package-json --tab-width 8 ${fixture('package-1.json')}`);
testCommand(`prettier-package-json ${fixture('package-*.json')}`);
testCommand(`prettier-package-json --list-different ${fixture('package-*.json')}`);
testCommand(`prettier-package-json --list-different ${fixture('missing.json')}`);
