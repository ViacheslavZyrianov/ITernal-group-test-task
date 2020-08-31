<template>
  <div>
    <div class="header">
      <div class="header__title">Named galaxies</div>
      <div class="header__search">
        <s-input
          v-model="search"
          placeholder="Search galaxies"
          type="search"
          icon="search"
        />
      </div>
    </div>
    <div class="table">
      <div class="table__filters">
        <div
          class="filter filter_name"
          @click="onSortGalaxiesByName"
        >
          <div class="filter__title">Galaxy name</div>
          <div :class="filterIconClassList('arrow')" />
        </div>
        <div class="filter filter_constellation">
          <div class="filter__title">Constellation</div>
        </div>
        <div class="filter filter_origin">
          <div class="filter__title">Origin of name</div>
        </div>
      </div>
      <div
        v-for="galaxy in filteredGalaxies"
        :key="galaxy.id"
        :class="tableRowClassList(galaxy)"
      >
        <div class="table__cell table__cell_img-name">
          <div class="cell__title">Galaxy name</div>
          <div class="cell__content">
            <img
              v-if="galaxy.img"
              :src="galaxy.img"
              :alt="galaxy.name"
            >
            <div
              v-else
              class="img-placeholder"
            />
            <span>{{ galaxy.name }}</span>
          </div>
        </div>
        <div class="table__cell table__cell_constellation">
          <div class="cell__title">Constellation</div>
          <div class="cell__content">{{ galaxy.constellation }}</div>
        </div>
        <div class="table__cell table__cell_origin">
          <div class="cell__title">Origin</div>
          <div class="cell__content">{{ galaxy.originOfName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  async asyncData ({ store }) {
    await store.dispatch('fetchGalaxies')
    return {
      galaxies: store.state.galaxies
    }
  },
  data: () => ({
    search: '',
    sortByNameDirection: 'asc',
    filteredGalaxies: []
  }),
  watch: {
    search: {
      handler (search) {
        if (search) this.filteredGalaxies = this.galaxies.filter(galaxy => galaxy.name.toLowerCase().includes(search.toLowerCase()))
        else this.filteredGalaxies = [ ...this.galaxies ]
        this.sortGalaxiesByName()
      },
      immediate: true
    }
  },
  methods: {
    tableRowClassList (galaxy) {
      return [
        'table__row',
        { 'table__row_main': galaxy.main }
      ]
    },
    filterIconClassList (icon) {
      return [
        'filter__icon',
        `filter__icon_${icon}`,
        `filter__icon_${this.sortByNameDirection}`
      ]
    },
    onSortGalaxiesByName () {
      this.sortByNameDirection = this.sortByNameDirection === 'asc' ? 'desc' : 'asc'
      this.sortGalaxiesByName()
    },
    sortGalaxiesByName () {
      this.filteredGalaxies.sort((a, b) => (a.name > b.name) ? this.sortByNameDirection === 'asc' ? 1 : -1 : this.sortByNameDirection === 'asc' ? -1 : 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 45px;

  @media screen and (max-width: 768px) {
    display: block;
    margin-bottom: 24px;
  }

  &__title {
    font-weight: 500;
    font-size: 34px;
    line-height: 40px;
    letter-spacing: 0.25px;

    @media screen and (max-width: 768px) {
      margin-bottom: 13px;
    }
  }

  &__search {
    width: 270px;
  }
}

.table {
  &__filters {
    display: flex;

    @media screen and (max-width: 768px) {
      display: none;
    }

    .filter {
      display: flex;
      align-items: center;
      padding: 15px 0;
      color: #909597;

      &__title {
        text-transform: uppercase;
      }

      &__icon {
        width: 10px;
        height: 10px;
        margin-left: 12px;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        pointer-events: none;
        transition: transform 0.3s;
        will-change: transform;

        &_arrow {
          background-image: url('~assets/img/icons/table/filter-arrow.svg');
        }

        &_desc {
          transform: rotate(180deg);
        }
      }

      &_name {
        width: 27%;
        font-weight: 900;
        color: #263238;
        user-select: none;
        cursor: pointer;
      }

      &_constellation {
        width: 20%;
      }

      &_origin {
        width: 53%;
      }
    }
  }

  &__row {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #E0E0E0;

    @media screen and (max-width: 768px) {
      display: block;
      margin-bottom: 24px;
      border: 1px solid #E0E0E0;
    }

    &_main {
      background-color: rgba(97, 128, 239, 0.2);

      @media screen and (max-width: 768px) {
        background-color: inherit;

        .table__cell:first-child {
          background-color: rgba(97, 128, 239, 0.2);
        }
      }
    }

    &:last-child {
      border-bottom: 1px solid #E0E0E0;
    }
  }

  &__cell {
    display: flex;
    align-items: center;
    border-left: 1px solid #E0E0E0;
    line-height: 24px;

    @media screen and (max-width: 768px) {
      display: block;
      width: 100%;
      border-left: none;
      border-bottom: 1px solid #E0E0E0;
    }

    .cell {
      &__title {
        display: none;
        color: #909597;
        font-size: 10px;
        line-height: 14px;
        letter-spacing: 1px;
        text-transform: uppercase;
        margin-bottom: 8px;

        @media screen and (max-width: 768px) {
          display: block;
        }
      }

      &__content {
        display: flex;
        align-items: center;
      }
    }

    &_img-name {
      width: 27%;
      padding: 8px 20px;

      @media screen and (max-width: 768px) {
        width: 100%;
        padding: 8px;
      }

      .cell__title {
        color: #263238;
      }

      img,
      .img-placeholder {
        width: 30px;
        height: 30px;
        object-fit: cover;
        margin-right: 22px;
        background-color: #E0E0E0;

        @media screen and (max-width: 768px) {
          width: 20px;
          height: 20px;
          margin-right: 16px;
        }
      }
    }

    &_constellation,
    &_origin {
      padding: 8px 16px;
      font-weight: 300;

      @media screen and (max-width: 768px) {
        line-height: 17px;
        font-size: 14px;
        padding: 8px;
      }
    }

    &_constellation {
      width: 20%;

      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }

    &_origin {
      width: 53%;

      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }

    &:last-child {
      border-right: 1px solid #E0E0E0;

      @media screen and (max-width: 768px) {
        border-right: none;
        border-bottom: none;
      }
    }
  }
}
</style>

