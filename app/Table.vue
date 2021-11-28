<template>
<div id="app-table">
  <Search v-on:search-result="setResult"/>
  <div id="table-container">
    <table>
      <thead>
        <tr>
          <th class="key toggle-visibility">
            <img v-on:click="toggleVisibility()"
                 v-if="viewAll"
                 src="./eye_closed.png">
            <img v-on:click="toggleVisibility()"
                 v-else
                 src="./eye.png">
          </th>
          
          <th class="key"
              v-bind:key="columnId(column)"
              v-for="column in visibleColumns"
              v-bind:class="columnKeyStatus(columnId(column))"
              v-on:click="deselectColumn(columnId(column))">
            <div class="key-wrapper">
              {{ columnId(column) }} {{  column[0]["columnName"] }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rowKey in visibleRowKeys" v-bind:key="rowKey[0]">
          <td v-bind:class="[rowKey[1], 'key', 'key-scale' ].join(' ')">{{ rowKey[0] }}</td>
          <td v-for="column in visibleColumns"
              v-bind:key="columnId(column)" 
              v-bind:class="entryStatus(rowKey[0], column)" 
              v-on:click="selectEntry(columnId(column), rowKey[0])">
            <div v-text="display(column.find(r => r.row == rowKey[0]))"></div>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
  
import Search from './Search.vue';

const rowKeys = [
    ["0", "center"], ["1", "center"], ["2", "center"], ["3",
    "center"], ["4", "center"], ["5", "center"], ["6", "center"],
    ["7", "center"], ["8", "center"], ["9", "center"], ["10",
    "center"], ["11", "left"], ["12", "center"], ["13", "center"],
    ["14", "center"], ["15", "right"], ["16", "right"], ["17",
    "right"], ["18", "right"], ["19", "right"], ["20", "right"],
    ["21", "center"], ["22", "right"], ["23", "left"], ["24",
    "right"], ["25", "right"], ["26", "right"], ["27", "center"],
    ["28", "right"], ["29", "right"], ["30", "center"], ["31",
    "left"], ["32", "center"], ["32 bis", "center"], ["31 bis",
    "center"]
];

export default {
    computed: {
        visibleColumns: function () {
            return this.$correspondences.tableData
                .filter(col => this.selectedColumns.indexOf(this.columnId(col)) > -1)
        },
        visibleRowKeys: function () {
            if (this.viewAll) {
                return rowKeys
            } else {
                return rowKeys.filter(k => this.selectedRows.indexOf(k[0]) > -1)
            }
        }
    },
    methods: {
        display: function(row) {
            return row?.entry ?? ""
        },
        entryStatus: function(rowKey, column) {
            let colId = this.columnId(column)

            let colPos = this.selectedColumns.indexOf(colId)
            let rowPos = this.selectedRows.indexOf(rowKey)

            let color = () => {
                if (colPos > -1 && rowPos > -1 ) {
                   return "dark"
                } else { return "light" }
            }

            return ('entry ' + color())
        },
        rowKeyStatus: function(rowKey) {
            let pos = this.selectedRows.indexOf(rowKey)
            let selected = pos > -1
            let invisible = !(selected || this.viewAll)

            let selectedClass = selected ? "inactive single" : ""
            let invisibleClass = invisible ? "invisible" : ""

            return `${selectedClass} ${invisibleClass}`
        },
        columnKeyStatus: function(colKey) {
            let pos = this.selectedColumns.indexOf(colKey)
            let selected = pos > -1
            let invisible = !(selected || this.viewAll)

            let selectedClass = selected ? "inactive" : ""
            let invisibleClass = invisible ? "invisible" : ""

            return `${selectedClass} ${invisibleClass}`
        },
        visibleToggleStatus: function() {
            if (!this.viewAll) {
                return "inactive single"
            }
        },
        toggleVisibility: function() {
            if (this.selectedColumns.length > 0 &&
                  this.selectedRows.length > 0) {
                this.viewAll = !this.viewAll
            } 
        },
        deselectColumn: function(colId) {
            let selected = this.selectedColumns
            let newSel = this.selectedColumns.filter(c => c != colId)
            let newQuery = newSel.join(",")
            if (newSel.length == 0) {
                this.viewAll = true;
                this.selectedRows = [];
            };
            this.selectedColumns = newSel;
            this.$router.push(
                { path: 'search',
                  query: {
                      table: encodeURIComponent(this.selectedColumns),
                      row: encodeURIComponent(this.selectedRows)
                  }
                }
            )
        },
        selectEntry: function(colId, row) {
            let colPos = this.selectedColumns.indexOf(colId)
            if (colPos == -1) { this.selectedColumns.push(colId) }
            
            let rowPos = this.selectedRows.indexOf(row)
            if (rowPos == -1) { this.selectedRows.push(row) }
            this.$router.push(
                { path: 'search',
                  query: {
                      table: encodeURIComponent(this.selectedColumns),
                      row: encodeURIComponent(this.selectedRows)
                  }
                }
            )
        },
        columnId: function(col) {
            return col[0]["column"]
        },
        toggleViewRow: function(row) {
            let position = this.selectedRows.indexOf(row)

            if (position > -1) {
                this.selectedRows.splice(position, 1)
            } else {
                this.selectedRows.push(row)
            }
        },
        rowKeyName: function(rowKey) {
            switch(rowKey) {
                case '33':
                  return "32 bis";
                case '34':
                  return "31 bis";
                default:
                  return rowKey
            }
        },
        rowNameKey: function(rowName) {
            switch(rowName) {
                case '32 bis':
                  return "33";
                case '31 bis':
                  return "34";
                default:
                  return rowName
            }
        },
        setResult: function(result) {
            this.selectEntry(result.column, result.row);
        }
    },
    components: {
        Search
    },
    props: {
        initialColumns: String,
        initialRows: String
    },
    data() {
        let columns
        let rows
        try {
            if ( this.$props.initialColumns ) {
                columns = decodeURIComponent(this.$props.initialColumns).split(",") ?? []
            } else {
                columns = []
            }
            if ( this.$props.initialRows ) {
                rows = decodeURIComponent(this.$props.initialRows).split(",") ?? []
            } else {
                rows = []
            } 
            return {
                selectedColumns: columns,
                viewAll: true,
                selectedRows: rows
            };
        } catch (error) {
            return {
                selectedColumns: [],
                viewAll: true,
                selectedRows: []
            };
        }
    }
};
</script>

<style lang="css">
  body {
      margin: 0;
  }
    table {
        border: 1px solid #eee;
    }
    thead {
        position: sticky;
        top: 0px;
        height: 10vh;
    }
    td {
        border: 1px solid #eee;
    }
    .key {
        background-color: #eee;
        min-width: 4em;
        border-bottom: 1px solid #fff
    }
    #eye-select {
        position:sticky;
        left: 0px;
    }
    .toggle-visibility {
        width: 4em;
        position: sticky;
        left: 0;
        background-color: #eee;
        border-bottom: 1px solid #fff;
        z-index: 5;
    }
    td.key {
        background-color: #eee;
        border-right: 1px solid #fff
    }
    .left {
        text-align: left;
    }
    .center {
        text-align: center;
    }
    .right {
        text-align: right;
    }
    #app-table {
        font-size: 18px;
        font-family: 'Roboto', sans-serif;
        position: absolute;
        width: 100%;
        left: 0px;
        top: 0px;
    }
    .inactive.single,inactive.double {
        background-color: #fff;
    }
    .inactive {
        background-color: #eee;
    }
    .light {
        font-weight: lighter;
        color: #222
    }
    .dark {
        font-weight: bold;
    }
    .entry {
        white-space: pre-wrap;
    }
    img {
        width: 100%;
    }
    .key-scale {
        z-index: 2;
    }
</style>
