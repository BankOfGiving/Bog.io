module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        htmlhint: {
            src_client_admin: {
                src: ['client/apps/admin/src/**/*.html']
            },
            src_client_dash: {
                src: ['client/apps/dash/src/**/*.html']
            },
            src_client_pub: {
                src: ['client/apps/pub/src/**/*.html']
            }
        },
        jshint: {
            src_client_admin: 'client/apps/admin/src/js/*.js',
            src_client_dash: 'client/apps/dash/src/js/*.js',
            src_client_pub: 'client/apps/pub/src/js/*.js',
            src_server: 'server/**/*.js'
        },
        less: {
            'dash': {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "client/apps/dash/src/styles.css": "client/apps/dash/src/styles/*.less"
                }
            }
        },


        concat: {
            'dash-js': {
                src: 'client/apps/dash/src/js/**/*.js',
                dest: 'client/apps/dash/src/dash.min.js'
            }
        },
        uglify: {
            options: {
                //banner: grunt.file.read('LICENCE'),
                mangle: true,
                squeeze: {dead_code: true},
                codegen: {quote_keys: true}
            },
            'dash-js': {
                src: 'client/apps/dash/src/dash.min.js',
                dest: 'client/apps/dash/dist/dash.min.js'
            }
        },
        watch: {
            'client': {
                files: ['client/apps/**/*.*'],
                tasks: ['default'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.registerTask('default',
        [
            'jshint:src_server',
            'htmlhint:src_client_admin',
            'htmlhint:src_client_dash',
            'htmlhint:src_client_pub',
            'jshint:src_client_admin',
            'jshint:src_client_dash',
            'jshint:src_client_pub',
        ]);

    grunt.registerTask('watch', 'watch:client');


    // grunt.registerTask("dash", ['jshint:src_dash', 'concat:dash-js', 'uglify:dash-js', 'less:dash', 'jshint:min_dash']);

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-htmlhint');

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
};
