const { sequelize } = require('../models');

async function up() {
    try {
        await sequelize.query(`
            ALTER TABLE Users
            ADD COLUMN URL VARCHAR(255),
            ADD COLUMN PhoneNumber VARCHAR(20),
            ADD COLUMN Gender VARCHAR(20),
            ADD COLUMN DOB DATE,
            ADD COLUMN Location VARCHAR(255),
            ADD COLUMN AlternatePhone VARCHAR(20),
            ADD COLUMN HintName VARCHAR(255)
        `);
        console.log('Migration completed successfully');
    } catch (error) {
        console.error('Migration failed:', error);
        throw error;
    }
}

async function down() {
    try {
        await sequelize.query(`
            ALTER TABLE Users
            DROP COLUMN URL,
            DROP COLUMN PhoneNumber,
            DROP COLUMN Gender,
            DROP COLUMN DOB,
            DROP COLUMN Location,
            DROP COLUMN AlternatePhone,
            DROP COLUMN HintName
        `);
        console.log('Rollback completed successfully');
    } catch (error) {
        console.error('Rollback failed:', error);
        throw error;
    }
}

module.exports = { up, down }; 