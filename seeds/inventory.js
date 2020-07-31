exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("inventory").del()
    .then(function () {
      // Inserts seed entries
      return knex("inventory").insert([{
        "name"        : "Mobile1",
        "description" : "Smart Phone",
        "category"    : "Electronics",
        "vendor"      : "Abc",
        "size"        : "16inch",
        "color"       : "Black",
        "discount"    : 20.00,
        "price"       : 3999,
        "avail_status": "YES",
        "stock_level" : 10,

      },
      {
        "name"        : "Mobile2",
        "description" : "Smart Phone",
        "category"    : "Electronics",
        "vendor"      : "Xyz",
        "size"        : "19inch",
        "color"       : "White",
        "discount"    : 10.00,
        "price"       : 3999,
        "avail_status": "YES",
        "stock_level" : 15,
      },
      {
        "name"        : "Mobile3",
        "description" : "Smart Phone",
        "category"    : "Electronics",
        "vendor"      : "mno",
        "size"        : "16inch",
        "color"       : "Black",
        "price"       : 39500,
        "avail_status": "YES",
        "stock_level" : 5,
      },
      {
        "name"        : "Mobile4",
        "description" : "Smart Phone",
        "category"    : "Electronics",
        "vendor"      : "Abc",
        "size"        : "22inch",
        "color"       : "Blue",
        "discount"    : 200.00,
        "price"       : 10999,
        "avail_status": "NO",
        "stock_level" : 10,
      }
      ]);
    });
};