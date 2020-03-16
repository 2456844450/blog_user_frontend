const highlight = require('highlight.js')
const marked = require('marked')
const tocObj = {
  add: function (text, level) {
    var anchor = `#toc${level}${++this.index}`
    this.toc.push({ anchor: anchor, level: level, text: text })
    return anchor
  },

  toHTML: function () {
    let levelStack = [];
    let result = "";
    const addStartUL = () => {
      result += '<ul class="anchor-ul" id="anchor-fix">';
    }
    const addEndUL = () => {
      result += "</ul>\n";
    }
    const addLI = (anchor, text) => {
      result +=
      '<li><a class="toc-link" style="display:block;text-align:left;" href="#' + anchor + '">' + text + "<a></li>\n";
    }

    this.toc.forEach(function (item) {
      let levelIndex = levelStack.indexOf(item.level)
      if (levelIndex === -1) {
        levelStack.unshift(item.level)
        addStartUL();
        addLI(item.anchor, item.text)
      }
      else if (levelIndex === 0) {
        addLI(item.anchor, item.text)
      }
      else {
        while(levelIndex--) {
          levelStack.shift()
          addEndUL()
        }
        addLI(item.anchor, item.text)
      }
    })

    while (levelStack.length) {
      levelStack.shift()
      addEndUL()
    }

    this.toc = []
    this.index = 0
    return result
  },
  toc: [],
  index: 0
}

class MarkUtils {
  constructor() {
    this.rendererMD = new marked.Renderer();
    this.rendererMD.heading = function (text, level, raw) {
      var anchor = tocObj.add(text, level);
      return `<h${level} id=${anchor}>${text}</h${level}>\n`;
    };
    this.rendererMD.table = function (header, body) {
      return '<table class="table" border="0" cellspacing="0" cellpadding="0">' + header + body + '</table>'
    }
    highlight.configure({ useBR: true });
    marked.setOptions({
      renderer: this.rendererMD,
      headerIds: false,
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: function (code) {
        return highlight.highlightAuto(code).value;
      }
    });
  }

  async marked(data) {
    if (data) {
      let content = await marked(data);
      let toc = tocObj.toHTML();
      return { content: content, toc: toc };
    } else {
      return null;
    }
  }
}

const markdown = new MarkUtils();

export default markdown;