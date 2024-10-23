const ghpages = require('gh-pages');
   
ghpages.publish('build', {
  branch: 'gh-pages',
  repo: 'https://github.com/namux/mvc2-randomizer.git',
  dotfiles: true
}, callback);
