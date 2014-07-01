module.exports = {

  commands: {
    // list_processes: {
    //   title: 'Process listing',
    //   description: 'List all system processes running from current user. Takes no params.',
    //   cmd: 'ps gx'
    // },

    // list_directory: {
    //   title: 'Directory listing',
    //   description: 'List all files in directory in which command was executed. Has optional command-line string argument.',
    //   cmd: 'ls {0}',
    //   params: [
    //     {
    //       default: '-la',
    //       title: 'Command line arguments'
    //     }
    //   ]
    // },

    // long_response: {
    //   title: 'Long system response time',
    //   description: 'Just emulates really heavy computations. Calls \'sleep {0}; echo \"done\";\'.',
    //   cmd: 'sleep {0}; echo \"done\";',
    //   params: [
    //     {
    //       default: '5',
    //       title: 'Seconds to sleep'
    //     }
    //   ]
    // },

    cities_translate: {
      title: 'Translate cities',
      description: 'Забирает все переводы для городов из википедии',
      cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake cities:translate"
    },

    cities_story_set_calculate: {
      title: 'Calculate storysets for cities',
      description: 'Наполняет индекс elasticsearch данными о наличии и количестве контента в стране и городе с учетом языка и ключа API',
      cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake cities:story_set_calculate"
    },

    statistics_reindex: {
      title: 'Reindex statistics',
      description: 'Забирает статисику с гугла и кладет в идекс elasticsearch',
      cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake statistics:reindex"
    },

    cities_update_museums: {
      title: 'Update museums for cities',
      description: 'Обновляет привязку музеев к городам - забирает из google данные о городе для тех музеев, у которых нет этих данных',
      cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake cities:update:museums"
    },

    cities_update_tours: {
      title: 'Update tours for cities',
      description: 'Обновляет привязку туров к городам - забирает из google данные о городе для тех туров, у которых нет этих данных',
      cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake cities:update:tours"
    },

    cities_locate: {
      title: 'Locate cities',
      description: 'По названию идет в google и получает location и bounds для города',
      cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake cities:locate"
    },

    countries_locate: {
      title: 'Locate countries',
      description: 'По названию идет в google и получает location и bounds для страны',
      cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake countries:locate"
    },

    cities_geocode_one: {
      title: 'Geocode one city',
      description: 'Делает реверс геокодинг с обновление привязки туров и музеев для одного конкретного города по uuid. Дефолтное значение - Aмстердам.',
      cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake rake cities:geocode_one[{0}]",
      params: [
        {
          default: '3f879f37-21b0-479d-bd74-aa26f72fa328',
          title: 'City uuid'
        }
      ]
    }

  }

};
