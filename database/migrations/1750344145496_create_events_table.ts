import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('author_id').notNullable().references('id').inTable('users')
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.string('location').notNullable()
      table.date('event_date').notNullable()
      table.integer('max_attendees').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
