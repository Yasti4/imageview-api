// info: http://stackabuse.com/bookshelf-js-a-node-js-orm/
// const bookshelf = require('../config/database');




const Bookshelf = require('../config/database');
export class Visibility extends bookshelf.Model {
    get tableName() { return 'visibilities'; }
    get hasTimestamps() { return false; }

    get defaults() {
        return {
            property1: 'blah',
            property1: null
        }
    }

    // START Relations
    // timesheet() { return this.belongsTo('Timesheet', 'timesheet'); }
    // taskType() { return this.belongsTo('TaskType', 'taskType'); }
    // worksheets() { return this.hasMany('AuditWorksheet', 'productionSheet'); }
    // END Relations
}

let visibilities = await Visibility.get();
console.log(visibilities.toJSON());