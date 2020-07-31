//create order with necessary columns and cf is custom fields which contains addition data

exports.up = function (knex) {
  return knex.schema
    .createTable("order", function (table) {
      table.increments("id").primary()
      table.integer("inventory_id").references("id").inTable("inventory").onDelete("cascade")
      table.integer("account_id").references("id").inTable("account").onDelete("cascade")
      table.integer("order_number").notNullable()
      table.text("payment_mode").notNullable()
      table.integer("total_price").notNullable()
      table.text("transact_status").notNullable()
      table.integer("discount")
      table.integer("qty").notNullable()
      table.timestamp("order_date", { useTz: true }).defaultTo(knex.fn.now())
      table.timestamp("ship_date", { useTz: true })
      table.timestamp("payment_date", { useTz: true })
      table.timestamp("return_claim_date", { useTz: true })
      table.timestamp("return_date", { useTz: true })
      table.enu("rating", [1, 2, 3, 4, 5], { useNative: false, enumName: "rating" })
      table.timestamp("completed_at", { useTz: true })
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
    .dropTable("order")
};

