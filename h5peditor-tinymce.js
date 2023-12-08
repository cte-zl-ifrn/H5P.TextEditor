/* global ns CKEDITOR */
/**
 * Adds a TinyMCE text field to the form.
 *
 * @param {type} parent
 * @param {type} field
 * @param {type} params
 * @param {type} setValue
 * @returns {undefined}
 */
ns.TinyMCE = function (parent, field, params, setValue) {
  this.parent = parent;
  this.field = field;
  this.value = params;
  this.setValue = setValue;
  this.tags = ns.$.merge(["br"], this.field.tags || this.defaultTags);
};

ns.TinyMCE.prototype.inTags = function (value) {
  return ns.$.inArray(value.toLowerCase(), this.tags) >= 0;
};

/**
 * Append field to wrapper.
 *
 * @param {type} $wrapper
 * @returns {undefined}
 */
ns.TinyMCE.prototype.appendTo = function ($wrapper) {
  var that = this;
  this.$item = ns.$(this.createTinyMCE()).appendTo($wrapper);
  this.$input = this.$item.children(".ckeditor");
  this.$errors = this.$item.children(".h5p-errors");

  ns.bindImportantDescriptionEvents(this, this.field.name, this.parent);

  tinymce.init({
    selector: ".ckeditor",
    height: 500,
    resize: true,
    font_size_input_default_unit: "px",
    menu: {
      file: {
        title: "File",
        items:
          "newdocument restoredraft | preview | export print | deleteallconversations",
      },
      edit: {
        title: "Edit",
        items:
          "undo redo | cut copy paste pastetext | selectall | searchreplace",
      },
      view: {
        title: "View",
        items:
          "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments",
      },
      insert: {
        title: "Insert",
        items:
          "image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime",
      },
      format: {
        title: "Format",
        items:
          "bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily align lineheight | forecolor backcolor | language | removeformat",
      },
      tools: {
        title: "Tools",
        items: "spellchecker spellcheckerlanguage | a11ycheck code wordcount",
      },
      table: {
        title: "Table",
        items:
          "inserttable | cell row column | advtablesort | tableprops deletetable",
      },
      help: { title: "Help", items: "help" },
    },
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "code",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "help",
      "wordcount",
      "codesample",
      "code",
      "emoticons",
    ],
    toolbar:
      "undo redo | blocks | " +
      "fontsizeinput bold italic backcolor | alignleft aligncenter " +
      "alignright alignjustify | bullist numlist outdent indent | " +
      "emoticons | removeformat | help",

    image_title: true,

    automatic_uploads: true,

    setup: function (editor) {
      editor.on("change", function () {
        that.validate();
      });
    },
  });
};

function isBase64(str) {
  // A expressão regular verifica se a string tem o formato adequado para Base64
  return (
    /^[A-Za-z0-9+/=]+\s*$/.test(str) &&
    (str.length % 4 === 0 || str.length === 0)
  );
}

/**
 * Create TinyMCE for the TinyMCE field.
 */
ns.TinyMCE.prototype.createTinyMCE = function () {
  const id = ns.getNextFieldId(this.field);
  var input = '<textarea id="' + id + '" class="ckeditor" tabindex="0">';

  if (this.value !== undefined) {
    if (isBase64(this.value)) {
      var allHtml = "";
      this.value = atob(this.value);

      for (let i = 0; i < this.value.length; i++) {
        allHtml += escapeHtmlCharacter(this.value.charAt(i));
      }
      input += allHtml;
    } else {
      input += this.value;
    }
  }

  input += "</textarea>";

  return ns.createFieldMarkup(
    this.field,
    ns.createImportantDescription(this.field.important) + input,
    id
  );
};

// Função para trocar os caracteres
function escapeHtmlCharacter(char) {
  switch (char) {
    case "&":
      return "&amp;";
    case "<":
      return "&lt;";
    case ">":
      return "&gt;";
    case "'":
      return "&#039;";
    case '"':
      return "&quot;";
    default:
      return char;
  }
}

ns.TinyMCE.prototype.isCode = function (content) {
  var codeRegex =
    /<pre[\s\S]*?<code[\s\S]*?>([\s\S]*?)<\/code>[\s\S]*?<\/pre>/i;

  return codeRegex.test(content);
};

ns.TinyMCE.prototype.validate = function () {
  var that = this;

  if (that.$errors.children().length) {
    that.$errors.empty();
    this.$input.addClass("error");
  }

  // Pega o valor digitado
  var idUnico = this.$input.attr("id");
  var value = tinyMCE.get(idUnico).getContent() || "Texto vazio";

  console.log(value);

  // verifica se é codigo
  if (that.isCode(value)) {
    // faz o encode
    value = btoa(value);
  }

  // Salva
  this.value = value;
  this.setValue(this.field, value);
  this.$input.change();

  return value;
};

/**
 * Remove this item.
 */
ns.TinyMCE.prototype.remove = function () {
  this.$item.remove();
};

ns.TinyMCE.prototype.forceValue = function (value) {
  if (this.ckeditor === undefined) {
    this.$input.html(value);
  } else {
    this.ckeditor.setData(value);
  }
  this.validate();
};

// Inicializa o TinyMCE
document.addEventListener("DOMContentLoaded", function () {
  // Cria um elemento de script
  var script = document.createElement("script");

  // Define o atributo src para o URL do script do TinyMCE
  script.src =
    "https://cdn.tiny.cloud/1/hcfimgc2pfz91410ky5zdlsbpu2r0zvaftznv1glpace7qn2/tinymce/6.7.1-31/tinymce.min.js";

  // Adiciona o script ao corpo do documento
  document.body.appendChild(script);

  //Tinymce
  ns.widgets.tinymce = ns.TinyMCE;
});
