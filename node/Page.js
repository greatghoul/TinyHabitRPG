const Page = Ractive.extend({
  data: function() {
    return {
      title: '',
      hidden: false,
    }
  },
  template: `
    <div class="page" data-hidden="{{hidden}}">
      <div class="page-head">
        <span>{{title}}</span>
        <div class="pull-right">
          {{ yield page_action }}
        </div>
      </div>
      <div class="page-body">
        {{ yield page_body }}
      </div>
    </div>
  `,
  css: `
    .page {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .page.hidden {
      display: none;
    }

    .pull-right {
      float: right;
    }

    .page-head {
      font-size: 12px;
      font-weight: bold;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
      padding-right: 10px;
      background-color: #E9EDC9;
    }

    .page-body {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
    }
  `,
});

export default Page;
