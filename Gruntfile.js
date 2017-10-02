module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "src/stylesheets/index.css": "src/less/index.less",
                    "src/stylesheets/Jammming.css": "src/less/Jammming.less",
                    "src/stylesheets/Header.css": "src/less/Header.less",
                    "src/stylesheets/SearchBar.css": "src/less/SearchBar.less",
                    "src/stylesheets/Login.css": "src/less/Login.less",
                    "src/stylesheets/SearchResults.css": "src/less/SearchResults.less",
                    "src/stylesheets/PlaylistViewer.css": "src/less/PlaylistViewer.less",
                    "src/stylesheets/Track.css": "src/less/Track.less",
                }
            }
        },
        watch: {
            styles: {
                files: ['src/less/**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        }
    });
    
    grunt.registerTask('default', ['less', 'watch']);
    grunt.registerTask('build', ['less']);
}