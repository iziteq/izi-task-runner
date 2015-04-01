module.exports = {

  commands: {
    development_commands: {
      title: 'Commands, used in development to test utility',
      commands: {
        list_directory: {
          title: 'Directory listing',
          description: 'List all files in directory in which command was executed. Has optional command-line string argument.',
          cmd: 'ls {0}',
          params: [
            {
              default: '-la',
              title: 'Command line arguments'
            }
          ]
        },

        rake_test: {
          title: 'Test rake execution',
          description: 'Тестовая задача для проверки выполнения задач для rake',
          cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake db:migrate:status"
        }
      }
    },

    geocoding_commands: {
      title: 'Гео-кодинг',
      commands: {
        // cities_update_museums: {
        //   title: 'Update museums for cities',
        //   description: 'Обновляет привязку музеев к городам - забирает из google данные о городе для тех музеев, у которых нет этих данных. Запускается в 6:00 UTC ежедневно.',
        //   cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake cities:update:museums"
        // },

        // cities_update_tours: {
        //   title: 'Update tours for cities',
        //   description: 'Обновляет привязку туров к городам - забирает из google данные о городе для тех туров, у которых нет этих данных. Запускается в 6:00 UTC ежедневно.',
        //   cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake cities:update:tours"
        // },
        cities_geocode_one: {
          title: 'Geocode one StorySet',
          description: 'Делает реверс геокодинг с обновление привязки для одного конкретного музея или тура по id.',
          cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake cities:geocode_one[{0}]",
          params: [
            {
              default: '',
              title: 'StorySet id'
            }
          ]
        }
      }
    },

    cities_and_countries_commands: {
      title: 'Города и страны',
      commands: {
        cities_story_set_calculate: {
          title: 'Calculate storysets for cities',
          description: 'Наполняет индекс elasticsearch данными о наличии и количестве контента в стране и городе с учетом языка и ключа API. Max execution time 5 min. Запускается раз в пол часа.',
          cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake cities:story_set_calculate"
        },
        cities_locate: {
          title: 'Locate cities',
          description: 'По названию идет в google и получает location и bounds для города. Запускается в 6:00 UTC ежедневно.',
          cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake cities:locate"
        },
        countries_locate: {
          title: 'Locate countries',
          description: 'По названию идет в google и получает location и bounds для страны. Запускается в 6:00 UTC ежедневно.',
          cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake countries:locate"
        },
        cities_translate: {
          title: 'Translate cities',
          description: 'Забирает все переводы для городов из википедии. Запускается раз в час.',
          cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake cities:translate"
        }
      }
    },

    izi_cms: {
      title: 'izi.TRAVEL CMS',
      commands: {
        show_news_to_all: {
          title: 'Показать What\'s new для всех пользователей.',
          description: 'Показать блок "What\'s new in izi.TRAVEL CMS" в CMS для всех пользователей',
          cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake news:show_to_all"
        },
        show_news_to: {
          title: 'Показать What\'s new для пользователя(ей).',
          description: 'Показать блок "What\'s new in izi.TRAVEL CMS" в CMS для пользователя(ей)',
          cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake news:show_to[{0}]"
          params: [
            {
              default: '',
              title: 'ID пользователя или диапазон ID пользователей в виде 1..100'
            }
          ]
        },
        hide_news: {
          title: 'Скрыть What\'s new у всех пользователей.',
          description: 'Убрать блок "What\'s new in izi.TRAVEL CMS" в CMS у всех пользователей',
          cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake news:hide_for_all"
        }
      }
    },

    izi_travel: {
      title: 'izi.TRAVEL',
      commands: {
        update_all_data: {
          title: 'Обновить список городов и стран',
          description: 'Получает данные по городам и странам из API. При успешном выполнении удаляет существующие данные и заменяет их новыми. Запускается каждый час в 6 и 36 минут.',
          cmd: "cd /home/deployer/apps/izi-travel/current && IZI_CONFIG=/home/deployer/apps/izi-travel/shared/config/izi_config.yml RAILS_ENV=production bundle exec rake db:prepare"
        },
        clear_travel_cache: {
          title: 'Очистить кэш на izi.TRAVEL',
          description: 'Чистит все закешированные записи и Travel начинает общаться с API',
          cmd: "cd /home/deployer/apps/izi-travel/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake cache:clear"
        }
      }
    },

    rest_commands: {
      title: 'Остальное',
      commands: {
        statistics_reindex: {
          title: 'Reindex statistics',
          description: 'Забирает статисику с гугла и кладет в идекс elasticsearch. Max execution time about 5 min. Запускается в 6:00 UTC ежедневно.',
          cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake statistics:reindex"
        },
        update_reviews_average: {
          title: 'Обновить сводку отзывов и оценок для API.',
          description: 'Собрает количество отзывов и среднюю оценку для каждого MTGObject\'а. Запускается в 6:00 UTC ежедневно.',
          cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake reviews:rating:all && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake reviews:rating"
        }
      }
    }

  }

};
