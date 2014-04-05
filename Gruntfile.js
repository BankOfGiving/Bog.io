module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // ----------------------------------------
        // Code Validation
        // ----------------------------------------
        htmlhint: {
            src_client_apps_pub: {
                src: ['client/src/apps/pub/**/*.html']
            },
            src_client_mod: {
                src: ['client/src/mod/**/*.html']
            }
        },
        jshint: {
            src_client_lib_bog: {
                src: ['client/src/lib/bog/**/*.js']
            },
            src_client_mod: {
                src: ['client/src/mod/**/*.js']
            },
            src_client_apps_pub: {
                src: ['client/src/apps/pub/**/*.js']
            },
            src_server: {
                src: ['server/**/*.js']
            }
        },

        // ----------------------------------------
        // Concatenation
        // ----------------------------------------
        concat: {
            src_client_lib_bog: {
                src: 'client/src/lib/bog/**/*.js',
                dest: 'client/src/lib/bog/bog.pub.min.js'
            }
        },
        less: {
            dev: {
                options: {
                    //cleancss: true,
                    strictImports: true,
                    strictMath: true,
                    strictUnits: true
                },
                files: {
                    "client/src/styles/pub.min.css": "client/src/styles/pub/pub.less"
                }
            },
            deploy: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2,
                    cleancss: true
                },
                files: {
                    "client/dist/styles/pub.min.css": "client/src/styles/pub.min.css"
                }
            }
        },
        cssmin: {
            clean: {
                options: {
                    keepSpecialComments: 0
                },
                files: {
                    'client/src/styles/pub.min.css': 'client/src/styles/pub.min.css'
                }
            }
        },

        // ----------------------------------------
        // Deployment
        // ----------------------------------------
        clean: {
            dist: ["client/dist/"]
        },
        uglify: {
            'deploy_mod': {
                options: {
                    mangle: true,
                    dead_code: true,
                    squeeze: {dead_code: true},
                    codegen: {quote_keys: true}
                },
                expand: true,
                cwd: 'client/src/mod',
                src: '**/*.js',
                dest: 'client/dist/mod'
            },
            'deploy_pub': {
                options: {
                    mangle: true,
                    dead_code: true,
                    squeeze: {dead_code: true},
                    codegen: {quote_keys: true}
                },
                expand: true,
                cwd: 'client/src/apps/pub',
                src: '**/*.js',
                dest: 'client/dist/apps/pub'
            },
            deploy_shared: {
                options: {
                    mangle: true,
                    dead_code: true,
                    squeeze: {dead_code: true},
                    codegen: {quote_keys: true}
                },
                expand: true,
                cwd: 'client/src/lib',
                src: '**/*.js',
                dest: 'client/dist/lib'
            }
        },
        htmlmin: {
            deploy_pub: {
                options: {
                    removeCommentsFromCDATA: true,
                    removeComments: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeEmptyElements: false
                },
                files: [
                    {
                        expand: true,
                        cwd: 'client/src/apps/pub/',
                        src: ['**/*.html'],
                        dest: 'client/dist/apps/pub/'
                    }
                ]
            }
        },
        imagemin: {
            deploy_shared: {
                files: [
                    {
                        expand: true,
                        cwd: 'client/src/img/',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: 'client/dist/img/'
                    }
                ]
            }
        },

        // ----------------------------------------
        // Watch Tasks
        // ----------------------------------------
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
            'client_auth': {
                files: ['client/apps/auth/**/*.*'],
                tasks: ['client_auth'],
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
            },
            'server': {
                files: ['server/**/*.js'],
                tasks: ['server'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.registerTask('default',
        [
            'client_pub',
            'client_dash',
            'client_auth',
            'client_admin',
            'server'
        ]
    );

    grunt.registerTask('validate-all', [
        'htmlhint:src_client_apps_pub',
        'htmlhint:src_client_mod',

        'jshint:src_client_apps_pub',
        'jshint:src_client_lib_bog',
        'jshint:src_client_mod',
        'jshint:src_server'
    ]);

    grunt.registerTask('concat-all', [
        'concat:src_client_lib_bog',
        'less:dev'
    ]);

    grunt.registerTask('deploy-shared', [
        'uglify:deploy_shared',
        'uglify:deploy_mod',
        'imagemin:deploy_shared',
        'less:deploy'
    ]);

    grunt.registerTask('deploy-pub', [
        'uglify:deploy_pub',
        'htmlmin:deploy_pub'
    ]);

    grunt.registerTask('deploy-full', [
        'clean:dist',
        'validate-all',
        'concat-all',
        'deploy-shared',
        'deploy-pub'
    ]);


    grunt.registerTask('server',
        [
            'jshint:src_server'
        ]);

    grunt.registerTask('client_pub',
        [
            'htmlhint:src_client_pub',
            'jshint:src_client_pub',
            'less:pub',
            'uglify:pub_bog',
            'uglify:pub_views'
        ]);

    grunt.registerTask('client_auth',
        [
            'jshint:src_client_auth'
            //, 'less:auth'
        ]);

    grunt.registerTask('client_admin',
        [
            'htmlhint:src_client_admin'
            , 'jshint:src_client_admin'
            //, 'less:admin'
        ]);

    grunt.registerTask('client_dash',
        [
            'uglify:dash_bog',
            'htmlhint:src_client_dash',
            'jshint:src_client_dash'
            //, 'less:dash'
        ]);

    grunt.registerTask('watch', 'watch'); //, 'watch:client');

    // grunt.registerTask("dash", ['jshint:src_dash', 'concat:dash-js', 'uglify:dash-js', 'less:dash', 'jshint:min_dash']);

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
};
