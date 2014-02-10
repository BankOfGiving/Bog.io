module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            pub: 'client/apps/pub/js/text.js',
            dash: 'client/apps/dash/js/**/*.js',
            admin: 'client/apps/admin/js/**/*.js',
            server: 'server/modules/**/*.js',
            all: 'client/apps/**/*.js'
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        "less": {
            "dev": {
                files: ["styles.less"]
            },
            "dist": {
                files: ["styles.less"],
                options: { yuicompress: true }
            }
        }
    });

    grunt.registerTask("default", ['jshint:server']);

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-contrib-qunit');
};
