const { BadRequestError } = require("../expressError");

/**
 * Generate a SQL query for partial update.
 *
 * @param {Object} dataToUpdate - the data to update; keys are column names.
 * @param {Object} jsToSql - a mapping from JavaScript property names to SQL column names.
 * @returns {Object} - an object containing SQL column settings and values.
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
