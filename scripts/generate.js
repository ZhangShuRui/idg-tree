
/**
 * https://github.com/conventional-changelog-archived-repos/conventional-changelog-cli/blob/master/cli.js
  var flags = {
    present: 'angular',
    outfile: '',
    outputUnreleased: 1,
    releaseCount: 1
  };
*/
function generate(flags, cb) {
  var addStream = require('add-stream');
  var conventionalChangelog = require('conventional-changelog');
  var fs = require('fs');
  var tempfile = require('tempfile');
  var _ = require('lodash');
  var resolve = require('path').resolve;

  var config;


  var infile = flags.infile;
  var outfile = flags.outfile;
  var sameFile = flags.sameFile;
  var append = flags.append;
  var releaseCount = flags.releaseCount;

  if (infile && infile === outfile) {
    sameFile = true;
  } else if (sameFile) {
    if (infile) {
      outfile = infile;
    } else {
      console.error('infile must be provided if same-file flag presents.');
      process.exit(1);
    }
  }

  var options = _.omit({
    preset: flags.preset,
    pkg: {
      path: flags.pkg
    },
    append: append,
    releaseCount: releaseCount,
    outputUnreleased: flags.outputUnreleased
  }, _.isUndefined);

  if (flags.verbose) {
    options.debug = console.info.bind(console);
    options.warn = console.warn.bind(console);
  }

  var templateContext;

  var outStream;

  try {
    if (flags.context) {
      templateContext = require(resolve(process.cwd(), flags.context));
    }

    if (flags.config) {
      config = require(resolve(process.cwd(), flags.config));
    } else {
      config = {};
    }
  } catch (err) {
    console.error('Failed to get file. ' + err);
    process.exit(1);
  }

  var changelogStream = conventionalChangelog(options, templateContext, config.gitRawCommitsOpts, config.parserOpts, config.writerOpts)
    .on('error', function (err) {
      if (flags.verbose) {
        console.error(err.stack);
      } else {
        console.error(err.toString());
      }
      process.exit(1);
    });

  function noInputFile() {
    if (outfile) {
      outStream = fs.createWriteStream(outfile);
    } else {
      outStream = process.stdout;
    }

    console.log('pipe stream')
    changelogStream
      .pipe(outStream)
      .on('finish', function () {
        cb()
        console.log('finish pipe')
      });
  }

  if (infile && releaseCount !== 0) {
    var readStream = fs.createReadStream(infile)
      .on('error', function () {
        if (flags.verbose) {
          console.warn('infile does not exist.');
        }

        if (sameFile) {
          noInputFile();
        }
      });

    if (sameFile) {
      if (options.append) {
        changelogStream
          .pipe(fs.createWriteStream(outfile, {
            flags: 'a'
          }));
      } else {
        var tmp = tempfile();

        changelogStream
          .pipe(addStream(readStream))
          .pipe(fs.createWriteStream(tmp))
          .on('finish', function () {
            fs.createReadStream(tmp)
              .pipe(fs.createWriteStream(outfile));
          });
      }
    } else {
      if (outfile) {
        outStream = fs.createWriteStream(outfile);
      } else {
        outStream = process.stdout;
      }

      var stream;

      if (options.append) {
        stream = readStream
          .pipe(addStream(changelogStream));
      } else {
        stream = changelogStream
          .pipe(addStream(readStream));
      }

      stream
        .pipe(outStream);
    }
  } else {
    noInputFile();
  }
}

module.exports = generate