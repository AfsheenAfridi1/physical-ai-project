const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Book',
      collapsible: true,
      items: [
        'chapter1',
        'chapter2',
        'chapter3',
        'chapter4',
        'chapter5',
        'chapter6',
        'chapter7',
        'chapter8',
        'chapter9',
        'chapter10',
      ],
    },
    {
  type: 'category',
  label: 'Spec Kit',
  items: [
    'spec/intro',
    'spec/system',
    'spec/rules',
    'spec/architecture',

  ],
},
 {
      type: 'category',
      label: 'System',
      items: [
        'spec/intro',
        'rag/intro',
        'auth/intro',
        'cloud/intro',
      ],
    },
  ],
};
const tutorialSidebar = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Chapters',
      items: [
        'getting-start/intro',
        'ros2/intro',
        'simulation/intro',
        'nvidia-isaac/intro',
        'vla/intro',
      ],
    },
  ],
};

module.exports = sidebars;