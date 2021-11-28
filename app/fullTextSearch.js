import { default as rawData } from './data.js';
import Fuse from 'fuse.js'

const tableData =
      rawData.map(col =>
          Object.keys(col)
              .filter(entry => entry != "columnName" && entry != "column")
              .map(entry => ( {
                  "entry": col[entry],
                  "column": col["column"],
                  "columnName": col["columnName"],
                  "row": entry
              } ))
      );

const columnEntries =
      tableData.map(c => (
          {
              "entry": c[0]["columnName"],
              "column": c[0]["column"]
          }
      ))

const columns =
      tableData.map(c => (
          {
              "entry": c[0]["column"],
              "column": c[0]["column"]
          }
      ))


const flatData = tableData.flat()

const allSearch = flatData.concat(columnEntries).concat(columns)

const options = { keys: [ "entry" ] }

const fuse = new Fuse(allSearch, options);

export default {
    search: function (query) {
        return fuse.search(query)
    },
    tableData,
    // flatData,
    fuse
};
