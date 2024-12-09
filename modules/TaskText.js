const PAT_LINK = /<a\s[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/g;

const TaskText = Ractive.extend({
  template: `<span class="task-text" class-mute="mute">{{{taskText}}}</span>`,
  css: `
    .task-text {
      word-wrap: break-word;
      white-space: pre-wrap;
      overflow-wrap: break-word;
    }

    .task-text.mute {
      text-decoration: line-through;
    }

    .task-text.mute, .task-text.mute * {
      color: #999;
    }

    .task-text a {
      text-decoration: none;
    }
  `,
  data: function () {
    return {
      text: null,
      mute: false,
    };
  },
  computed: {
    taskText: {
      get() {
        const text = this.get("text");
        const html = marked.parseInline(text);
        // const linkable = html.match(/<a\s[^>]*href="[^"]*"[^>]*>.*?<\/a>/g);
        const linkable = html.match(PAT_LINK);
        if (linkable) {
          return html.replace(PAT_LINK, '<a href="$1" target="_blank">$2</a>');
        } else {
          return html;
        }
      },
    },
  },
});

export default TaskText;
