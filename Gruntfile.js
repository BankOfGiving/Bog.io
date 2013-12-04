
/**
 * Created by dbaxter on 11/27/13.
 */
module.exports = function (grunt){
    grunt.initConfig({
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

    grunt.loadNpmTasks('grunt-contrib-less');
};