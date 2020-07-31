//create inventory with necessary columns and cf is custom fields which contains addition data
exports.up = function (knex) {
  return knex.schema
    .createTable("inventory", function (table) {
      table.increments("id").primary()
      table.text("name").notNullable()
      table.text("description")
      table.text("category").notNullable()
      table.text("vendor").notNullable()
      table.integer("available_size")
      table.text("size")
      table.json("available_color")
      table.text("color")
      table.decimal("discount")
      table.text("picture")
      table.decimal("price").notNullable()
      table.text("avail_status")
      table.integer("stock_level").defaultTo(0)
      table.integer("version").defaultTo(0)
      table.timestamp("avail_date", { useTz: true })
      table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now())
      table.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now())
      table.text("created_by")
      table.text("updated_by")
      table.boolean("is_deleted").defaultTo(false)
      table.json("cf")
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("inventory")
};
