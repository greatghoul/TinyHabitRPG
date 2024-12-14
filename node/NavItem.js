const NavItem = Ractive.extend({
  data: function () {
    return {
      title: null,
      key: null,
      active: false,
    };
  },
  template: `
    <button class="nav-item" class-active="active" on-click="click">{{ title }}</button>
  `,
  css: `
    .nav-item {
      display: block;
      width: 100%;
      line-height: 2;
      border: 0;
      cursor: pointer;
      background-color: #FAEDCD;
      margin-bottom: 1px;
    }
    .nav-item:hover {
      background-color: #F0E6D3;
    }
    .nav-item:active,
    .nav-item.active {
      background-color: #E6DAC2;
    }

  `,
  on: {
    click: function () {
      const key = this.get('key');
      this.fire('actived', key);
      window.location.hash = key;
    },
  }
});

export default NavItem;
