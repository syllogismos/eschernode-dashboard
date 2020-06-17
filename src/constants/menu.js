const data = [
  {
    id: 'dashboards',
    icon: 'iconsminds-air-balloon-1',
    label: 'menu.dashboards',
    to: '/app/dashboards',
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.start',
        to: '/app/dashboards/start',
      },
    ],
  },
  {
    id: 'segmentation',
    icon: 'iconsminds-filter-2',
    label: 'menu.segmentation',
    to: '/app/segmentation',
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.filter',
        to: '/app/segmentation/filter',
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.custom',
        to: '/app/segmentation/custom',
      },
    ],
  },
  {
    id: 'campaigns',
    icon: 'iconsminds-mail-send',
    label: 'menu.campaigns',
    to: '/app/campaigns',
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.new.campaign',
        to: '/app/campaigns/start',
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.history',
        to: '/app/campaigns/history',
      },
    ],
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
