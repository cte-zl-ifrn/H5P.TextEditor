# H5PEditor.CodeEditor

H5P Editor widget that allow to create a code editor with syntax highlighting and other benefits.
It is based on the [H5P-CodeMirror](https://github.com/DegrangeM/H5P-CodeMirror) library and used in the [H5P.CodeHighlighter](https://github.com/DegrangeM/H5P.CodeHighlighter) content-type.

![image](https://user-images.githubusercontent.com/53106394/114731194-d2ccbc00-9d41-11eb-9889-ad5c989c9ab7.png)

You can use the `language` attribute to choose the language.

It can either be the language name :
```json
{
    "name": "code",
    "type": "text",
    "language": "Python",
    "widget": "codeEditor",
    "label": "Code",
    "description": "The code to display. You can press Echap then Tab to focus the next field."
  },
```

Or a path to a field (that need to start with a `.` so use `./` if the path is at the same depth-level).

```json
{
    "name": "language",
    "type": "select",
    "label": "Language",
    "description": "Select the language of your code.",
    "options": [
      {
        "value": "Python",
        "label": "Python"
      },
      {
        "value": "HTML",
        "label": "HTML"
      }
    ],
    "default": "HTML"
  },
  {
    "name": "code",
    "type": "text",
    "language": "./language",
    "widget": "codeEditor",
    "label": "Code",
    "description": "The code to display. You can press Echap then Tab to focus the next field."
  }
```

See the source code of [H5P.CodeHighlighter](https://github.com/DegrangeM/H5P.CodeHighlighter) if you want a select with all the supported language.
The language field can also be a text field.
