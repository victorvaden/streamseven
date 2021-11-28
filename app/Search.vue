<template>
<div id="search-wrapper">
  <div id="app-search">
    <input type="text" v-model="search" placeholder="Key, Column, Entry..."/>
  </div>
  <div v-if="results" class="results-container">
    <ul id="search-results" v-if="search">
      <li
        v-bind:key="result.item.row + result.item.column + index"
        v-for="(result, index) in results"
        v-on:click="confirmResult(result.item)">
          <span class="result-entry">{{ result.item.entry }}</span>
          <span class="result-extra">{{ result.item.column }}</span>
          <span class="result-row">{{ result.item.row }}</span>
          <span class="result-columnName">{{ result.item.columnName }}</span>
          <!-- {{ result.row }} {{ result.entry }} {{ result.columnName }} -->
        </li>

      <!-- </router-link> -->
    </ul>
  </div>
</div>
</template>

<script>
  export default {
      computed: {
          results: function () {
              return this.$correspondences.search(this.search)
          }
      },
      methods: {
          confirmResult(entry) {
              this.search = '';
              this.$emit(`search-result`, entry)
          }
      },
      data() {
          return {
              search: ''
          };
      }
  };
</script>

<style>
  #search-wrapper {
    width: 100%;
    position: sticky;
    left: 0px;
  }
    #app-search input {
        background-color: #eee;
        display: block;
        width: 100%;
        line-height: 40px;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
    }

    .result-entry {
        font-size: 1;
    }
    .result-extra {
        font-size: .8em;
        font-weight: lighter;
    }
    .result-row {
        font-size: .8em;
        font-weight: lighter;
    }
    .result-columnName {
        font-size: .8em;
        font-weight: bold;
        
    }
    .results-container {
        overflow: auto;
    }
    #search-results {
        background-color: #eee;
        margin: 0px;
    }
    li {
        background-color: #eee;
        padding: 3px;
        list-style: none;
    }
    li:hover {
        background-color: #fde408;
    }

</style>
