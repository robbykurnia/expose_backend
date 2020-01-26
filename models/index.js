import Sequelize from "sequelize";

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres"
  });
} else {
  sequelize = new Sequelize(
    process.env.TEST_DATABASE || process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: "postgres"
    }
  );
}

// const sequelize = new Sequelize("my_graphql_db_2", "postgres", "postgres", {
//   dialect: "postgres"
// });

const db = {
  User: sequelize.import("./user"),
  Post: sequelize.import("./post"),
  Comment: sequelize.import("./comment"),
  Like: sequelize.import("./like")
};

Object.keys(db).forEach(models => {
  if ("associate" in db[models]) db[models].associate(db);
});

db.sequelize = sequelize;

export default db;
