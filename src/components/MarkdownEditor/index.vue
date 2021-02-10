<template>
  <div :id="id" />
</template>

<script>
// deps for editor
import "codemirror/lib/codemirror.css"; // codemirror
import "tui-editor/dist/tui-editor.css"; // editor ui
import "tui-editor/dist/tui-editor-contents.css"; // editor content
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
import chart from "@toast-ui/editor-plugin-chart";
import "tui-chart/dist/tui-chart.css";
import Editor from "tui-editor";
import "tui-color-picker/dist/tui-color-picker.css";
import defaultOptions from "./default-options";

export default {
  name: "MarkdownEditor",
  props: {
    value: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      required: false,
      default() {
        return (
          "markdown-editor-" +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + "")
        );
      },
    },
    options: {
      type: Object,
      default() {
        return defaultOptions;
      },
    },
    mode: {
      type: String,
      default: "markdown",
    },
    height: {
      type: String,
      required: false,
      default: "300px",
    },
    language: {
      type: String,
      required: false,
      default: "en_US", // https://github.com/nhnent/tui.editor/tree/master/src/js/langs
    },
  },
  data() {
    return {
      editor: null,
    };
  },
  computed: {
    editorOptions() {
      const options = Object.assign({}, defaultOptions, this.options);
      // options.initialEditType = this.mode;
      options.height = this.height;
      options.language = this.language;
      options.plugins = [
        chart,
        codeSyntaxHighlight,
        colorSyntax,
        tableMergedCell,
      ];
      return options;
    },
  },
  watch: {
    value(newValue, preValue) {
      if (newValue !== preValue && newValue !== this.editor.getValue()) {
        this.editor.setValue(newValue);
      }
    },
    language(val) {
      this.destroyEditor();
      this.initEditor();
    },
    height(newValue) {
      this.editor.height(newValue);
    },
    mode(newValue) {
      this.editor.changeMode(newValue);
    },
  },
  mounted() {
    this.initEditor();
  },
  destroyed() {
    this.destroyEditor();
  },
  methods: {
    initEditor() {
      this.editor = new Editor({
        el: document.getElementById(this.id),
        height: "500px",

        ...this.editorOptions,
      });
      if (this.value) {
        this.editor.setValue(this.value);
      }
      this.editor.on("change", () => {
        this.$emit("input", this.editor.getValue());
      });
    },
    destroyEditor() {
      if (!this.editor) return;
      this.editor.off("change");
      this.editor.remove();
    },
    setValue(value) {
      this.editor.setValue(value);
    },
    getValue() {
      return this.editor.getValue();
    },
    setHtml(value) {
      this.editor.setHtml(value);
    },
    getHtml() {
      return this.editor.getHtml();
    },
  },
};
</script>

<style lang="less" scoped>
.te-preview {
  width: 100%;
}
</style>