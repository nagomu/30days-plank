import { Next } from '~/services/firebase/archive';

export type ArchiveLike = {
  id: string;
  challenge: string;
  title: string;
  rate: number;
  createdAt: Next;
  updatedAt: Next;
};

export const archives = (): ArchiveLike[] => [
  {
    id: '100',
    challenge: 'c-100',
    title: 'title-100',
    rate: 20,
    createdAt: { seconds: 1523318400, nanoseconds: 0 },
    updatedAt: { seconds: 1523318400, nanoseconds: 0 },
  },
  {
    id: '99',
    challenge: 'c-99',
    title: 'title-99',
    rate: 20,
    createdAt: { seconds: 1523232000, nanoseconds: 0 },
    updatedAt: { seconds: 1523232000, nanoseconds: 0 },
  },
  {
    id: '98',
    challenge: 'c-98',
    title: 'title-98',
    rate: 20,
    createdAt: { seconds: 1523145600, nanoseconds: 0 },
    updatedAt: { seconds: 1523145600, nanoseconds: 0 },
  },
  {
    id: '97',
    challenge: 'c-97',
    title: 'title-97',
    rate: 20,
    createdAt: { seconds: 1523059200, nanoseconds: 0 },
    updatedAt: { seconds: 1523059200, nanoseconds: 0 },
  },
  {
    id: '96',
    challenge: 'c-96',
    title: 'title-96',
    rate: 20,
    createdAt: { seconds: 1522972800, nanoseconds: 0 },
    updatedAt: { seconds: 1522972800, nanoseconds: 0 },
  },
  {
    id: '95',
    challenge: 'c-95',
    title: 'title-95',
    rate: 20,
    createdAt: { seconds: 1522886400, nanoseconds: 0 },
    updatedAt: { seconds: 1522886400, nanoseconds: 0 },
  },
  {
    id: '94',
    challenge: 'c-94',
    title: 'title-94',
    rate: 20,
    createdAt: { seconds: 1522800000, nanoseconds: 0 },
    updatedAt: { seconds: 1522800000, nanoseconds: 0 },
  },
  {
    id: '93',
    challenge: 'c-93',
    title: 'title-93',
    rate: 20,
    createdAt: { seconds: 1522713600, nanoseconds: 0 },
    updatedAt: { seconds: 1522713600, nanoseconds: 0 },
  },
  {
    id: '92',
    challenge: 'c-92',
    title: 'title-92',
    rate: 20,
    createdAt: { seconds: 1522627200, nanoseconds: 0 },
    updatedAt: { seconds: 1522627200, nanoseconds: 0 },
  },
  {
    id: '91',
    challenge: 'c-91',
    title: 'title-91',
    rate: 20,
    createdAt: { seconds: 1522540800, nanoseconds: 0 },
    updatedAt: { seconds: 1522540800, nanoseconds: 0 },
  },
  {
    id: '90',
    challenge: 'c-90',
    title: 'title-90',
    rate: 20,
    createdAt: { seconds: 1522454400, nanoseconds: 0 },
    updatedAt: { seconds: 1522454400, nanoseconds: 0 },
  },
  {
    id: '89',
    challenge: 'c-89',
    title: 'title-89',
    rate: 20,
    createdAt: { seconds: 1522368000, nanoseconds: 0 },
    updatedAt: { seconds: 1522368000, nanoseconds: 0 },
  },
  {
    id: '88',
    challenge: 'c-88',
    title: 'title-88',
    rate: 20,
    createdAt: { seconds: 1522281600, nanoseconds: 0 },
    updatedAt: { seconds: 1522281600, nanoseconds: 0 },
  },
  {
    id: '87',
    challenge: 'c-87',
    title: 'title-87',
    rate: 20,
    createdAt: { seconds: 1522195200, nanoseconds: 0 },
    updatedAt: { seconds: 1522195200, nanoseconds: 0 },
  },
  {
    id: '86',
    challenge: 'c-86',
    title: 'title-86',
    rate: 20,
    createdAt: { seconds: 1522108800, nanoseconds: 0 },
    updatedAt: { seconds: 1522108800, nanoseconds: 0 },
  },
  {
    id: '85',
    challenge: 'c-85',
    title: 'title-85',
    rate: 20,
    createdAt: { seconds: 1522022400, nanoseconds: 0 },
    updatedAt: { seconds: 1522022400, nanoseconds: 0 },
  },
  {
    id: '84',
    challenge: 'c-84',
    title: 'title-84',
    rate: 20,
    createdAt: { seconds: 1521936000, nanoseconds: 0 },
    updatedAt: { seconds: 1521936000, nanoseconds: 0 },
  },
  {
    id: '83',
    challenge: 'c-83',
    title: 'title-83',
    rate: 20,
    createdAt: { seconds: 1521849600, nanoseconds: 0 },
    updatedAt: { seconds: 1521849600, nanoseconds: 0 },
  },
  {
    id: '82',
    challenge: 'c-82',
    title: 'title-82',
    rate: 20,
    createdAt: { seconds: 1521763200, nanoseconds: 0 },
    updatedAt: { seconds: 1521763200, nanoseconds: 0 },
  },
  {
    id: '81',
    challenge: 'c-81',
    title: 'title-81',
    rate: 20,
    createdAt: { seconds: 1521676800, nanoseconds: 0 },
    updatedAt: { seconds: 1521676800, nanoseconds: 0 },
  },
  {
    id: '80',
    challenge: 'c-80',
    title: 'title-80',
    rate: 20,
    createdAt: { seconds: 1521590400, nanoseconds: 0 },
    updatedAt: { seconds: 1521590400, nanoseconds: 0 },
  },
  {
    id: '79',
    challenge: 'c-79',
    title: 'title-79',
    rate: 20,
    createdAt: { seconds: 1521504000, nanoseconds: 0 },
    updatedAt: { seconds: 1521504000, nanoseconds: 0 },
  },
  {
    id: '78',
    challenge: 'c-78',
    title: 'title-78',
    rate: 20,
    createdAt: { seconds: 1521417600, nanoseconds: 0 },
    updatedAt: { seconds: 1521417600, nanoseconds: 0 },
  },
  {
    id: '77',
    challenge: 'c-77',
    title: 'title-77',
    rate: 20,
    createdAt: { seconds: 1521331200, nanoseconds: 0 },
    updatedAt: { seconds: 1521331200, nanoseconds: 0 },
  },
  {
    id: '76',
    challenge: 'c-76',
    title: 'title-76',
    rate: 20,
    createdAt: { seconds: 1521244800, nanoseconds: 0 },
    updatedAt: { seconds: 1521244800, nanoseconds: 0 },
  },
  {
    id: '75',
    challenge: 'c-75',
    title: 'title-75',
    rate: 20,
    createdAt: { seconds: 1521158400, nanoseconds: 0 },
    updatedAt: { seconds: 1521158400, nanoseconds: 0 },
  },
  {
    id: '74',
    challenge: 'c-74',
    title: 'title-74',
    rate: 20,
    createdAt: { seconds: 1521072000, nanoseconds: 0 },
    updatedAt: { seconds: 1521072000, nanoseconds: 0 },
  },
  {
    id: '73',
    challenge: 'c-73',
    title: 'title-73',
    rate: 20,
    createdAt: { seconds: 1520985600, nanoseconds: 0 },
    updatedAt: { seconds: 1520985600, nanoseconds: 0 },
  },
  {
    id: '72',
    challenge: 'c-72',
    title: 'title-72',
    rate: 20,
    createdAt: { seconds: 1520899200, nanoseconds: 0 },
    updatedAt: { seconds: 1520899200, nanoseconds: 0 },
  },
  {
    id: '71',
    challenge: 'c-71',
    title: 'title-71',
    rate: 20,
    createdAt: { seconds: 1520812800, nanoseconds: 0 },
    updatedAt: { seconds: 1520812800, nanoseconds: 0 },
  },
  {
    id: '70',
    challenge: 'c-70',
    title: 'title-70',
    rate: 20,
    createdAt: { seconds: 1520726400, nanoseconds: 0 },
    updatedAt: { seconds: 1520726400, nanoseconds: 0 },
  },
  {
    id: '69',
    challenge: 'c-69',
    title: 'title-69',
    rate: 20,
    createdAt: { seconds: 1520640000, nanoseconds: 0 },
    updatedAt: { seconds: 1520640000, nanoseconds: 0 },
  },
  {
    id: '68',
    challenge: 'c-68',
    title: 'title-68',
    rate: 20,
    createdAt: { seconds: 1520553600, nanoseconds: 0 },
    updatedAt: { seconds: 1520553600, nanoseconds: 0 },
  },
  {
    id: '67',
    challenge: 'c-67',
    title: 'title-67',
    rate: 20,
    createdAt: { seconds: 1520467200, nanoseconds: 0 },
    updatedAt: { seconds: 1520467200, nanoseconds: 0 },
  },
  {
    id: '66',
    challenge: 'c-66',
    title: 'title-66',
    rate: 20,
    createdAt: { seconds: 1520380800, nanoseconds: 0 },
    updatedAt: { seconds: 1520380800, nanoseconds: 0 },
  },
  {
    id: '65',
    challenge: 'c-65',
    title: 'title-65',
    rate: 20,
    createdAt: { seconds: 1520294400, nanoseconds: 0 },
    updatedAt: { seconds: 1520294400, nanoseconds: 0 },
  },
  {
    id: '64',
    challenge: 'c-64',
    title: 'title-64',
    rate: 20,
    createdAt: { seconds: 1520208000, nanoseconds: 0 },
    updatedAt: { seconds: 1520208000, nanoseconds: 0 },
  },
  {
    id: '63',
    challenge: 'c-63',
    title: 'title-63',
    rate: 20,
    createdAt: { seconds: 1520121600, nanoseconds: 0 },
    updatedAt: { seconds: 1520121600, nanoseconds: 0 },
  },
  {
    id: '62',
    challenge: 'c-62',
    title: 'title-62',
    rate: 20,
    createdAt: { seconds: 1520035200, nanoseconds: 0 },
    updatedAt: { seconds: 1520035200, nanoseconds: 0 },
  },
  {
    id: '61',
    challenge: 'c-61',
    title: 'title-61',
    rate: 20,
    createdAt: { seconds: 1519948800, nanoseconds: 0 },
    updatedAt: { seconds: 1519948800, nanoseconds: 0 },
  },
  {
    id: '60',
    challenge: 'c-60',
    title: 'title-60',
    rate: 20,
    createdAt: { seconds: 1519862400, nanoseconds: 0 },
    updatedAt: { seconds: 1519862400, nanoseconds: 0 },
  },
  {
    id: '59',
    challenge: 'c-59',
    title: 'title-59',
    rate: 20,
    createdAt: { seconds: 1519776000, nanoseconds: 0 },
    updatedAt: { seconds: 1519776000, nanoseconds: 0 },
  },
  {
    id: '58',
    challenge: 'c-58',
    title: 'title-58',
    rate: 20,
    createdAt: { seconds: 1519689600, nanoseconds: 0 },
    updatedAt: { seconds: 1519689600, nanoseconds: 0 },
  },
  {
    id: '57',
    challenge: 'c-57',
    title: 'title-57',
    rate: 20,
    createdAt: { seconds: 1519603200, nanoseconds: 0 },
    updatedAt: { seconds: 1519603200, nanoseconds: 0 },
  },
  {
    id: '56',
    challenge: 'c-56',
    title: 'title-56',
    rate: 20,
    createdAt: { seconds: 1519516800, nanoseconds: 0 },
    updatedAt: { seconds: 1519516800, nanoseconds: 0 },
  },
  {
    id: '55',
    challenge: 'c-55',
    title: 'title-55',
    rate: 20,
    createdAt: { seconds: 1519430400, nanoseconds: 0 },
    updatedAt: { seconds: 1519430400, nanoseconds: 0 },
  },
  {
    id: '54',
    challenge: 'c-54',
    title: 'title-54',
    rate: 20,
    createdAt: { seconds: 1519344000, nanoseconds: 0 },
    updatedAt: { seconds: 1519344000, nanoseconds: 0 },
  },
  {
    id: '53',
    challenge: 'c-53',
    title: 'title-53',
    rate: 20,
    createdAt: { seconds: 1519257600, nanoseconds: 0 },
    updatedAt: { seconds: 1519257600, nanoseconds: 0 },
  },
  {
    id: '52',
    challenge: 'c-52',
    title: 'title-52',
    rate: 20,
    createdAt: { seconds: 1519171200, nanoseconds: 0 },
    updatedAt: { seconds: 1519171200, nanoseconds: 0 },
  },
  {
    id: '51',
    challenge: 'c-51',
    title: 'title-51',
    rate: 20,
    createdAt: { seconds: 1519084800, nanoseconds: 0 },
    updatedAt: { seconds: 1519084800, nanoseconds: 0 },
  },
  {
    id: '50',
    challenge: 'c-50',
    title: 'title-50',
    rate: 20,
    createdAt: { seconds: 1518998400, nanoseconds: 0 },
    updatedAt: { seconds: 1518998400, nanoseconds: 0 },
  },
  {
    id: '49',
    challenge: 'c-49',
    title: 'title-49',
    rate: 20,
    createdAt: { seconds: 1518912000, nanoseconds: 0 },
    updatedAt: { seconds: 1518912000, nanoseconds: 0 },
  },
  {
    id: '48',
    challenge: 'c-48',
    title: 'title-48',
    rate: 20,
    createdAt: { seconds: 1518825600, nanoseconds: 0 },
    updatedAt: { seconds: 1518825600, nanoseconds: 0 },
  },
  {
    id: '47',
    challenge: 'c-47',
    title: 'title-47',
    rate: 20,
    createdAt: { seconds: 1518739200, nanoseconds: 0 },
    updatedAt: { seconds: 1518739200, nanoseconds: 0 },
  },
  {
    id: '46',
    challenge: 'c-46',
    title: 'title-46',
    rate: 20,
    createdAt: { seconds: 1518652800, nanoseconds: 0 },
    updatedAt: { seconds: 1518652800, nanoseconds: 0 },
  },
  {
    id: '45',
    challenge: 'c-45',
    title: 'title-45',
    rate: 20,
    createdAt: { seconds: 1518566400, nanoseconds: 0 },
    updatedAt: { seconds: 1518566400, nanoseconds: 0 },
  },
  {
    id: '44',
    challenge: 'c-44',
    title: 'title-44',
    rate: 20,
    createdAt: { seconds: 1518480000, nanoseconds: 0 },
    updatedAt: { seconds: 1518480000, nanoseconds: 0 },
  },
  {
    id: '43',
    challenge: 'c-43',
    title: 'title-43',
    rate: 20,
    createdAt: { seconds: 1518393600, nanoseconds: 0 },
    updatedAt: { seconds: 1518393600, nanoseconds: 0 },
  },
  {
    id: '42',
    challenge: 'c-42',
    title: 'title-42',
    rate: 20,
    createdAt: { seconds: 1518307200, nanoseconds: 0 },
    updatedAt: { seconds: 1518307200, nanoseconds: 0 },
  },
  {
    id: '41',
    challenge: 'c-41',
    title: 'title-41',
    rate: 20,
    createdAt: { seconds: 1518220800, nanoseconds: 0 },
    updatedAt: { seconds: 1518220800, nanoseconds: 0 },
  },
  {
    id: '40',
    challenge: 'c-40',
    title: 'title-40',
    rate: 20,
    createdAt: { seconds: 1518134400, nanoseconds: 0 },
    updatedAt: { seconds: 1518134400, nanoseconds: 0 },
  },
  {
    id: '39',
    challenge: 'c-39',
    title: 'title-39',
    rate: 20,
    createdAt: { seconds: 1518048000, nanoseconds: 0 },
    updatedAt: { seconds: 1518048000, nanoseconds: 0 },
  },
  {
    id: '38',
    challenge: 'c-38',
    title: 'title-38',
    rate: 20,
    createdAt: { seconds: 1517961600, nanoseconds: 0 },
    updatedAt: { seconds: 1517961600, nanoseconds: 0 },
  },
  {
    id: '37',
    challenge: 'c-37',
    title: 'title-37',
    rate: 20,
    createdAt: { seconds: 1517875200, nanoseconds: 0 },
    updatedAt: { seconds: 1517875200, nanoseconds: 0 },
  },
  {
    id: '36',
    challenge: 'c-36',
    title: 'title-36',
    rate: 20,
    createdAt: { seconds: 1517788800, nanoseconds: 0 },
    updatedAt: { seconds: 1517788800, nanoseconds: 0 },
  },
  {
    id: '35',
    challenge: 'c-35',
    title: 'title-35',
    rate: 20,
    createdAt: { seconds: 1517702400, nanoseconds: 0 },
    updatedAt: { seconds: 1517702400, nanoseconds: 0 },
  },
  {
    id: '34',
    challenge: 'c-34',
    title: 'title-34',
    rate: 20,
    createdAt: { seconds: 1517616000, nanoseconds: 0 },
    updatedAt: { seconds: 1517616000, nanoseconds: 0 },
  },
  {
    id: '33',
    challenge: 'c-33',
    title: 'title-33',
    rate: 20,
    createdAt: { seconds: 1517529600, nanoseconds: 0 },
    updatedAt: { seconds: 1517529600, nanoseconds: 0 },
  },
  {
    id: '32',
    challenge: 'c-32',
    title: 'title-32',
    rate: 20,
    createdAt: { seconds: 1517443200, nanoseconds: 0 },
    updatedAt: { seconds: 1517443200, nanoseconds: 0 },
  },
  {
    id: '31',
    challenge: 'c-31',
    title: 'title-31',
    rate: 20,
    createdAt: { seconds: 1517356800, nanoseconds: 0 },
    updatedAt: { seconds: 1517356800, nanoseconds: 0 },
  },
  {
    id: '30',
    challenge: 'c-30',
    title: 'title-30',
    rate: 20,
    createdAt: { seconds: 1517270400, nanoseconds: 0 },
    updatedAt: { seconds: 1517270400, nanoseconds: 0 },
  },
  {
    id: '29',
    challenge: 'c-29',
    title: 'title-29',
    rate: 20,
    createdAt: { seconds: 1517184000, nanoseconds: 0 },
    updatedAt: { seconds: 1517184000, nanoseconds: 0 },
  },
  {
    id: '28',
    challenge: 'c-28',
    title: 'title-28',
    rate: 20,
    createdAt: { seconds: 1517097600, nanoseconds: 0 },
    updatedAt: { seconds: 1517097600, nanoseconds: 0 },
  },
  {
    id: '27',
    challenge: 'c-27',
    title: 'title-27',
    rate: 20,
    createdAt: { seconds: 1517011200, nanoseconds: 0 },
    updatedAt: { seconds: 1517011200, nanoseconds: 0 },
  },
  {
    id: '26',
    challenge: 'c-26',
    title: 'title-26',
    rate: 20,
    createdAt: { seconds: 1516924800, nanoseconds: 0 },
    updatedAt: { seconds: 1516924800, nanoseconds: 0 },
  },
  {
    id: '25',
    challenge: 'c-25',
    title: 'title-25',
    rate: 20,
    createdAt: { seconds: 1516838400, nanoseconds: 0 },
    updatedAt: { seconds: 1516838400, nanoseconds: 0 },
  },
  {
    id: '24',
    challenge: 'c-24',
    title: 'title-24',
    rate: 20,
    createdAt: { seconds: 1516752000, nanoseconds: 0 },
    updatedAt: { seconds: 1516752000, nanoseconds: 0 },
  },
  {
    id: '23',
    challenge: 'c-23',
    title: 'title-23',
    rate: 20,
    createdAt: { seconds: 1516665600, nanoseconds: 0 },
    updatedAt: { seconds: 1516665600, nanoseconds: 0 },
  },
  {
    id: '22',
    challenge: 'c-22',
    title: 'title-22',
    rate: 20,
    createdAt: { seconds: 1516579200, nanoseconds: 0 },
    updatedAt: { seconds: 1516579200, nanoseconds: 0 },
  },
  {
    id: '21',
    challenge: 'c-21',
    title: 'title-21',
    rate: 20,
    createdAt: { seconds: 1516492800, nanoseconds: 0 },
    updatedAt: { seconds: 1516492800, nanoseconds: 0 },
  },
  {
    id: '20',
    challenge: 'c-20',
    title: 'title-20',
    rate: 20,
    createdAt: { seconds: 1516406400, nanoseconds: 0 },
    updatedAt: { seconds: 1516406400, nanoseconds: 0 },
  },
  {
    id: '19',
    challenge: 'c-19',
    title: 'title-19',
    rate: 20,
    createdAt: { seconds: 1516320000, nanoseconds: 0 },
    updatedAt: { seconds: 1516320000, nanoseconds: 0 },
  },
  {
    id: '18',
    challenge: 'c-18',
    title: 'title-18',
    rate: 20,
    createdAt: { seconds: 1516233600, nanoseconds: 0 },
    updatedAt: { seconds: 1516233600, nanoseconds: 0 },
  },
  {
    id: '17',
    challenge: 'c-17',
    title: 'title-17',
    rate: 20,
    createdAt: { seconds: 1516147200, nanoseconds: 0 },
    updatedAt: { seconds: 1516147200, nanoseconds: 0 },
  },
  {
    id: '16',
    challenge: 'c-16',
    title: 'title-16',
    rate: 20,
    createdAt: { seconds: 1516060800, nanoseconds: 0 },
    updatedAt: { seconds: 1516060800, nanoseconds: 0 },
  },
  {
    id: '15',
    challenge: 'c-15',
    title: 'title-15',
    rate: 20,
    createdAt: { seconds: 1515974400, nanoseconds: 0 },
    updatedAt: { seconds: 1515974400, nanoseconds: 0 },
  },
  {
    id: '14',
    challenge: 'c-14',
    title: 'title-14',
    rate: 20,
    createdAt: { seconds: 1515888000, nanoseconds: 0 },
    updatedAt: { seconds: 1515888000, nanoseconds: 0 },
  },
  {
    id: '13',
    challenge: 'c-13',
    title: 'title-13',
    rate: 20,
    createdAt: { seconds: 1515801600, nanoseconds: 0 },
    updatedAt: { seconds: 1515801600, nanoseconds: 0 },
  },
  {
    id: '12',
    challenge: 'c-12',
    title: 'title-12',
    rate: 20,
    createdAt: { seconds: 1515715200, nanoseconds: 0 },
    updatedAt: { seconds: 1515715200, nanoseconds: 0 },
  },
  {
    id: '11',
    challenge: 'c-11',
    title: 'title-11',
    rate: 20,
    createdAt: { seconds: 1515628800, nanoseconds: 0 },
    updatedAt: { seconds: 1515628800, nanoseconds: 0 },
  },
  {
    id: '10',
    challenge: 'c-10',
    title: 'title-10',
    rate: 20,
    createdAt: { seconds: 1515542400, nanoseconds: 0 },
    updatedAt: { seconds: 1515542400, nanoseconds: 0 },
  },
  {
    id: '9',
    challenge: 'c-9',
    title: 'title-9',
    rate: 20,
    createdAt: { seconds: 1515456000, nanoseconds: 0 },
    updatedAt: { seconds: 1515456000, nanoseconds: 0 },
  },
  {
    id: '8',
    challenge: 'c-8',
    title: 'title-8',
    rate: 20,
    createdAt: { seconds: 1515369600, nanoseconds: 0 },
    updatedAt: { seconds: 1515369600, nanoseconds: 0 },
  },
  {
    id: '7',
    challenge: 'c-7',
    title: 'title-7',
    rate: 20,
    createdAt: { seconds: 1515283200, nanoseconds: 0 },
    updatedAt: { seconds: 1515283200, nanoseconds: 0 },
  },
  {
    id: '6',
    challenge: 'c-6',
    title: 'title-6',
    rate: 20,
    createdAt: { seconds: 1515196800, nanoseconds: 0 },
    updatedAt: { seconds: 1515196800, nanoseconds: 0 },
  },
  {
    id: '5',
    challenge: 'c-5',
    title: 'title-5',
    rate: 20,
    createdAt: { seconds: 1515110400, nanoseconds: 0 },
    updatedAt: { seconds: 1515110400, nanoseconds: 0 },
  },
  {
    id: '4',
    challenge: 'c-4',
    title: 'title-4',
    rate: 20,
    createdAt: { seconds: 1515024000, nanoseconds: 0 },
    updatedAt: { seconds: 1515024000, nanoseconds: 0 },
  },
  {
    id: '3',
    challenge: 'c-3',
    title: 'title-3',
    rate: 20,
    createdAt: { seconds: 1514937600, nanoseconds: 0 },
    updatedAt: { seconds: 1514937600, nanoseconds: 0 },
  },
  {
    id: '2',
    challenge: 'c-2',
    title: 'title-2',
    rate: 20,
    createdAt: { seconds: 1514851200, nanoseconds: 0 },
    updatedAt: { seconds: 1514851200, nanoseconds: 0 },
  },
  {
    id: '1',
    challenge: 'c-1',
    title: 'title-1',
    rate: 20,
    createdAt: { seconds: 1514764800, nanoseconds: 0 },
    updatedAt: { seconds: 1514764800, nanoseconds: 0 },
  },
];
