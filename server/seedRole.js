const sequelize = require("./db"); // adjust path
const Role = require("./models/Role"); // adjust path

async function seedRoles() {
  await sequelize.sync(); // Ensure models are synced with DB

  const roles = [
    { RoleId: 1, RoleName: "User" },
    { RoleId: 2, RoleName: "Admin" },
    // add more roles if needed
  ];

  for (const role of roles) {
    await Role.findOrCreate({
      where: { RoleId: role.RoleId },
      defaults: role,
    });
  }

  console.log("Roles seeded");
  process.exit();
}

seedRoles();
