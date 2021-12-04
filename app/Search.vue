<template>
  <div id="search-wrapper">
    <div id="app-search">
      <input type="text"
             v-model="search"
             placeholder="Key, Column, Entry..."
             @blur="toggleActiveSearch"
             @focus="toggleActiveSearch"/>
    </div>
    <div v-if="results.length > 0" class="results-container">
      <!-- <ul id="search-results" v-if="search"> -->
      <ul id="search-results">
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
      </ul>
    </div>
    <div v-else-if="searchActive" class="howto-container">
      <p>Type in any entry from Liber 777 in the box above. The search feature will make an effort to find a best-match, and is forgiving when it comes to spelling. Here are some sample tables to get you started:</p>
      <ul>
        <router-link
          v-bind:to="{ path: 'search', query: { table: 'XVII.*,XV.*,XVI.*,XVIII.*'} }"
          tag="li">
          Color Scales
        </router-link>
        <router-link
          v-bind:to="{ path: 'search', query: { table: 'XXXVIII.*%2CXXXIX.*%2CXL.*%2CXLII.*%2CXLIV.*%2CXLIII.*'} }"
          tag="li">
          Practical Correspondences
        </router-link>
        <router-link
          v-bind:to="{ path: 'search', query: { table: 'XIX.*%2CXXXIV.%2CXXXV.%2CXXII.%2CXXXIII.'} }"
          tag="li">
          Pantheons
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script lang="js">
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
          },
          toggleActiveSearch() {
              console.log("old, new search active values", this.searchActive, !this.searchActive)
              this.searchActive = !this.searchActive
          }
      },
      data() {
          return {
              search: '',
              searchActive: true
          };
      }
  };
</script>

<style lang="css">
  #search-wrapper {
    top: 0px;
    width: 100%;
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
      z-index: 15;
  }
  .howto-container {
      overflow: auto;
      z-index: 15;
      padding: 15px;
  }
  #search-results {
      background-color: #eee;
      margin: 0px;
  }
  #contents-pane {
      width: 100%;
      background-color: #ff00ff;
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
