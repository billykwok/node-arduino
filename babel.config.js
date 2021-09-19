module.exports = {
  targets: { node: 'current' },
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' },
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true },
      },
    ],
  ],
};
