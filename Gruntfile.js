module.exports = function(grunt) {

  /*
  task: {
    options: {
      compress: true
    },
    target1: { //taskをグループ化したもの
      設定
    },
    target2: {
      設定
    }
  }
  task: {
    target1: { //taskをグループ化したもの
      options: { //target1のみ圧縮
        compress: true
      },
      設定
    },
    target2: {
      設定
    }
  }
  //別の書き方
  task :{
    target: {
      options: {
        compress: true
      },
      files: {
        //dest: src
        //dest: [src1, src2]
        dest: src/*.less
      }
    }
  }
  */

  //config
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    less: {
      // options: {
      //   compress: true
      // },
      build1: {
        src: ["src/style1.less","src/style2.less"],
        dest: "build/style.css"
      }//,
      // build2: {
      //   src: "src/style2.less",
      //   dest: "build/style.css"
      // }
    },

    csslint: {
      check: {
        //src: "build/style.css"
        src: '<%= less.build1.dest %>'
      }
    },

    cssmin : {
      minimize: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/'
        },
        files: {
          'build/style.min.css': '<%= less.build1.dest %>'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      files: 'src/*.less',
      tasks: ['less', 'csslint', 'cssmin']
    },

    connect: {
      server: {
        options: {
          port: 80801,
          hostname: '127.0.0.1'
        }
      }
    }

  });

  //plugin
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  //tasks
  grunt.registerTask('default', ['less', 'csslint', 'cssmin', 'connect', 'watch']);
  grunt.registerTask('task1', 'less.build1');
  grunt.registerTask('task2', 'less.build2');
};

