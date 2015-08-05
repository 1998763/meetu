fis.match('*.css', {
    packTo: 'css/g.css',
    optimizer: fis.plugin('clean-css')
});
