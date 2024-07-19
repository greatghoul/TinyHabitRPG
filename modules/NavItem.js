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
    }
  `
});

export default NavItem;
