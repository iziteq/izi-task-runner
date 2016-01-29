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
        cities_geocode_one: {
          title: 'Geocode one StorySet',
          description: 'Делает реверс геокодинг с обновление привязки для одного конкретного музея или тура по id.',
          cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake geocode:one[{0}]",
          params: [
            {
              default: '',
              title: 'StorySet id'
            }
          ]
        },
        cities_locate: {
          title: 'Locate cities',
          description: 'По названию идет в google и получает location и bounds для города. Запускается в 6:00 UTC ежедневно.',
          cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake cities:geocode"
        },
        countries_locate: {
          title: 'Locate countries',
          description: 'По названию идет в google и получает location и bounds для страны. Запускается в 6:00 UTC ежедневно.',
          cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake countries:geocode"
        },
        tours_locate: {
          title: 'Reverse geocode tours',
          description: 'Привязывает туры/квесты к городам',
          cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake tours:geocode"
        },
        museums_locate: {
          title: 'Reverse geocode museums',
          description: 'Привязывает музеи к городам',
          cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake museums:geocode"
        }
      }
    },


    cities_and_countries_commands: {
      title: 'Города и страны',
      commands: {
        cities_translate: {
          title: 'Translate cities',
          description: 'Забирает все переводы для городов из википедии. Запускается раз в час.',
          cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake cities:translate"
        },
        cities_story_set_calculate: {
          title: 'Calculate storysets for cities',
          description: 'Наполняет индекс elasticsearch данными о наличии и количестве контента в стране и городе с учетом языка и ключа API. Max execution time 5 min. Запускается раз в пол часа.',
          cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake cities:story_set_calculate"
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
          cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake news:show_to[{0}]",
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
    rest_commands: {
      title: 'Остальное',
      commands: {
        statistics_reindex: {
          title: 'Reindex statistics',
          description: 'Забирает статисику с гугла и кладет в идекс elasticsearch. Max execution time about 5 min. Запускается в 6:00 UTC ежедневно.',
          cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake stats:reindex"
        },
        update_reviews_average: {
          title: 'Обновить сводку отзывов и оценок для API.',
          description: 'Собрает количество отзывов и среднюю оценку для каждого MTGObject\'а. Запускается в 6:00 UTC ежедневно.',
          cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake ratings:aggregate"
        }, 
        quest_validation: {
          title: 'Переодическая валидация квестов',
          description: 'Проверяет квесты на валидность, в случае не соответсвия - добавляет в админку соответствующие записи и шлёт письма модератору. Запускается в 8:00 UTC ежедневно.',
          cmd: "cd /home/deployer/apps/izi-cms/current && IZI_CONFIG=config/izi_config.yml RAILS_ENV=production bundle exec rake consistency:validate_quests"
        }
      }
    }

  }

};
