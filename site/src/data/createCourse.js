const data = [
  {
    label: 'Course title',
    name: 'name',
    placeHolder: 'Title',
    errorMsg: '',
    required: true,
  },
  {
    label: 'Short Description',
    name: 'description',
    placeHolder: 'Description',
    errorMsg: 'should be greater than 2 letters',
    required: true,
    type: 'textarea',
  },
  {
    label: 'Duration',
    name: 'duration',
    placeHolder: 'In weeks',
    errorMsg: '',
    required: true,
  },
  {
    label: 'Level',
    name: 'level',
    placeHolder: '',
    errorMsg: '',
    required: true,
    selects: [
      { name: 'Beginner', value: 'Beginner' },
      {
        name: 'Intermediate',
        value: 'Intermediate',
      },
      { name: 'Professional', value: 'Professional' },
    ],
    itype: 'select',
  },
  {
    label: 'Category',
    name: 'category',
    placeHolder: '',
    errorMsg: 'In weeks',
    required: false,
    selects: [],
    itype: 'select',
  },
  {
    label: 'Price',
    name: 'cost',
    placeHolder: 'NGN',
    errorMsg: '',
    required: true,
    type: 'number',
  },
  {
    label: 'Initial Payment',
    name: 'initialSplitAmount',
    placeHolder: '',
    errorMsg: '',
    required: true,
    type: 'number',
  },
  {
    label: 'Final Payment',
    name: 'finalSplitAmount',
    placeHolder: '',
    errorMsg: 'enter a valid amount',
    required: true,
    type: 'number',
  },
  {
    label: 'Course link',
    name: 'learnMore',
    placeHolder: '',
    errorMsg: '',
    required: true,
  },
  {
    label: 'Class list descriptor',
    name: 'list_desc',
    placeHolder: '',
    errorMsg: '',
    required: true,
  },
  {
    label: 'Currency Type',
    name: 'currency_type',
    placeHolder: '',
    errorMsg: '',
    required: true,
    selects: [
      { name: 'Local', value: 'local' },
      {
        name: 'Foreign',
        value: 'foreign',
      },
    ],
    itype: 'select',
  },
  {
    name: 'type',
    placeHolder: 'Free Course',
    errorMsg: '',
    required: true,
    itype: 'radio',
    types: [
      {
        name: 'Free Course',
        value: 'free',
      },
      {
        name: 'Private Course',
        value: 'private',
      },
    ],
  },
  {
    name: 'thumbnail',
  },
];

export default data;
