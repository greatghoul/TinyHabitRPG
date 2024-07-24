const NavItem = Ractive.extend({
  data: function () {
    return {
      title: null,
      active: false,
    };
  },
  template: `
    <button class="nav-item">{{ title }}</button>
  `,
  css: `
    .nav-item {
      display: block;
      width: 100%;
      line-height: 2;
      border: 0;
      cursor: pointer;
      background-color: #FAEDCD;
    }
    .nav-item:hover {
      background-color: #F0E6D3;
    }
    .nav-item:active {
      background-color: #E6DAC2;
    }
  `
});

export default NavItem;
