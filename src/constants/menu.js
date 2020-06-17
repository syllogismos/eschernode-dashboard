const data = [
  {
    id: 'home',
    icon: 'iconsminds-air-balloon-1',
    label: 'menu.app',
    to: '/app/gogo',
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.start',
        to: '/app/gogo/start',
      },
    ],
  },
  {
    id: 'segmentation',
    icon: 'iconsminds-filter-2',
    label: 'menu.segmentation',
    to: '/app/second-menu',
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.second',
        to: '/app/second-menu/second',
      },
    ],
  },
  {
    id: 'campaigns',
    icon: 'iconsminds-mail-send',
    label: 'menu.campaigns',
    to: '/app/second-menu',
  },
  {
    id: 'profile',
    icon: 'iconsminds-decrase-inedit',
    label: 'menu.profile',
    to: '/app/blank-page',
  },
  {
    id: 'docs',
    icon: 'iconsminds-library',
    label: 'menu.docs',
    to: 'https://gogo-react-docs.coloredstrategies.com/',
    newWindow: true,
  },
];
export default data;
