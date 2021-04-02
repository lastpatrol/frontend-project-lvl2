const getRandomIndex = (length) => Math.floor(Math.random() * length);
const reactions = [
  'Ohh... Not now!',
  'Go away, I\'m busy!',
  'I\'m lazy, I won\'t do anything...',
  'Aren\'t you working too hard?',
  'Go have a cup of coffee.',
  'Pfffft...',
  'Probably tomorrow...',
  'I\'m not in the mood...',
  'Don\'t you got nothin\' better to do?',
  'Come on... This is just stupid!',
  'Stop this!',
  'Don\'t you bother me!',
  'Agrrrr...',
  'I\'m tired today...',
  '-_-',
  'Not today',
  'Do it yourself!',
  'Ask somebody else!',
];

export default () => {
  const { length } = reactions;
  return reactions[getRandomIndex(length)];
};
