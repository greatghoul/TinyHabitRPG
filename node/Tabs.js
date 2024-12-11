const Tabs = Ractive.extend({
  data: function () {
    return {
      tabs: [],
      activeKey: 'taskNew',
    }
  },
  template: `
    <div class="tabs">
      <div class="tabs-head">
        {{#each tabs as tab}}
          <button
            class="tab-menu"
            class-active="tab.key == activeKey"
            on-click="['activeTab', tab.key]"
          >
            {{tab.title}}
          </button>
        {{/each}}
      </div>
      <div class="tabs-body">
        {{#each tabs as tab}}
          <div class="tab-pane" class-active="tab.key == activeKey">
            {{yield tab.key }}
          </div>
        {{/each}}
      </div>
    </div>
  `,
  css: `
    .tabs-head {
      border-bottom: 2px solid #CCD5AE;
      padding-left: 10px;
    }

    .tabs-body {
      padding-top: 10px;
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #CCD5AE;
    }
    
    .tab-menu {
      padding: 5px 8px;
      border: none;
      cursor: pointer;
      outline: none;
      background: none;
      border: 2px solid #FFFFFF;
      border-bottom: 2px solid #CCD5AE;
      position: relative;
      top: 2px;
    }

    .tab-menu.active {
      border-left: 2px solid #CCD5AE;
      border-right: 2px solid #CCD5AE;
      border-top: 2px solid #CCD5AE;
      border-bottom: 2px solid #FFFFFF;
    }

    .tab-pane {
      display: none;
    }

    .tab-pane.active {
      display: block;
    }
  `,
  on: {
    activeTab: function(context, key) {
      this.set("activeKey", key);
    }
  }
});

export default Tabs;
