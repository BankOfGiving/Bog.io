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
            src_client_admin: 'client/apps/admin/src/**/*.js',
            src_client_dash: 'client/apps/dash/src/**/*.js',
            src_client_pub: 'client/apps/pub/src/**/*.js',
            src_server: 'server/**/*.js'
        },
        less: {
            'admin': {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "client/apps/admin/src/styles/admin.css": "client/apps/admin/src/styles/*.less"
                }
            },
            'dash': {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "client/apps/dash/src/styles/dash.css": "client/apps/dash/src/styles/*.less"
                }
            },
            'pub': {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "client/apps/pub/src/styles/pub.css": "client/apps/pub/src/styles/*.less"
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
            'client_admin': {
                files: ['client/apps/admin/**/*.*'],
                tasks: ['client_admin'],
                options: {
                    nospawn: true
                }
            },
            'client_dash': {
                files: ['client/apps/dash/**/*.*'],
                tasks: ['client_dash'],
                options: {
                    nospawn: true
                }
            },
            'client_pub': {
                files: ['client/apps/pub/**/*.*'],
                tasks: ['client_pub'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.registerTask('default', 'jshint:src_server');

    grunt.registerTask('client_pub',
        [
            'htmlhint:src_client_pub',
            'jshint:src_client_pub',
            'less:pub'
        ]);

    grunt.registerTask('client_admin',
        [
            'htmlhint:src_client_admin',
            'jshint:src_client_admin',
            'less:admin'
        ]);

    grunt.registerTask('client_dash',
        [
            'htmlhint:src_client_dash',
            'jshint:src_client_dash',
            'less:dash'
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
