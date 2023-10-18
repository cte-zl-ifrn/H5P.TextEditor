CodeMirror.H5P = {
  /**
   * Return the path to a file from CodeMirror library
   * @returns {string}
   */
  getPath: function (filePath) {
    // return H5P.getLibraryPath('CodeMirror-1.0');
    // Compatibility with Lumi
    return H5P.ContentType().prototype.getLibraryFilePath.call({ libraryInfo: { versionedNameNoSpaces: 'CodeMirror-1.0' } }, filePath);
  },
  /*
      By default, when a content-type fetch the value of a text field,
      H5P apply some sanitization to avoid xss injection.
      This sanitization is only applied for content-type, so
      all the editor widget work with unsanitized values.
      This xss protection is annoying if you try to display a CodeMirror instance
      initialised with a text field value in a content-type because the CodeMirror
      will display the sanitized code instead of the real code itself.
      The CodeMirror.H5P.decode function allow you to decode the text field value
      to remove the sanitization. However this is not be enough if the text field
      value contains already sanitized string before sanitization (which might be
      the case in a library used to display code). This is due to the fact that
      H5P use the htmlspecialchars php function with the doubleEncode parameter
      set as false. This means that if your text field contains the following value
          document.body.innerHTML = "5x + 2 &gt; 0"
      it will be sanitized as :
          document.body.innerHTML = &quot;5x + 2 &gt; 0&quot;
      instead of :
          document.body.innerHTML = &quot;5x + 2 &amp;gt; 0&quot;
      This means that trying to decode this string you will get :
          document.body.innerHTML = "5x + 2 > 0"
      The solution is to apply the CodeMirror.H5P.encode function before saving
      data in the text field. That ways it will be correctly encoded (because it
      emulate the htmlspecialchars php function with the doubleEncode parameter set
      to true) and when H5P will try to sanitize the text field value it will change
      nothing as the string is already sanitized. Calling then CodeMirror.H5P.decode
      in the content-type will give the good value.
  */
  /**
   * Encode the str string. Emulate the htmlspecialchars php function
   * with the ENT_QUOTES flag and the doubleEncode parameter set to true
   * 
   * @param {string} str
   * @returns {string}
   */
  encode: function (str) { // adapted from https://github.com/locutusjs/locutus/blob/master/src/php/strings/htmlspecialchars.js
    return str.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&#039;')
      .replace(/"/g, '&quot;');
  },
  /**
   * Decode the str string. Emulate the htmlspecialchars_decode
   * php function with the ENT_QUOTES flag 
   * 
   * @param {string} str
   * @returns {string}
   */
  decode: function (str) { // adapted from https://github.com/locutusjs/locutus/blob/master/src/php/strings/htmlspecialchars_decode.js
    return str.replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#0*39;/g, '\'')
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&');
  },
  /**
   * Allow to apply highlighting to some of the lines.
   * 
   * @param {CodeMirror} cm The instance of CodeMirror that will be highlighted
   * @param {string} str The lines to highlight. Separate lines by comma, use
   * hyphen to indicate range (e.g. 1,3,5-8)
   */
  highlightLines: function (cm, str) {
    let lines = str.split(',');
    let firstLineNumber = cm.getOption('firstLineNumber');
    lines.forEach(function (l) {
      let match = l.trim().match(/^([0-9]+)(?:-([0-9]+))?$/);
      if (match) {
        if (typeof match[2] === 'undefined') {
          cm.addLineClass(parseInt(match[1] - firstLineNumber), 'background', 'CodeMirror-highlightedline');
        }
        else {
          let start = Math.min(match[1], match[2]);
          let end = Math.max(match[1], match[2]);
          for (let i = start; i <= end; i++) {
            cm.addLineClass(i - firstLineNumber, 'background', 'CodeMirror-highlightedline');
          }
        }
      }
    });
  },
  /**
   * Allow to set somes lines (or sections of lines) as read-only.
   * 
   * @param {CodeMirror} cm The instance of CodeMirror that will be highlighted
   * @param {string} str The lines to set as read-only. Separate lines by comma, use hyphen
   * to indicate range eventually with a dot for character position (e.g. 1,3,5-8, 9.3-10.5)
   * @param {string} [className] Optionnal class name to apply to affected text
   */
  readOnlyLines: function (cm, str, className) {
    let lines = str.split(',');
    let firstLineNumber = cm.getOption('firstLineNumber');
    lines.forEach(function (l) {
      /*
        Examples :     2     2-4     2.3-4.5     ]2.3-4.5[
        1: undefined or [ or ]
        2: number
        3: number or undefined
        4: number or undefined
        5: number or undefined
        6: undefined or [ or ]
      */
      let match = l.trim().match(/^(\[|\])?([0-9]+)(?:\.([0-9]+))?(?:-([0-9]+)(?:\.([0-9]+))?(\[|\])?)?$/);
      if (match) {
        if (typeof match[4] === 'undefined') {
          let start = { line: match[2] - firstLineNumber, ch: 0 };
          let end = { line: match[2] - firstLineNumber, ch: cm.getLine(start.line).length };
          cm.markText(start, end, { readOnly: true, inclusiveLeft: true, inclusiveRight: true, className });
        }
        else {
          match[2] = parseInt(match[2]);
          match[3] = match[3] !== undefined ? parseInt(match[3]) : undefined;
          match[4] = parseInt(match[4]);
          match[5] = match[5] !== undefined ? parseInt(match[5]) : undefined;
          let start, end, inclusiveLeft, inclusiveRight;
          if (match[2] < match[4]) {
            inclusiveLeft = !(match[1] === ']');
            inclusiveRight = !(match[6] === '[');
            start = { line: match[2] - firstLineNumber, ch: match[3] || 0 };
            end = { line: match[4] - firstLineNumber, ch: match[5] || cm.getLine(start.line).length };
          }
          else {
            inclusiveLeft = !(match[6] === ']');
            inclusiveRight = !(match[1] === '[');
            start = { line: match[4] - firstLineNumber, ch: match[5] || 0 };
            end = { line: match[2] - firstLineNumber, ch: match[3] || cm.getLine(start.line).length };
          }
          cm.markText(start, end, { readOnly: true, inclusiveLeft: inclusiveLeft, inclusiveRight: inclusiveRight, className });
        }
      }
    });
  },
  /**
   * Append text at the end of the editor
   * 
   * @param {CodeMirror} cm
   * @param {string} text text to append
   */
  appendText: function (cm, text) {
    let lastLine = cm.lastLine();
    let lastCh = cm.getLine(lastLine).length;
    cm.replaceRange(text, { line: lastLine, ch: lastCh }, { line: lastLine, ch: lastCh });
    if (typeof className === 'string') {
      let lastLine2 = cm.lastLine();
      if (text[text.length - 1] === '\n') {
        lastLine2--;
      }
      for (let i = lastLine; i <= lastLine2; i++) {
        cm.addLineClass(i, 'wrap', className);
      }
    }
  },
  /**
 * Append line(s) at the end of the editor.
 * Will make sure the text is added on a new line and that there is a line at the end.
 * Can optionaly add a class to the added lines
 * 
 * @param {CodeMirror} cm
 * @param {string} text text to append
 * @param {string} [className] Optionnal class to add to the added line (only apply to lines)
 */
  appendLines: function (cm, text, className) {
    let lastLine = cm.lastLine();
    let lastLineText = cm.getLine(lastLine);
    let lastCh = cm.getLine(lastLine).length;
    if (text[text.length - 1] !== '\n') {
      text += '\n';
    }
    if (lastLineText !== '') {
      cm.replaceRange('\n' + text, { line: lastLine, ch: lastCh }, { line: lastLine, ch: lastCh });
      lastLine++;
      lastCh = 0; // not currently used
    }
    else {
      cm.replaceRange(text, { line: lastLine, ch: lastCh }, { line: lastLine, ch: lastCh });
    }
    if (typeof className === 'string') {
      let lastLine2 = cm.lastLine();
      for (let i = lastLine; i < lastLine2; i++) { // strict inequality to ignore last empty line
        cm.addLineClass(i, 'wrap', className);
      }
    }
  },
  /**
   * Set the editor language to mode.
   * The mode argument can either be a language name like "Python"
   * or a mime type like "text/javascript". It will check if the
   * language is supported by codemirror, and load the required
   * javascript files if they aren't already loaded.
   * 
   * @param {CodeMirror} cm
   * @param {string} mode Name of the language
   */
  setLanguage: function (cm, mode) {
    if (mode === 'null') {
      cm.setOption('mode', null);
      return;
    }
    let modeInfo = CodeMirror.findModeByName(mode) || CodeMirror.findModeByMIME(mode);
    if (modeInfo) {
      cm.setOption('mode', modeInfo.mime); // set the mode by using mime because it allow variation (like typescript which is a variation of javascript)
      CodeMirror.autoLoadMode(cm, modeInfo.mode, {
        // The CodeMirror.autoLoad function is a little tricky.
        // It has to be called after the mode have been set.
        // It will load the required javascript files if they
        // aren't already loaded and then will then re-set the mode
        // to it's current value to trigger a refresh. It does not
        // set the mode to the value passed in argument, this has
        // to be done before.
        path: function (mode) { // path is safe because mode is from modeInfo.mime
          return CodeMirror.H5P.getPath('mode/' + mode + '/' + mode + '.js');
        }
      });
    }
    else {
      cm.setOption('mode', null); // Set the language to null which will not apply any syntax highlighting.
    }
  },
  /**
   * Load the css file of a theme
   * This does not apply the theme
   * @param {string} name Name of the theme to load
   */
  loadTheme: function (name) {
    if (name.indexOf('.') !== -1) return;

    this.loadedThemes = this.loadedThemes || [];
    if (this.loadedThemes.indexOf(name) !== -1) return;
    this.loadedThemes.push(name);

    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = CodeMirror.H5P.getPath('theme/' + name + '.css');

    document.getElementsByTagName('head')[0].appendChild(link);
  }
};