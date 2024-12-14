const TAG_TYPES = ["success", "error"]

const Tag = Ractive.extend({
  data () {
    return {
      type: null
    }
  },
  template: `<span class="tag tag-{{color}}">{{yield}}</span>`,
  css: `
    .tag {
      display: inline-block;
      white-space: nowrap;
      border-radius: 2px;
      font-size: 0.7em;
      padding: 0 7px;
      background: #E9EDC9;
      border: 1px solid #CCD5AE;
      margin: 0 2px;
    }

    .tag-success {
      color: green;
    }

    .tag-error {
      color: red;
    }
  `
})

export default Tag
