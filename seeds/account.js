
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("account").del()
    .then(function () {
      // Inserts seed entries
      return knex("account").insert([
        {
          "full_name"       : "Veeresh Digasangi",
          "mobile"          : "9632673722",
          "email"           : "veeresh.dgsg@gmail.com",
          "address"         : "HSR Layout Bengaluru",
          "shipping_address": "HSR Layout Bengaluru",
          "postalcode"      : "432944",
          "password"        : "test@123"
        },
        {
          "full_name"       : "Siddu Venkatapur",
          "mobile"          : "9812346727",
          "email"           : "siddu.v@gmail.com",
          "address"         : "Kormanagla Layout Bengaluru",
          "shipping_address": "Kormangla Layout Bengaluru",
          "postalcode"      : "433944",
          "password"        : "test@456"
        },
        {
          "full_name"       : "Praveen H",
          "mobile"          : "8632673722",
          "email"           : "praveen.h@gmail.com",
          "address"         : "RR Layout Bengaluru",
          "shipping_address": "RR Layout Bengaluru",
          "postalcode"      : "432244",
          "password"        : "test@1231"
        },
        {
          "full_name"       : "Shrpad Desai",
          "mobile"          : "9632633722",
          "email"           : "shripaddesai@gmail.com",
          "address"         : "PR Layout Bengaluru",
          "shipping_address": "PR Layout Bengaluru",
          "postalcode"      : "532944",
          "password"        : "test@126"
        }
      ]);
    });
};
