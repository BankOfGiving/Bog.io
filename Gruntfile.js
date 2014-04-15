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
            src_client_apps_dash: {
                src: ['client/src/apps/dash/**/*.html']
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
            src_client_apps_dash: {
                src: ['client/src/apps/dash/**/*.js']
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
                src: 'client/src/lib/bog/modules/*.js',
                dest: 'client/src/lib/bog/bog.pub.min.js'
            }
        },
        less: {
            pub: {
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
            dash: {
                options: {
                    //cleancss: true,
                    strictImports: true,
                    strictMath: true,
                    strictUnits: true
                },
                files: {
                    "client/src/styles/dash.min.css": "client/src/styles/dash/dash.less"
                }
            },
            deploy: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2,
                    cleancss: true
                },
                files: [
                    { "client/dist/styles/pub.min.css": "client/src/styles/pub.min.css" },
                    { "client/dist/styles/dash.min.css": "client/src/styles/dash.min.css" }
                ]
            }
        },
        cssmin: {
            clean: {
                options: {
                    keepSpecialComments: 0
                },
                files: [
                    { 'client/src/styles/pub.min.css': 'client/src/styles/pub.min.css' },
                    { 'client/src/styles/dash.min.css': 'client/src/styles/dash.min.css' }
                ]
            }
        },

        // ----------------------------------------
        // Deployment
        // ----------------------------------------
        clean: {
            dist: ["client/dist/"]
        },
        copy: {
            deploy_pub: {
                files: [
                    {
                        expand: true,
                        cwd: 'client/src/apps/pub',
                        src: '**/manifest.json',
                        dest: 'client/dist/apps/pub'
                    }
                ]
            },
            deploy_dash: {
                files: [
                    {
                        expand: true,
                        cwd: 'client/src/apps/dash',
                        src: '**/manifest.json',
                        dest: 'client/dist/apps/dash'
                    }
                ]
            },
            deploy_img: {
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
        uglify: {
            deploy_lib: {
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
            },
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
            'deploy_dash': {
                options: {
                    mangle: true,
                    dead_code: true,
                    squeeze: {dead_code: true},
                    codegen: {quote_keys: true}
                },
                expand: true,
                cwd: 'client/src/apps/dash',
                src: '**/*.js',
                dest: 'client/dist/apps/dash'
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
            },
            deploy_dash: {
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
                        cwd: 'client/src/apps/dash/',
                        src: ['**/*.html'],
                        dest: 'client/dist/apps/dash/'
                    }
                ]
            },
            deploy_mod: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeComments: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeOptionalTags: true,
                    removeEmptyElements: false,
                    useShortDoctype: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'client/src/mod/',
                        src: ['**/*.html'],
                        dest: 'client/dist/mod/'
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
        minjson: {
            deploy_pub: {
                files: [
                    {
                        expand: true,
                        cwd: 'client/src/apps/pub/',
                        src: ['**/*.json'],
                        dest: 'client/dist/apps/pub/'
                    }
                ]
            },
            deploy_dash: {
                files: [
                    {
                        expand: true,
                        cwd: 'client/src/apps/dash/',
                        src: ['**/*.json'],
                        dest: 'client/dist/apps/dash/'
                    }
                ]
            }
        },
        // ----------------------------------------
        // Watch Tasks
        // ----------------------------------------
        watch: {
            'client_pub': {
                files: [
                    'client/src/apps/pub/**/*.*',
                    'client/src/styles/pub/**/*.*'
                ],
                tasks: [
                    'htmlhint:src_client_apps_pub',
                    'jshint:src_client_apps_pub',
                    'less:pub'
                ],
                options: {
                    nospawn: true
                }
            },
            'client_dash': {
                files: [
                    'client/src/apps/dash/**/*.*',
                    'client/src/styles/dash/**/*.*'
                ],
                tasks: [
                    'htmlhint:src_client_apps_dash',
                    'jshint:src_client_apps_dash',
                    'less:dash'
                ],
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
            'client_mod': {
                files: ['client/src/mod/**/*.*'],
                tasks: [
                    'htmlhint:src_client_mod',
                    'jshint:src_client_mod'
                ],
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
            'deploy-full'
        ]
    );

    grunt.registerTask('validate-all', [
        'htmlhint:src_client_apps_pub',
        'htmlhint:src_client_apps_dash',
        'htmlhint:src_client_mod',

        'jshint:src_client_apps_pub',
        'jshint:src_client_apps_dash',
        'jshint:src_client_lib_bog',
        'jshint:src_client_mod',
        'jshint:src_server'
    ]);

    grunt.registerTask('concat-all', [
        'concat:src_client_lib_bog',
        'less:pub',
        'less:dash'
    ]);

    grunt.registerTask('deploy-shared', [
        'uglify:deploy_lib',
        'uglify:deploy_mod',
        'htmlmin:deploy_mod',
        'copy:deploy_img',
        'less:deploy'
    ]);

    grunt.registerTask('deploy-pub', [
        'uglify:deploy_pub',
        'htmlmin:deploy_pub'
        , 'minjson:deploy_pub'
    ]);

    grunt.registerTask('deploy-dash', [
        'uglify:deploy_pub',
        'htmlmin:deploy_pub',
        'minjson:deploy_pub'
    ]);

    grunt.registerTask('deploy-full', [
        'clean:dist'
        , 'validate-all'
        , 'concat-all'
        , 'deploy-shared'
        , 'deploy-pub'
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
    grunt.loadNpmTasks('grunt-minjson');
};
