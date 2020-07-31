
//create acount with necessary columns and cf is custom fields which contains addition data
exports.up = function (knex) {
  return knex.schema
    .createTable("account", function (table) {
      table.increments("id").primary()
      table.text("full_name").notNullable()
      table.text("mobile").unique().notNullable()
      table.text("email").notNullable()
      table.text("address").notNullable()
      table.text("shipping_address").notNullable()
      table.text("postalcode").notNullable()
      table.text("password")
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
    .dropTable("account")
};
