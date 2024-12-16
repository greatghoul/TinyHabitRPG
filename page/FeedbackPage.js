import Page from "node/Page.js"
import Loading from "node/Loading.js"

window.disqus_config = function () {
  this.page.url = "https://tinyhabitrpg.vercel.app/"
  this.page.identifier = "tinyhabitrpg"
}

const FeedbackPage = Page.extend({
  components: {
    Page,
    Loading,
  },
  data () {
    return {
      loaded: false,
      visible: false,
    }
  },
  template: `
    <Page title="Feedback" visible="{{visible}}">
      {{#partial page_body}}
        <div id="disqus_thread">
          {{#unless loaded}}<Loading />{{/unless}}
        </div>
      {{/partial}}
    </Page>
  `,
  onrender () {
    this.installDisqus()
  },
  onunrender () {
    this.uninstallDisqus()
  },
  installDisqus () {
    if (document.querySelector("#disqus_script")) { return }

    const script = document.createElement('script')
    script.src = "https://tinyhabitrpg.disqus.com/embed.js"
    script.id = "disqus_script"
    script.setAttribute("data-timestamp", + new Date())
    script.addEventListener("load", () => this.set("loaded", true))
    document.body.appendChild(script)
  },
  uninstallDisqus () {
    const script = document.querySelector("#disqus_script")
    if (script) { document.body.removeChild(script) }
    this.set("loaded", false)
  }
})

export default FeedbackPage
