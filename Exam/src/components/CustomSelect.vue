<template>
    <div class="custom-select">
      <input
        type="text"
        v-model="search"
        @focus="isOpen = true"
        @blur="closeDropdown"
        @input="isOpen = true"
        :placeholder="placeholder"
        class="form-control input-light-blue"
      />
      <ul v-show="isOpen" class="dropdown-menu">
        <li
          v-for="option in filterOptions()"
          :key="option"
          @mousedown="selectOption(option)"
          class="dropdown-item"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CustomSelect',
    props: {
      options: {
        type: Array,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
      placeholder: {
        type: String,
        default: 'Enter text',
      },
    },
    data() {
      return {
        search: '',
        isOpen: false,
        selectedOption: this.value,
      };
    },
    watch: {
      value(val) {
        this.selectedOption = val;
      },
    },
    methods: {
      toggleDropdown() {
        this.isOpen = !this.isOpen;
      },
      closeDropdown() {
        setTimeout(() => {
          this.isOpen = false;
        }, 200);
      },
      selectOption(option) {
        this.selectedOption = option;
        this.$emit('input', option);
        this.isOpen = false;
        this.search = '';
      },
      filterOptions() {
        return this.options.filter(option => option.toLowerCase().includes(this.search.toLowerCase()));
      },
    },
  };
  </script>
  
  <style scoped>
  .custom-select {
    position: relative;
  }
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    display: block;
    border: 1px solid #ddd;
    background-color: #fff;
  }
  .dropdown-item {
    padding: 10px;
    cursor: pointer;
  }
  .dropdown-item:hover {
    background-color: #f0f0f0;
  }
  </style>
  